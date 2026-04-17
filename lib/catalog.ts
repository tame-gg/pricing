// Single source of truth for all prices.
// Used both by the UI (display) and the API route (actual charge amounts).
// Client never submits prices — only keys. Server looks them up here.
// All prices are in USD cents (Stripe's format). $250 → 25000.

export type TierKey = "starter" | "standard" | "premium";
export type MaintenanceKey = "basic" | "standard" | "premium";
export type AddonKey =
  | "nfc5"
  | "nfc25"
  | "logo"
  | "domain"
  | "booking"
  | "revision";

export const TIERS: Record<
  TierKey,
  { name: string; full: number; deposit: number; description: string }
> = {
  starter: {
    name: "Starter Package",
    full: 25000,
    deposit: 12500,
    description: "1–3 pages · contact form · basic animations · 7-day delivery",
  },
  standard: {
    name: "Standard Package",
    full: 45000,
    deposit: 22500,
    description:
      "5 pages · SEO basics · Google Maps · custom animations · 10-day delivery",
  },
  premium: {
    name: "Premium Package",
    full: 75000,
    deposit: 37500,
    description:
      "Unlimited pages · full SEO · online booking · priority 7-day delivery",
  },
};

export const MAINTENANCE: Record<
  MaintenanceKey,
  { name: string; price: number; description: string }
> = {
  basic: {
    name: "Maintenance · Basic",
    price: 10000,
    description: "Hosting · uptime monitoring · bug fixes · 1 year",
  },
  standard: {
    name: "Maintenance · Standard",
    price: 20000,
    description:
      "Everything in Basic + 4 content updates + design tweaks · 1 year",
  },
  premium: {
    name: "Maintenance · Premium",
    price: 40000,
    description:
      "Everything in Standard + SEO updates + priority support + unlimited updates · 1 year",
  },
};

export const ADDONS: Record<
  AddonKey,
  { name: string; price: number; required?: boolean; description?: string }
> = {
  domain: {
    name: "Domain Setup",
    price: 2500,
    required: true,
    description: "Registration, DNS, email-forwarding setup",
  },
  nfc5: {
    name: "NFC Cards · 5-pack",
    price: 2500,
    description: "Programmable smart cards (5)",
  },
  nfc25: {
    name: "NFC Cards · 25-pack",
    price: 8000,
    description: "Programmable smart cards (25)",
  },
  logo: {
    name: "Logo Design",
    price: 7500,
    description: "Custom logo · 2 rounds of revisions",
  },
  booking: {
    name: "Booking Integration",
    price: 10000,
    description: "Online booking system integration (from $100)",
  },
  revision: {
    name: "Extra Revision Round",
    price: 5000,
    description: "Additional revision round beyond the included 3",
  },
};

export function formatUSD(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: dollars % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
