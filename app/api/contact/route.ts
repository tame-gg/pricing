import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  business?: string;
  contact?: string;
  type?: string;
  budget?: string;
  description?: string;
  // honeypot — real users leave this empty; bots fill it
  company_url?: string;
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: string, n: number) => s.slice(0, n);

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured on this deployment." },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot: silently accept and discard if bot-filled
  if (body.company_url && body.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clip((body.name ?? "").trim(), 200);
  const business = clip((body.business ?? "").trim(), 200);
  const contact = clip((body.contact ?? "").trim(), 200);
  const type = clip((body.type ?? "").trim(), 80);
  const budget = clip((body.budget ?? "").trim(), 80);
  const description = clip((body.description ?? "").trim(), 4000);

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Name and a way to reach you are required." },
      { status: 400 },
    );
  }

  const replyTo = isEmail(contact) ? contact : undefined;
  const from = process.env.CONTACT_EMAIL_FROM || "tame.gg <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL_TO || "web@tame.gg";

  const subject = `New inquiry — ${name}${business ? ` · ${business}` : ""}`;
  const lines = [
    `Name:          ${name}`,
    `Business:      ${business || "—"}`,
    `Contact:       ${contact}`,
    `Project Type:  ${type || "—"}`,
    `Budget:        ${budget || "—"}`,
    "",
    "Description:",
    description || "(none)",
    "",
    "—",
    "Sent from tame.gg contact form",
  ];
  const text = lines.join("\n");

  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
    );
  const html = `
    <div style="font-family:-apple-system,system-ui,sans-serif;max-width:560px;color:#111;">
      <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#0a0a0a;">${escape(subject)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#666;width:120px;">Name</td><td style="padding:6px 0;">${escape(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Business</td><td style="padding:6px 0;">${escape(business || "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Contact</td><td style="padding:6px 0;">${escape(contact)}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Project Type</td><td style="padding:6px 0;">${escape(type || "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Budget</td><td style="padding:6px 0;">${escape(budget || "—")}</td></tr>
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;font-weight:600;color:#0a0a0a;">Description</h3>
      <p style="margin:0;white-space:pre-wrap;line-height:1.55;font-size:14px;color:#222;">${escape(description || "(none)")}</p>
      <hr style="margin:28px 0 12px;border:none;border-top:1px solid #e5e5e5;" />
      <p style="margin:0;font-size:12px;color:#888;">Sent from the tame.gg contact form${replyTo ? " · reply directly to respond" : ""}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
      replyTo,
    });
    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Email send failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown email error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
