"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

type Demo = {
  name: string;
  industry: string;
  href: string;
  gradient: string;
  accent: string;
};

const DEMOS: Demo[] = [
  {
    name: "Cutz by JoJo",
    industry: "Barber | Demo",
    href: "https://cutzbyjojo.tame.gg",
    gradient:
      "linear-gradient(135deg, #1a1a1a 0%, #2a1d10 45%, #4a3415 70%, #6e4a1a 100%)",
    accent: "#C9A84C",
  },
  {
    name: "Saffron | Demo",
    industry: "Restaurant",
    href: "https://saffron.tame.gg",
    gradient:
      "linear-gradient(135deg, #0e0e10 0%, #281007 50%, #5a1f0a 100%)",
    accent: "#E8A24A",
  },
  {
    name: "Nails | Demo",
    industry: "Nail Salon",
    href: "https://nails.tame.gg",
    gradient:
      "linear-gradient(135deg, #140a10 0%, #361828 45%, #6b2a4a 100%)",
    accent: "#F5A6C9",
  },
  {
    name: "Food Truck | Demo",
    industry: "Street Food",
    href: "https://foodtruck.tame.gg",
    gradient:
      "linear-gradient(135deg, #100a07 0%, #3a1c0a 45%, #7a3416 100%)",
    accent: "#FFB347",
  },
  {
    name: "tame.gg | Production",
    industry: "Studio",
    href: "https://tame.gg",
    gradient:
      "linear-gradient(135deg, #070707 0%, #181308 45%, #352611 100%)",
    accent: "#E8C36D",
  },
  {
    name: "Keila's Portfolio | Production",
    industry: "Personal · Creator",
    href: "https://keila.lol",
    gradient:
      "linear-gradient(135deg, #0c0815 0%, #201340 45%, #3f2473 100%)",
    accent: "#C9A4F5",
  },
];

export default function Demos() {
  return (
    <section
      id="demos"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeader
        eyebrow="Recent Work"
        title="Preview Websites."
        subtitle="A look at live builds. Each one custom-coded, animation-driven, and tuned to its business."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {DEMOS.map((d, i) => (
          <DemoCard key={d.name} demo={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function DemoCard({ demo, index }: { demo: Demo; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 8);
    ry.set(px * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.a
        ref={ref}
        href={demo.href}
        target={demo.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group block glass rounded-2xl p-5 hover:border-gold/60 transition-colors duration-500"
      >
        <div
          className="browser-frame"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="ml-3 text-[10px] text-muted truncate">
              {demo.href.replace(/^https?:\/\//, "")}
            </span>
          </div>
          <div
            className="aspect-[4/3] relative overflow-hidden"
            style={{ background: demo.gradient }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${demo.accent}33, transparent 55%)`,
              }}
              animate={{ opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div
                className="editorial text-3xl md:text-4xl text-ink/90 leading-tight"
                style={{ color: demo.accent }}
              >
                {demo.name}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-ink/60 mt-2">
                {demo.industry}
              </div>
            </div>
            {/* sweep highlight on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[sweep_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <div className="text-ink text-base">{demo.name}</div>
            <div className="text-muted text-xs tracking-widest uppercase mt-1">
              {demo.industry}
            </div>
          </div>
          <span className="text-gold text-sm tracking-widest uppercase opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            View Live →
          </span>
        </div>
      </motion.a>

      <style jsx>{`
        @keyframes sweep {
          0% {
            transform: translateX(0) skewX(-20deg);
          }
          100% {
            transform: translateX(500%) skewX(-20deg);
          }
        }
      `}</style>
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"
        }`}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-gold text-xs tracking-[0.35em] uppercase mb-5 flex items-center gap-3"
      >
        {align === "center" && (
          <span className="inline-block w-8 h-px bg-gold/50" />
        )}
        {align === "left" && (
          <span className="inline-block w-8 h-px bg-gold/50" />
        )}
        {eyebrow}
        {align === "center" && (
          <span className="inline-block w-8 h-px bg-gold/50" />
        )}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="editorial text-4xl md:text-5xl lg:text-6xl text-ink leading-tight text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-muted text-base md:text-lg mt-5 max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
