"use client";
import { ReactNode, useEffect } from "react";
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let frameId: number;
    let destroy: (() => void) | undefined;
    let isActive = true;

    const init = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const { default: Lenis } = await import("lenis");
      if (!isActive) return;

      const lenis = new Lenis();
      destroy = () => lenis.destroy();

      function raf(time: number) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }

      frameId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      isActive = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      destroy?.();
    };
  }, []);

  return children;
}
