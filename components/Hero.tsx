"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const headline = "Websites that actually work.";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* Animated mesh background */}
      <div className="hero-mesh" aria-hidden />
      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #050505 95%)",
        }}
        aria-hidden
      />
      {/* Floating geometric SVG motifs */}
      <FloatingMotifs />

      {/* Top wordmark */}
      <header className="relative z-10 px-6 md:px-12 pt-8 flex justify-between items-center">
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
          className="text-gold tracking-[0.22em] text-xs uppercase"
        >
          tame.gg <span className="text-muted mx-1">/</span> web services
        </motion.a>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
          className="hidden md:flex gap-7 text-xs uppercase tracking-[0.2em] text-muted"
        >
          <a href="#demos" className="hover:text-gold transition-colors">Demos</a>
          <a href="#pricing" className="hover:text-gold transition-colors">Pricing</a>
          <a href="#process" className="hover:text-gold transition-colors">Process</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </motion.nav>
      </header>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: "easeOut" }}
          className="text-muted text-xs tracking-[0.3em] uppercase mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-gold/60" />
          Web Design Studio · Charlotte, NC
        </motion.p>

        <h1 className="editorial text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] leading-[0.95] text-ink max-w-5xl text-balance">
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom mr-[0.22em]"
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 1.25 + i * 0.12,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className={`inline-block ${word.includes("work") ? "italic text-gold" : ""
                  }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: "easeOut" }}
          className="mt-10 text-muted text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Modern, animated, handcrafted sites for local businesses
          in&nbsp;Charlotte and beyond.{" "}
          <span className="text-gold">Starting at $250.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.2, ease: "easeOut" }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <MagneticButton href="#pricing" variant="primary">
            See Pricing →
          </MagneticButton>
          <MagneticButton href="#demos" variant="ghost">
            View Demos
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="relative z-10 pb-10 flex justify-center"
      >
        <div className="text-muted text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-3">
          <span>Scroll</span>
          <motion.span
            className="block w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function FloatingMotifs() {
  const motifs = [
    { x: "8%", y: "22%", size: 90, delay: 0 },
    { x: "85%", y: "18%", size: 120, delay: 1.2 },
    { x: "75%", y: "70%", size: 70, delay: 0.6 },
    { x: "12%", y: "78%", size: 50, delay: 1.8 },
  ];
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
      {motifs.map((m, i) => (
        <motion.svg
          key={i}
          width={m.size}
          height={m.size}
          viewBox="0 0 100 100"
          className="absolute"
          style={{ left: m.x, top: m.y }}
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={{
            opacity: 0.35,
            scale: 1,
            rotate: 360,
            y: [0, -14, 0],
          }}
          transition={{
            opacity: { delay: 1.4 + m.delay, duration: 1.4 },
            scale: { delay: 1.4 + m.delay, duration: 1.4 },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            y: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {i % 2 === 0 ? (
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.6"
              strokeDasharray="2 4"
            />
          ) : (
            <g stroke="#C9A84C" strokeWidth="0.6" fill="none">
              <polygon points="50,12 88,50 50,88 12,50" />
              <circle cx="50" cy="50" r="4" fill="#C9A84C" />
            </g>
          )}
        </motion.svg>
      ))}
    </div>
  );
}
