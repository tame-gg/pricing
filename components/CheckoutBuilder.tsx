"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { SectionHeader } from "./Demos";
import {
  TIERS,
  MAINTENANCE,
  ADDONS,
  formatUSD,
  type TierKey,
  type MaintenanceKey,
  type AddonKey,
} from "@/lib/catalog";

const TIER_KEYS = Object.keys(TIERS) as TierKey[];
const MAINT_KEYS = Object.keys(MAINTENANCE) as MaintenanceKey[];
const ADDON_KEYS = Object.keys(ADDONS) as AddonKey[];
const REQUIRED_ADDONS = ADDON_KEYS.filter((k) => ADDONS[k].required);

export default function CheckoutBuilder() {
  const [tier, setTier] = useState<TierKey>("standard");
  const [maintenance, setMaintenance] = useState<MaintenanceKey | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<AddonKey>>(
    () => new Set(REQUIRED_ADDONS),
  );
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for external tier preselection (from Pricing cards)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ tier?: TierKey }>).detail;
      if (detail?.tier && detail.tier in TIERS) setTier(detail.tier);
    };
    window.addEventListener("checkout:selectTier", handler);
    return () => window.removeEventListener("checkout:selectTier", handler);
  }, []);

  const toggleAddon = (key: AddonKey) => {
    if (ADDONS[key].required) return;
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const { depositToday, dueAtLaunch, lineItems } = useMemo(() => {
    const items: { label: string; amount: number; note?: string }[] = [];
    const t = TIERS[tier];
    items.push({
      label: `${t.name} — 50% Deposit`,
      amount: t.deposit,
      note: `Remaining ${formatUSD(t.full - t.deposit)} at launch`,
    });
    if (maintenance) {
      const m = MAINTENANCE[maintenance];
      items.push({ label: m.name, amount: m.price });
    }
    for (const key of selectedAddons) {
      const a = ADDONS[key];
      items.push({ label: a.name, amount: a.price });
    }
    const deposit = items.reduce((s, i) => s + i.amount, 0);
    return {
      depositToday: deposit,
      dueAtLaunch: t.full - t.deposit,
      lineItems: items,
    };
  }, [tier, maintenance, selectedAddons]);

  const onCheckout = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          maintenance,
          addons: Array.from(selectedAddons),
          email: email || undefined,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setSubmitting(false);
    }
  };

  return (
    <section
      id="checkout"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <SectionHeader
        eyebrow="Build Your Package"
        title="Check out online."
        subtitle="Pick a tier, bolt on maintenance and add-ons, and pay your 50% deposit securely. Remaining 50% is invoiced at launch."
        align="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Selection */}
        <div className="space-y-8">
          <Block title="1 · Package" subtitle="50% due today">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TIER_KEYS.map((k) => {
                const t = TIERS[k];
                const active = tier === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTier(k)}
                    className={`text-left glass rounded-xl p-5 transition-all duration-300 ${
                      active
                        ? "border-gold shadow-goldsoft"
                        : "hover:border-gold/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-ink text-sm tracking-wide">
                        {t.name.replace(" Package", "")}
                      </span>
                      <Radio active={active} />
                    </div>
                    <div className="editorial text-2xl text-ink">
                      {formatUSD(t.full)}
                    </div>
                    <div className="text-muted text-[10px] tracking-[0.22em] uppercase mt-2">
                      {formatUSD(t.deposit)} due today
                    </div>
                  </button>
                );
              })}
            </div>
          </Block>

          <Block
            title="2 · Maintenance"
            subtitle="Optional · billed yearly"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <MaintenanceTile
                label="None"
                price={null}
                active={maintenance === null}
                onClick={() => setMaintenance(null)}
              />
              {MAINT_KEYS.map((k) => (
                <MaintenanceTile
                  key={k}
                  label={MAINTENANCE[k].name.replace("Maintenance · ", "")}
                  price={MAINTENANCE[k].price}
                  active={maintenance === k}
                  onClick={() => setMaintenance(k)}
                />
              ))}
            </div>
          </Block>

          <Block title="3 · Add-ons" subtitle="Optional">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDON_KEYS.map((k) => {
                const a = ADDONS[k];
                const active = selectedAddons.has(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleAddon(k)}
                    disabled={a.required}
                    className={`text-left glass-soft rounded-xl p-4 transition-colors duration-300 ${
                      active
                        ? "border-gold/70 bg-gold/[0.04]"
                        : "hover:border-gold/40"
                    } ${a.required ? "cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox active={active} />
                        <span className="text-ink text-sm">{a.name}</span>
                      </div>
                      <span className="text-muted text-xs">
                        {formatUSD(a.price)}
                      </span>
                    </div>
                    <div className="pl-[26px] mt-1.5 flex items-center gap-2 text-[11px]">
                      {a.required && (
                        <span className="text-gold/90 tracking-[0.18em] uppercase text-[9px]">
                          Required
                        </span>
                      )}
                      {a.description && (
                        <span className="text-muted">{a.description}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Block>

          <Block title="4 · Email" subtitle="For the receipt">
            <div className="underline-input pb-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@business.com"
                className="w-full bg-transparent text-ink text-base outline-none border-b border-white/10 pb-2 placeholder:text-muted/60"
              />
            </div>
          </Block>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="glass rounded-2xl p-7 border-gold/30">
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-5">
              Your Order
            </p>

            <ul className="space-y-3 mb-6">
              <AnimatePresence initial={false}>
                {lineItems.map((li) => (
                  <motion.li
                    key={li.label}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div className="min-w-0">
                      <div className="text-ink/90 truncate">{li.label}</div>
                      {li.note && (
                        <div className="text-muted text-[11px] mt-0.5">
                          {li.note}
                        </div>
                      )}
                    </div>
                    <div className="text-ink font-medium whitespace-nowrap">
                      {formatUSD(li.amount)}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="gold-divider mb-5 opacity-50" />

            <div className="flex items-baseline justify-between mb-1">
              <span className="text-muted text-[10px] tracking-[0.3em] uppercase">
                Today
              </span>
              <motion.span
                key={depositToday}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="editorial text-3xl text-gold"
              >
                {formatUSD(depositToday)}
              </motion.span>
            </div>
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-muted text-[10px] tracking-[0.3em] uppercase">
                Due at launch
              </span>
              <span className="text-muted text-sm">
                {formatUSD(dueAtLaunch)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              disabled={submitting}
              className="w-full rounded-full bg-gold hover:bg-goldlight text-black tracking-[0.18em] uppercase text-sm font-medium py-3.5 shadow-gold transition-colors disabled:opacity-70"
            >
              {submitting ? "Redirecting…" : "Pay with Stripe →"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-400/90 leading-snug">
                {error}
              </p>
            )}

            <p className="text-muted text-[10px] mt-4 leading-relaxed">
              Secured by Stripe. 50% deposit is non-refundable once work begins.
              You'll own the domain and all final design assets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-ink text-sm tracking-[0.25em] uppercase">
          {title}
        </h3>
        {subtitle && <span className="text-muted text-xs">{subtitle}</span>}
      </div>
      {children}
    </motion.div>
  );
}

function MaintenanceTile({
  label,
  price,
  active,
  onClick,
}: {
  label: string;
  price: number | null;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left glass-soft rounded-xl p-4 transition-all duration-300 ${
        active ? "border-gold/70 bg-gold/[0.04]" : "hover:border-gold/40"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-ink text-sm">{label}</span>
        <Radio active={active} />
      </div>
      <div className="text-muted text-xs">
        {price === null ? "Skip for now" : `${formatUSD(price)} / year`}
      </div>
    </button>
  );
}

function Radio({ active }: { active: boolean }) {
  return (
    <span
      className={`w-4 h-4 rounded-full border transition-colors duration-300 flex items-center justify-center ${
        active ? "border-gold" : "border-white/20"
      }`}
    >
      <motion.span
        animate={{ scale: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="w-2 h-2 rounded-full bg-gold"
      />
    </span>
  );
}

function Checkbox({ active }: { active: boolean }) {
  return (
    <span
      className={`w-4 h-4 rounded-[4px] border transition-colors duration-300 flex items-center justify-center ${
        active ? "border-gold bg-gold" : "border-white/20"
      }`}
    >
      <motion.svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        initial={false}
        animate={{ scale: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <path
          d="M1.5 5.5L4 8L8.5 2.5"
          stroke="#0A0A0A"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </span>
  );
}
