"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHeader } from "./Demos";

const FEATURES = [
  {
    title: "Real human, not an agency",
    desc: "You text me. I text back. No middlemen, no support tickets.",
  },
  {
    title: "Local to Charlotte",
    desc: "I work with businesses in QC. I can meet in person if it helps.",
  },
  {
    title: "Custom-built, not templated",
    desc: "Hand-coded sites. No Wix, no Squarespace, no page-builder bloat.",
  },
  {
    title: "7–14 day turnaround",
    desc: "Most builds ship in a week or two. No 90-day waiting rooms.",
  },
  {
    title: "No monthly subscriptions required",
    desc: "Pay once, own forever. Maintenance is optional, not a recurring lock-in.",
  },
  {
    title: "You own your site and domain",
    desc: "Registered in your name. Full design assets handed over on final payment.",
  },
];

const STATS = [
  { value: 7, suffix: "-day", label: "average delivery" },
  { value: 100, suffix: "%", label: "custom code" },
  { value: 0, suffix: "", label: "monthly subscriptions required" },
];

export default function WhyTame() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Why work with me"
        title="Individual Person, Not a Corporation."
        subtitle="One person, end-to-end. The same hands that quote your project also build it."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            whileHover={{ y: -4 }}
            className="glass rounded-xl p-7 hover:border-gold/40 transition-colors duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs mb-5">
              0{i + 1}
            </div>
            <h3 className="editorial text-xl text-ink mb-3">{f.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center md:text-left">
        {STATS.map((s, i) => (
          <Stat key={i} {...s} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.6,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return controls.stop;
  }, [inView, value, delay, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="md:border-l md:border-gold/15 md:pl-6"
    >
      <div className="flex items-baseline gap-1 justify-center md:justify-start">
        <motion.span className="editorial text-5xl md:text-6xl text-gold leading-none">
          {rounded}
        </motion.span>
        <span className="editorial text-3xl text-gold leading-none">
          {suffix}
        </span>
      </div>
      <p className="text-muted text-xs tracking-[0.25em] uppercase mt-3">
        {label}
      </p>
    </motion.div>
  );
}
