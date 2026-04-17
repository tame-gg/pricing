"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./Demos";

const STEPS = [
  {
    n: "01",
    title: "Free Consult",
    desc: "Quick call or message — we figure out exactly what you need.",
    icon: ChatIcon,
  },
  {
    n: "02",
    title: "50% Deposit",
    desc: "Lock in your timeline. The rest is due at launch.",
    icon: HandshakeIcon,
  },
  {
    n: "03",
    title: "Design & Build",
    desc: "Custom-coded, animated. 7-day preview ready to review.",
    icon: CodeIcon,
  },
  {
    n: "04",
    title: "Up to 3 Revisions",
    desc: "Dial it in. Three full revision rounds included.",
    icon: ReviseIcon,
  },
  {
    n: "05",
    title: "Launch",
    desc: "Go live. Final 50% due. Domain, hosting, the works — handled.",
    icon: RocketIcon,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeader
        eyebrow="How it works"
        title="A clean, five-step build."
        subtitle="Most projects ship in under two weeks. Half upfront, half on launch. That's it."
      />

      <div className="relative">
        {/* connecting animated line */}
        <div className="absolute left-0 right-0 top-7 h-px hidden md:block">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ originX: 0 }}
            className="h-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.18,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="relative"
            >
              {/* node */}
              <div className="relative flex items-center md:block">
                <div className="relative z-10 w-14 h-14 rounded-full glass flex items-center justify-center">
                  <s.icon />
                </div>
                <div className="hidden md:block absolute -top-1 left-14 text-[10px] tracking-[0.3em] uppercase text-gold/70 ml-3">
                  {s.n}
                </div>
                <div className="md:hidden ml-4 text-[10px] tracking-[0.3em] uppercase text-gold/70">
                  Step {s.n}
                </div>
              </div>
              <h3 className="editorial text-xl text-ink mt-6">{s.title}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed max-w-[18rem]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center text-muted text-xs tracking-[0.3em] uppercase mt-16"
      >
        Typical turnaround · 7–14 days
      </motion.p>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z"
        stroke="#C9A84C"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12l4-4 5 4 5-4 4 4-4 4-5-4-5 4-4-4z"
        stroke="#C9A84C"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"
        stroke="#C9A84C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ReviseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0114-5.3L20 5m0 0v4h-4M20 12a8 8 0 01-14 5.3L4 19m0 0v-4h4"
        stroke="#C9A84C"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 4s7 1 7 7c0 0-3 0-5 2l-2-2c2-2 2-5 2-5l-2-2zm-3 6L4 17l3 3 7-7m-7 0c-2 2-2 5-2 5s3 0 5-2"
        stroke="#C9A84C"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
