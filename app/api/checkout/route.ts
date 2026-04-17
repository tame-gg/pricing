import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  TIERS,
  MAINTENANCE,
  ADDONS,
  type TierKey,
  type MaintenanceKey,
  type AddonKey,
} from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  tier?: TierKey;
  maintenance?: MaintenanceKey | null;
  addons?: AddonKey[];
  email?: string;
};

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { tier, maintenance, addons = [], email } = body;

  if (!tier || !(tier in TIERS)) {
    return NextResponse.json(
      { error: "A valid package (tier) is required." },
      { status: 400 },
    );
  }

  type CreateParams = NonNullable<
    Parameters<Stripe["checkout"]["sessions"]["create"]>[0]
  >;
  type LineItem = NonNullable<CreateParams["line_items"]>[number];
  const lineItems: LineItem[] = [];

  // Tier deposit (50%)
  const t = TIERS[tier];
  lineItems.push({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: t.deposit,
      product_data: {
        name: `${t.name} — 50% Deposit`,
        description: `${t.description}. Remaining 50% invoiced at launch.`,
      },
    },
  });

  // Maintenance (full, optional)
  if (maintenance && maintenance in MAINTENANCE) {
    const m = MAINTENANCE[maintenance];
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: m.price,
        product_data: { name: m.name, description: m.description },
      },
    });
  }

  // Add-ons (full). Always include required ones even if omitted by client.
  const requestedAddons = new Set<AddonKey>(
    addons.filter((k): k is AddonKey => k in ADDONS),
  );
  for (const key of Object.keys(ADDONS) as AddonKey[]) {
    if (ADDONS[key].required) requestedAddons.add(key);
  }
  for (const key of requestedAddons) {
    const a = ADDONS[key];
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: a.price,
        product_data: {
          name: a.name,
          description: a.description ?? undefined,
        },
      },
    });
  }

  const stripe = new Stripe(secret);

  const origin =
    req.headers.get("origin") ??
    req.nextUrl.origin ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_email: email || undefined,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#checkout`,
      metadata: {
        tier,
        maintenance: maintenance ?? "",
        addons: Array.from(requestedAddons).join(","),
      },
      custom_text: {
        submit: {
          message:
            "50% deposit is non-refundable once work begins. Final 50% due at launch.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown Stripe error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
