# Caddy Proxy for Custom Tracking Domains

This proxy terminates TLS for customer tracking domains (for example `links.client.com`) and forwards traffic to `https://api.emareach.com`.

## Why this exists

`api.emareach.com` can be covered by one ACM certificate, but custom customer hosts cannot be pre-listed. Caddy's on-demand TLS issues certificates automatically only for approved hosts.

## DNS flow

1. Global host:
   - `track.emareach.com` -> A/AAAA to Caddy public IP (or NLB in front of Caddy)
2. Customer host:
   - `links.client.com` -> CNAME `track.emareach.com`

## Backend allow-list endpoint

Caddy asks this endpoint before issuing certificates:

- `GET https://api.emareach.com/api/tracking/verify-host?domain=<hostname>`

It returns 200 only for domains saved and verified in EmaReach.

## Shared secret (recommended)

Set the same secret in both places:

- Caddy request header: `X-Tracking-Proxy-Secret`
- Backend env: `TRACKING_PROXY_SHARED_SECRET`

If `TRACKING_PROXY_SHARED_SECRET` is set in backend, unknown/unauthorized ask requests are rejected.

