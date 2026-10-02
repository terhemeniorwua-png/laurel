"use client";

import { useEffect } from "react";

/**
 * RevealObserver
 *
 * Installs the scroll-reveal IntersectionObserver that adds `.revealed`
 * to every `.reveal-section` element on the page.
 *
 * This is a zero-render client component — it produces no visible output.
 *
 * Use this on any page that does NOT use <PageHero>, since PageHero
 * already bundles the same observer logic.
 *
 * Usage:
 *   import RevealObserver from "@/app/components/providers/RevealObserver";
 *   // Inside your page/layout:
 *   <RevealObserver />
 */
export default function RevealObserver() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      document
        .querySelectorAll(".reveal-section")
        .forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observe = () => {
      document
        .querySelectorAll(".reveal-section:not(.revealed)")
        .forEach((el) => observer.observe(el));
    };

    observe();
    const t = setTimeout(observe, 150);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return null;
}
