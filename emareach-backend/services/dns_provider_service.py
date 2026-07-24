from __future__ import annotations

from typing import Dict, List, Any, Tuple
import httpx
import os
import xml.etree.ElementTree as ET


class DNSProviderServiceError(Exception):
    pass


class DNSProviderService:
    def __init__(self) -> None:
        self._cloudflare_base_url = "https://api.cloudflare.com/client/v4"
        self._godaddy_base_url = "https://api.godaddy.com/v1"
        self._namecheap_base_url = "https://api.namecheap.com/xml.response"

    async def apply_records(
        self,
        *,
        provider: str,
        zone_name: str,
        credentials: Dict[str, str],
        records: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        key = (provider or "").strip().lower()
        if key == "cloudflare":
            return await self._apply_cloudflare(zone_name=zone_name, credentials=credentials, records=records)
        if key == "godaddy":
            return await self._apply_godaddy(zone_name=zone_name, credentials=credentials, records=records)
        if key == "namecheap":
            return await self._apply_namecheap(zone_name=zone_name, credentials=credentials, records=records)
        if key == "route53":
            return await self._apply_route53(zone_name=zone_name, credentials=credentials, records=records)
        raise DNSProviderServiceError(f"Unsupported DNS provider: {provider}")

    async def _apply_cloudflare(
        self,
        *,
        zone_name: str,
        credentials: Dict[str, str],
        records: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        api_token = (credentials.get("api_token") or "").strip()
        if not api_token:
            raise DNSProviderServiceError("Cloudflare API token is required.")
        async with httpx.AsyncClient(timeout=30.0) as client:
            zone_id = await self._cloudflare_get_zone_id(client, zone_name, api_token)
            applied = []
            for record in records:
                out = await self._cloudflare_upsert_record(
                    client=client,
                    zone_id=zone_id,
                    api_token=api_token,
                    zone_name=zone_name,
                    record=record,
                )
                applied.append(out)
        return {"provider": "cloudflare", "zone_name": zone_name, "zone_id": zone_id, "applied": applied}

    async def _apply_godaddy(
        self,
        *,
        zone_name: str,
        credentials: Dict[str, str],
        records: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        api_key = (credentials.get("api_key") or "").strip()
        api_secret = (credentials.get("api_secret") or "").strip()
        if not api_key or not api_secret:
            raise DNSProviderServiceError("GoDaddy api_key and api_secret are required.")
        auth = f"sso-key {api_key}:{api_secret}"
        headers = {"Authorization": auth, "Content-Type": "application/json"}
        applied = []
        async with httpx.AsyncClient(timeout=30.0) as client:
            grouped: Dict[Tuple[str, str], List[Dict[str, Any]]] = {}
            for record in records:
                rec_type = (record.get("type") or "").upper()
                rec_name = self._relative_name(zone_name, record.get("name") or "@")
                grouped.setdefault((rec_type, rec_name), []).append(record)

            for (rec_type, rec_name), group in grouped.items():
                payload = []
                for record in group:
                    entry: Dict[str, Any] = {"data": (record.get("value") or "").strip(), "ttl": 600}
                    if rec_type == "MX":
                        entry["priority"] = int(record.get("priority") or 10)
                    payload.append(entry)
                endpoint = f"{self._godaddy_base_url}/domains/{zone_name}/records/{rec_type}/{rec_name}"
                resp = await client.put(endpoint, headers=headers, json=payload)
                if resp.status_code >= 400:
                    raise DNSProviderServiceError(
                        f"GoDaddy failed for {rec_type} {rec_name} ({resp.status_code}): {resp.text}"
                    )
                for record in group:
                    applied.append(
                        {
                            "action": "upserted",
                            "type": rec_type,
                            "name": rec_name,
                            "value": record.get("value"),
                            "priority": record.get("priority"),
                        }
                    )
        return {"provider": "godaddy", "zone_name": zone_name, "applied": applied}

    async def _apply_namecheap(
        self,
        *,
        zone_name: str,
        credentials: Dict[str, str],
        records: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        api_user = (credentials.get("api_user") or "").strip()
        api_key = (credentials.get("api_key") or "").strip()
        client_ip = (credentials.get("client_ip") or os.getenv("NAMECHEAP_CLIENT_IP") or "").strip()
        username = (credentials.get("username") or api_user).strip()
        if not api_user or not api_key or not client_ip:
            raise DNSProviderServiceError("Namecheap api_user, api_key and client_ip are required.")
        sld, tld = self._split_domain_for_namecheap(zone_name)

        async with httpx.AsyncClient(timeout=30.0) as client:
            existing = await self._namecheap_get_hosts(
                client=client,
                api_user=api_user,
                api_key=api_key,
                username=username,
                client_ip=client_ip,
                sld=sld,
                tld=tld,
            )
            merged = self._namecheap_merge_hosts(zone_name, existing, records)
            await self._namecheap_set_hosts(
                client=client,
                api_user=api_user,
                api_key=api_key,
                username=username,
                client_ip=client_ip,
                sld=sld,
                tld=tld,
                hosts=merged,
            )
        applied = [
            {
                "action": "upserted",
                "type": h["type"],
                "name": h["name"],
                "value": h["value"],
                "priority": h.get("priority"),
            }
            for h in merged
        ]
        return {"provider": "namecheap", "zone_name": zone_name, "applied": applied}

    async def _apply_route53(
        self,
        *,
        zone_name: str,
        credentials: Dict[str, str],
        records: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        try:
            import boto3
        except Exception as exc:
            raise DNSProviderServiceError("boto3 is required for Route53 integration.") from exc

        access_key = (credentials.get("aws_access_key_id") or "").strip()
        secret_key = (credentials.get("aws_secret_access_key") or "").strip()
        session_token = (credentials.get("aws_session_token") or "").strip() or None
        region = (credentials.get("aws_region") or "us-east-1").strip()
        hosted_zone_id = (credentials.get("hosted_zone_id") or "").strip()
        if not access_key or not secret_key:
            raise DNSProviderServiceError("Route53 aws_access_key_id and aws_secret_access_key are required.")

        session = boto3.session.Session(
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            aws_session_token=session_token,
            region_name=region,
        )
        client = session.client("route53")
        zone_id = hosted_zone_id or self._route53_find_hosted_zone_id(client, zone_name)
        changes = []
        for record in records:
            rec_type = (record.get("type") or "").upper()
            rel_name = self._relative_name(zone_name, record.get("name") or "@")
            fqdn = f"{zone_name}." if rel_name == "@" else f"{rel_name}.{zone_name}."
            value = (record.get("value") or "").strip()
            if rec_type == "TXT":
                value = f"\"{value}\""
            if rec_type == "MX":
                pref = int(record.get("priority") or 10)
                value = f"{pref} {value}"
            changes.append(
                {
                    "Action": "UPSERT",
                    "ResourceRecordSet": {
                        "Name": fqdn,
                        "Type": rec_type,
                        "TTL": 300,
                        "ResourceRecords": [{"Value": value}],
                    },
                }
            )
        if changes:
            client.change_resource_record_sets(HostedZoneId=zone_id, ChangeBatch={"Changes": changes})
        applied = [
            {
                "action": "upserted",
                "type": c["ResourceRecordSet"]["Type"],
                "name": c["ResourceRecordSet"]["Name"],
                "value": c["ResourceRecordSet"]["ResourceRecords"][0]["Value"],
            }
            for c in changes
        ]
        return {"provider": "route53", "zone_name": zone_name, "zone_id": zone_id, "applied": applied}

    async def _cloudflare_get_zone_id(self, client: httpx.AsyncClient, zone_name: str, api_token: str) -> str:
        response = await client.get(
            f"{self._cloudflare_base_url}/zones",
            params={"name": zone_name, "status": "active"},
            headers={"Authorization": f"Bearer {api_token}"},
        )
        payload = response.json() if response.content else {}
        if response.status_code >= 400:
            raise DNSProviderServiceError(
                f"Cloudflare zone lookup failed ({response.status_code}): {payload.get('errors') or response.text}"
            )
        if not payload.get("success"):
            raise DNSProviderServiceError(f"Cloudflare zone lookup failed: {payload.get('errors')}")
        result = payload.get("result") or []
        if not result:
            raise DNSProviderServiceError(f"No active Cloudflare zone found for '{zone_name}'.")
        return result[0]["id"]

    async def _cloudflare_upsert_record(
        self,
        *,
        client: httpx.AsyncClient,
        zone_id: str,
        api_token: str,
        zone_name: str,
        record: Dict[str, Any],
    ) -> Dict[str, Any]:
        record_type = (record.get("type") or "").upper()
        name = (record.get("name") or "").strip()
        value = (record.get("value") or "").strip()
        priority = record.get("priority")
        fqdn_name = zone_name if name == "@" else name.rstrip(".")
        if fqdn_name != zone_name and not fqdn_name.endswith(f".{zone_name}"):
            fqdn_name = f"{fqdn_name}.{zone_name}"

        search = await client.get(
            f"{self._cloudflare_base_url}/zones/{zone_id}/dns_records",
            params={"type": record_type, "name": fqdn_name, "per_page": 100},
            headers={"Authorization": f"Bearer {api_token}"},
        )
        search_payload = search.json() if search.content else {}
        if search.status_code >= 400 or not search_payload.get("success"):
            raise DNSProviderServiceError(
                f"Cloudflare record search failed for {record_type} {fqdn_name}: "
                f"{search_payload.get('errors') or search.text}"
            )
        existing = (search_payload.get("result") or [None])[0]
        body = {"type": record_type, "name": fqdn_name, "content": value, "ttl": 1}
        if record_type in ("A", "AAAA", "CNAME"):
            body["proxied"] = False
        if record_type == "MX":
            body["priority"] = int(priority or 10)
        if existing:
            resp = await client.put(
                f"{self._cloudflare_base_url}/zones/{zone_id}/dns_records/{existing['id']}",
                json=body,
                headers={"Authorization": f"Bearer {api_token}"},
            )
            action = "updated"
        else:
            resp = await client.post(
                f"{self._cloudflare_base_url}/zones/{zone_id}/dns_records",
                json=body,
                headers={"Authorization": f"Bearer {api_token}"},
            )
            action = "created"
        resp_payload = resp.json() if resp.content else {}
        if resp.status_code >= 400 or not resp_payload.get("success"):
            raise DNSProviderServiceError(
                f"Cloudflare record {action} failed for {record_type} {fqdn_name}: "
                f"{resp_payload.get('errors') or resp.text}"
            )
        return {"action": action, "type": record_type, "name": fqdn_name, "value": value, "priority": body.get("priority")}

    def _relative_name(self, zone_name: str, name: str) -> str:
        raw = (name or "@").strip().rstrip(".")
        zone = (zone_name or "").strip().lower().rstrip(".")
        if raw in ("@", zone):
            return "@"
        lower_raw = raw.lower()
        if lower_raw.endswith(f".{zone}"):
            return raw[: -(len(zone) + 1)] or "@"
        return raw

    def _split_domain_for_namecheap(self, domain: str) -> Tuple[str, str]:
        host = (domain or "").strip().lower().rstrip(".")
        parts = host.split(".")
        if len(parts) < 2:
            raise DNSProviderServiceError("Invalid domain for Namecheap.")
        return parts[0], ".".join(parts[1:])

    async def _namecheap_get_hosts(
        self,
        *,
        client: httpx.AsyncClient,
        api_user: str,
        api_key: str,
        username: str,
        client_ip: str,
        sld: str,
        tld: str,
    ) -> List[Dict[str, Any]]:
        params = {
            "ApiUser": api_user,
            "ApiKey": api_key,
            "UserName": username,
            "ClientIp": client_ip,
            "Command": "namecheap.domains.dns.getHosts",
            "SLD": sld,
            "TLD": tld,
        }
        resp = await client.get(self._namecheap_base_url, params=params)
        if resp.status_code >= 400:
            raise DNSProviderServiceError(f"Namecheap getHosts failed ({resp.status_code}): {resp.text}")
        root = ET.fromstring(resp.text)
        errors = root.findall(".//Errors/Error")
        if errors:
            raise DNSProviderServiceError(f"Namecheap getHosts error: {errors[0].text}")
        hosts = []
        for host in root.findall(".//DomainDNSGetHostsResult/host"):
            hosts.append(
                {
                    "name": host.attrib.get("Name", "@"),
                    "type": host.attrib.get("Type", "A").upper(),
                    "value": host.attrib.get("Address", ""),
                    "priority": int(host.attrib.get("MXPref") or 10),
                    "ttl": int(host.attrib.get("TTL") or 600),
                }
            )
        return hosts

    def _namecheap_merge_hosts(
        self,
        zone_name: str,
        existing: List[Dict[str, Any]],
        updates: List[Dict[str, Any]],
    ) -> List[Dict[str, Any]]:
        keyed: Dict[Tuple[str, str], Dict[str, Any]] = {}
        for item in existing:
            key = ((item.get("type") or "").upper(), self._relative_name(zone_name, item.get("name") or "@"))
            keyed[key] = dict(item)
        for item in updates:
            key = ((item.get("type") or "").upper(), self._relative_name(zone_name, item.get("name") or "@"))
            keyed[key] = {
                "name": key[1],
                "type": key[0],
                "value": item.get("value") or "",
                "priority": int(item.get("priority") or 10),
                "ttl": 600,
            }
        return list(keyed.values())

    async def _namecheap_set_hosts(
        self,
        *,
        client: httpx.AsyncClient,
        api_user: str,
        api_key: str,
        username: str,
        client_ip: str,
        sld: str,
        tld: str,
        hosts: List[Dict[str, Any]],
    ) -> None:
        params: Dict[str, Any] = {
            "ApiUser": api_user,
            "ApiKey": api_key,
            "UserName": username,
            "ClientIp": client_ip,
            "Command": "namecheap.domains.dns.setHosts",
            "SLD": sld,
            "TLD": tld,
        }
        for idx, host in enumerate(hosts, start=1):
            params[f"HostName{idx}"] = host.get("name") or "@"
            params[f"RecordType{idx}"] = (host.get("type") or "A").upper()
            params[f"Address{idx}"] = host.get("value") or ""
            params[f"TTL{idx}"] = int(host.get("ttl") or 600)
            if (host.get("type") or "").upper() == "MX":
                params[f"MXPref{idx}"] = int(host.get("priority") or 10)

        resp = await client.get(self._namecheap_base_url, params=params)
        if resp.status_code >= 400:
            raise DNSProviderServiceError(f"Namecheap setHosts failed ({resp.status_code}): {resp.text}")
        root = ET.fromstring(resp.text)
        errors = root.findall(".//Errors/Error")
        if errors:
            raise DNSProviderServiceError(f"Namecheap setHosts error: {errors[0].text}")

    def _route53_find_hosted_zone_id(self, client, zone_name: str) -> str:
        target = zone_name.rstrip(".").lower() + "."
        resp = client.list_hosted_zones_by_name(DNSName=target, MaxItems="1")
        zones = resp.get("HostedZones", []) or []
        if not zones:
            raise DNSProviderServiceError(f"No Route53 hosted zone found for {zone_name}.")
        first = zones[0]
        zone_dns_name = (first.get("Name") or "").lower()
        if zone_dns_name != target:
            raise DNSProviderServiceError(f"Exact hosted zone not found for {zone_name}.")
        return (first.get("Id") or "").split("/")[-1]
