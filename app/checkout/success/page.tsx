import Link from "next/link";
import Stripe from "stripe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks — tame.gg",
  description: "Your deposit is in. I'll reach out within 24 hours.",
};

export const dynamic = "force-dynamic";

async function resolvePaymentRef(
  sessionId: string | undefined,
): Promise<{ paymentId: string | null; amountPaid: number | null }> {
  if (!sessionId) return { paymentId: null, amountPaid: null };
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return { paymentId: null, amountPaid: null };
  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
    const pi = session.payment_intent;
    const paymentId =
      typeof pi === "string" ? pi : (pi?.id ?? null);
    return { paymentId, amountPaid: session.amount_total ?? null };
  } catch {
    return { paymentId: null, amountPaid: null };
  }
}

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const { paymentId, amountPaid } = await resolvePaymentRef(sessionId);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full glass rounded-2xl p-10 md:p-14 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 border border-gold flex items-center justify-center mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="#E8C36D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">
          Deposit Received
        </p>
        <h1 className="editorial text-4xl md:text-5xl text-ink leading-tight mb-5">
          We're on.
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          Your payment landed. I'll reach out within 24 hours with a kickoff
          call link and a quick intake form. Check your email for the Stripe
          receipt.
        </p>

        {(paymentId || amountPaid) && (
          <div className="mb-8 inline-flex flex-col gap-1 glass-soft rounded-xl px-5 py-4 text-left mx-auto">
            {amountPaid !== null && (
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-muted text-[10px] tracking-[0.3em] uppercase">
                  Paid
                </span>
                <span className="text-ink text-sm">
                  ${(amountPaid / 100).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
            {paymentId && (
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-muted text-[10px] tracking-[0.3em] uppercase">
                  Payment ID
                </span>
                <span className="text-ink text-xs font-mono tracking-tight select-all">
                  {paymentId}
                </span>
              </div>
            )}
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gold/50 text-ink hover:border-gold hover:text-goldlight text-xs tracking-[0.22em] uppercase transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
