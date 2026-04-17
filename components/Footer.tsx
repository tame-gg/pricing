"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-14 grid grid-cols-1 md:grid-cols-3 items-start gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-gold tracking-[0.22em] text-xs uppercase">
            tame.gg <span className="text-muted mx-1">/</span> web services
          </div>
          <p className="text-muted text-sm mt-3">
            Charlotte, NC — serving Gastonia, Fort Mill, Rock Hill
          </p>
          <p className="text-muted text-xs mt-6 max-w-xs leading-relaxed">
            Custom-coded websites for local businesses who want to look
            premium without paying agency rates. Andrew Zandi, solo operator.
          </p>
          <div className="mt-5 space-y-1.5 text-xs">
            <a
              href="mailto:web@tame.gg"
              className="block text-ink/80 hover:text-gold transition-colors"
            >
              web@tame.gg
            </a>
            <a
              href="tel:+17047909158"
              className="block text-ink/80 hover:text-gold transition-colors"
            >
              +1 (704) 790-9158
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:text-center"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-4">
            Quick Links
          </p>
          <ul className="flex md:justify-center gap-6 text-sm">
            <li>
              <a
                href="#demos"
                className="text-ink hover:text-gold transition-colors"
              >
                Demos
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-ink hover:text-gold transition-colors"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-ink hover:text-gold transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:text-right"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-4">
            Live Demos
          </p>
          <ul className="flex md:justify-end flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              "cutzbyjojo.tame.gg",
              "saffron.tame.gg",
              "nails.tame.gg",
              "foodtruck.tame.gg",
              "tame.gg",
              "keilaweila.lol",
            ].map((host) => (
              <li key={host}>
                <a
                  href={`https://${host}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-gold transition-colors"
                >
                  {host}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <span>© 2026 tame.gg — Built by Andrew Zandi</span>
          <span className="tracking-[0.2em] uppercase">
            Charlotte · Gastonia · Fort Mill · Rock Hill
          </span>
        </div>
      </div>
    </footer>
  );
}
