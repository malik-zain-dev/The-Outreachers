"use client";

import { CalendarDays, Sigma } from "lucide-react";
import { useMemo, useState } from "react";

/** Product cap: more than 5 subdomains per root is not supported. */
const SUBDOMAINS_PER_ROOT = 5;
const SENDING_DOMAINS_PER_ROOT = SUBDOMAINS_PER_ROOT + 1;
/** Safe defaults used to size infrastructure from your volume target. */
const INBOXES_PER_SENDING_DOMAIN = 5;
const EMAILS_PER_INBOX_PER_DAY = 40;

const CAPACITY_PER_ROOT_PER_DAY =
  SENDING_DOMAINS_PER_ROOT * INBOXES_PER_SENDING_DOMAIN * EMAILS_PER_INBOX_PER_DAY;

const DAYS_PER_MONTH = 30;

type VolumeInputProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function VolumeInput({ id, label, value, min, max, onChange }: VolumeInputProps) {
  return (
    <label htmlFor={id} className="rounded-2xl border border-border bg-card p-5 sm:p-6 block max-w-xl">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number.parseInt(event.target.value || "0", 10);
          const safeValue = Number.isNaN(next) ? min : Math.min(Math.max(next, min), max);
          onChange(safeValue);
        }}
        className="h-12 w-full rounded-lg border border-border bg-background px-3 text-2xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Enter how many cold emails you want to send per day. We size root domains, sending domains, and inboxes using our infrastructure rules (max {SUBDOMAINS_PER_ROOT} subdomains per root).
      </p>
    </label>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      {hint ? <p className="text-xs text-muted-foreground mt-2">{hint}</p> : null}
    </div>
  );
}

export function InfrastructureCalculator() {
  const [targetDailyVolume, setTargetDailyVolume] = useState(6000);

  const totals = useMemo(() => {
    const rootDomainsNeeded = Math.max(
      1,
      Math.ceil(targetDailyVolume / CAPACITY_PER_ROOT_PER_DAY),
    );
    const totalSendingDomains = rootDomainsNeeded * SENDING_DOMAINS_PER_ROOT;
    const totalInboxes = totalSendingDomains * INBOXES_PER_SENDING_DOMAIN;
    const achievedDailyVolume = totalInboxes * EMAILS_PER_INBOX_PER_DAY;
    const blastImpactPct =
      achievedDailyVolume === 0 ? 0 : (EMAILS_PER_INBOX_PER_DAY / achievedDailyVolume) * 100;
    const headroom = achievedDailyVolume - targetDailyVolume;
    const monthlyEmailsRequired = targetDailyVolume * DAYS_PER_MONTH;
    const monthlyInfrastructureCapacity = achievedDailyVolume * DAYS_PER_MONTH;

    return {
      rootDomainsNeeded,
      totalSendingDomains,
      totalInboxes,
      achievedDailyVolume,
      blastImpactPct,
      headroom,
      monthlyEmailsRequired,
      monthlyInfrastructureCapacity,
    };
  }, [targetDailyVolume]);

  return (
    <>
      <div className="max-w-xl">
        <VolumeInput
          id="target-daily-volume"
          label="Target daily email volume"
          value={targetDailyVolume}
          min={1}
          max={2_000_000}
          onChange={setTargetDailyVolume}
        />
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Root domains needed"
          value={totals.rootDomainsNeeded}
          hint={`At least ${CAPACITY_PER_ROOT_PER_DAY.toLocaleString()} sends/day capacity per root with our defaults.`}
        />
        <StatCard
          label="Subdomains per root (fixed)"
          value={SUBDOMAINS_PER_ROOT}
          hint="We do not allow more than 5 subdomains per root domain."
        />
        <StatCard
          label="Sending domains per root"
          value={SENDING_DOMAINS_PER_ROOT}
          hint="1 apex + 5 subdomains"
        />
        <StatCard label="Total sending domains" value={totals.totalSendingDomains} />
        <StatCard
          label="Inboxes per sending domain"
          value={INBOXES_PER_SENDING_DOMAIN}
          hint="Default used to hit your volume safely."
        />
        <StatCard
          label="Daily volume per inbox"
          value={EMAILS_PER_INBOX_PER_DAY}
          hint="Human-like daily cap per mailbox."
        />
        <StatCard label="Total managed inboxes" value={totals.totalInboxes} />
        <StatCard
          label="Achievable daily volume"
          value={totals.achievedDailyVolume.toLocaleString()}
          hint={
            totals.headroom > 0
              ? `${totals.headroom.toLocaleString()} headroom above your target.`
              : "Matches your target."
          }
        />
      </div>

      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
          <Sigma className="w-4 h-4" />
          Live math
        </div>
        <p className="text-2xl font-bold mb-1">
          {totals.rootDomainsNeeded} root domains × ({SUBDOMAINS_PER_ROOT} subdomains + 1) × {INBOXES_PER_SENDING_DOMAIN}{" "}
          inboxes × {EMAILS_PER_INBOX_PER_DAY} emails/day ={" "}
          <span className="gradient-text">{totals.achievedDailyVolume.toLocaleString()} emails/day</span>
        </p>
        <p className="text-muted-foreground mt-3">
          Sized for your target of {targetDailyVolume.toLocaleString()} emails/day. If one sending domain is flagged, the
          impact is about {totals.blastImpactPct.toFixed(2)}% of total daily sends.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2">
          <CalendarDays className="w-4 h-4" />
          Monthly volume ({DAYS_PER_MONTH}-day month)
        </div>
        <p className="text-3xl sm:text-4xl font-bold tracking-tight">
          {totals.monthlyEmailsRequired.toLocaleString()}{" "}
          <span className="text-lg sm:text-xl font-semibold text-muted-foreground">emails / month</span>
        </p>
        <p className="text-muted-foreground mt-3 text-sm">
          Based on your target of {targetDailyVolume.toLocaleString()} emails/day × {DAYS_PER_MONTH} days.
        </p>
        {totals.headroom > 0 ? (
          <p className="text-muted-foreground mt-2 text-sm">
            At full daily capacity this setup supports up to{" "}
            {totals.monthlyInfrastructureCapacity.toLocaleString()} emails per {DAYS_PER_MONTH} days.
          </p>
        ) : null}
      </div>
    </>
  );
}
