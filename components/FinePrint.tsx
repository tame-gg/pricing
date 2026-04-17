"use client";

import { motion } from "framer-motion";

const TERMS = [
  "50% deposit is non-refundable once work begins.",
  "Client owns the domain — registered in your name from day one.",
  "3 revision rounds included in every build.",
  "Hosting included as long as you keep an active maintenance plan.",
  "30-day migration window if you cancel maintenance.",
  "Client owns all design assets upon final payment.",
];

export default function FinePrint() {
  return (
    <section
      id="fine-print"
      className="relative py-20 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass-soft rounded-2xl p-8 md:p-10"
      >
        <div className="flex items-center gap-3 mb-7">
          <span className="inline-block w-6 h-px bg-gold/50" />
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase">
            Fine Print
          </p>
        </div>

        <h3 className="editorial text-2xl md:text-3xl text-ink mb-8 leading-tight">
          The terms, up front.
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {TERMS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
              className="flex items-start gap-3 text-sm text-ink/85 leading-relaxed"
            >
              <span className="text-gold mt-0.5 flex-shrink-0">·</span>
              <span>{t}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
