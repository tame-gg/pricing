"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("has-cursor");

    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0,
      mouseX = 0,
      mouseY = 0;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest(
        "a, button, [role='button'], .magnetic, input, textarea, select, label",
      );
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${
          ringY - 16
        }px, 0) scale(${hovering ? 1.6 : 1})`;
        ringRef.current.style.borderColor = hovering
          ? "rgba(232,195,109,0.85)"
          : "rgba(201,168,76,0.45)";
      }
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 5}px, ${
          dotY - 5
        }px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${
          ringY - 16
        }px, 0) scale(${hovering ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
