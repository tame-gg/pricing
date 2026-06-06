"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DEMO_SITES, type DemoSite } from "@/lib/demo-sites";

type ViewportMode = {
  id: "desktop" | "tablet" | "mobile";
  label: string;
  frameClass: string;
};

const VIEWPORTS: ViewportMode[] = [
  {
    id: "desktop",
    label: "Desktop",
    frameClass: "w-full",
  },
  {
    id: "tablet",
    label: "Tablet",
    frameClass: "w-full max-w-[820px]",
  },
  {
    id: "mobile",
    label: "Mobile",
    frameClass: "w-full max-w-[390px]",
  },
];

export default function Demos() {
  const [activeSlug, setActiveSlug] = useState(DEMO_SITES[0].slug);
  const [viewportId, setViewportId] = useState<ViewportMode["id"]>("desktop");
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);

  const activeDemo = useMemo(
    () => DEMO_SITES.find((demo) => demo.slug === activeSlug) ?? DEMO_SITES[0],
    [activeSlug],
  );
  const viewport =
    VIEWPORTS.find((mode) => mode.id === viewportId) ?? VIEWPORTS[0];

  const selectDemo = (slug: string) => {
    setLoadedSlug(null);
    setActiveSlug(slug);
  };

  return (
    <section
      id="demos"
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeader
        eyebrow="Demo Archive"
        title="One interactive home for the demo sites."
        subtitle="The four preview builds now run from this project as bundled static exports, so the original repos can be removed without losing the live demo experience."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass rounded-2xl p-4 md:p-5"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold">
              Bundled Builds
            </div>
            <div className="text-xs text-muted">{DEMO_SITES.length} demos</div>
          </div>

          <div className="space-y-3">
            {DEMO_SITES.map((demo) => (
              <DemoSelector
                key={demo.slug}
                demo={demo}
                selected={demo.slug === activeDemo.slug}
                onSelect={() => selectDemo(demo.slug)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="min-w-0"
        >
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 p-4 md:p-5 border-b border-white/10">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="editorial text-3xl md:text-4xl text-ink leading-tight">
                    {activeDemo.name}
                  </h3>
                  <span
                    className="text-[10px] tracking-[0.24em] uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: activeDemo.accent,
                      borderColor: `${activeDemo.accent}66`,
                      backgroundColor: `${activeDemo.accent}12`,
                    }}
                  >
                    {activeDemo.industry}
                  </span>
                </div>
                <p className="mt-2 text-sm md:text-base text-muted leading-relaxed max-w-2xl">
                  {activeDemo.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <SegmentedControl
                  modes={VIEWPORTS}
                  activeId={viewportId}
                  onChange={setViewportId}
                />
                <a
                  href={activeDemo.localPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-gold/50 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-ink hover:border-gold hover:text-goldlight transition-colors"
                >
                  Open Full
                </a>
              </div>
            </div>

            <div className="bg-[#050505] p-3 md:p-5">
              <div className="browser-frame">
                <div className="browser-bar">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="ml-3 text-[10px] text-muted truncate">
                    tame.gg{activeDemo.localPath}
                  </span>
                </div>

                <div
                  className="relative min-h-[620px] overflow-auto"
                  style={{ background: activeDemo.gradient }}
                >
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.24)_100%)]" />

                  {loadedSlug !== activeDemo.slug && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-black/45 backdrop-blur-sm">
                      <div className="text-center">
                        <div
                          className="mx-auto mb-4 h-10 w-10 rounded-full border border-white/20 border-t-transparent animate-spin"
                          aria-hidden
                        />
                        <div className="text-xs tracking-[0.26em] uppercase text-ink/80">
                          Loading {activeDemo.name}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative z-[1] flex justify-center min-w-full p-3 md:p-5">
                    <div
                      className={`${viewport.frameClass} transition-[max-width] duration-500 ease-out`}
                    >
                      <iframe
                        key={activeDemo.slug}
                        title={`${activeDemo.name} demo preview`}
                        src={activeDemo.localPath}
                        onLoad={() => setLoadedSlug(activeDemo.slug)}
                        className="block h-[620px] w-full bg-white shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DemoSelector({
  demo,
  selected,
  onSelect,
}: {
  demo: DemoSite;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-gold/70 bg-white/[0.07]"
          : "border-white/10 bg-white/[0.025] hover:border-gold/45 hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 h-9 w-9 shrink-0 rounded-full border"
          style={{
            background: demo.gradient,
            borderColor: selected ? demo.accent : "rgba(255,255,255,0.14)",
            boxShadow: selected ? `0 0 28px -10px ${demo.accent}` : undefined,
          }}
          aria-hidden
        />
        <span className="min-w-0">
          <span className="block text-base text-ink">{demo.name}</span>
          <span className="mt-1 block text-[10px] tracking-[0.24em] uppercase text-muted">
            {demo.industry}
          </span>
          <span className="mt-3 block text-xs leading-relaxed text-muted">
            {demo.sourceRepo}
          </span>
        </span>
      </div>
    </button>
  );
}

function SegmentedControl({
  modes,
  activeId,
  onChange,
}: {
  modes: ViewportMode[];
  activeId: ViewportMode["id"];
  onChange: (id: ViewportMode["id"]) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-black/25 p-1">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={`rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase transition-colors ${
            activeId === mode.id
              ? "bg-gold text-black"
              : "text-muted hover:text-ink"
          }`}
          aria-pressed={activeId === mode.id}
        >
          {mode.label}
        </button>
      ))}
    </div>
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
      className={`mb-14 md:mb-20 ${
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"
      }`}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-gold text-xs tracking-[0.35em] uppercase mb-5 flex items-center gap-3"
      >
        <span className="inline-block w-8 h-px bg-gold/50" />
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
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-muted text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
