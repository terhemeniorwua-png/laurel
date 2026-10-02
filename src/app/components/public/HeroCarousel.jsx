"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlides from "@/data/heroSlides";

/**
 * HeroCarousel
 *
 * Full-width background image carousel for the Laurel Children Academy homepage.
 *
 * Features:
 *  - 5-slide auto-play (5.5s per slide) with infinite loop
 *  - Cinematic crossfade transition (800ms) between slides
 *  - Subtle Ken Burns scale animation while a slide is active
 *  - Warm Laurel-Brown gradient overlay (darker left, lighter right)
 *  - Staggered entrance animation for hero text on first load
 *  - Text stays stable across slide changes (no re-animation)
 *  - Dot indicators (clickable, Laurel Peach active state)
 *  - Prev / Next glass buttons (bottom-right)
 *  - Hover to pause autoplay
 *  - Keyboard navigation (ArrowLeft / ArrowRight)
 *  - Accessible aria-labels, aria-current, role="region"
 *  - Respects prefers-reduced-motion
 */
export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef(null);
  const count = heroSlides.length;
  const SLIDE_DURATION = 5500; // ms between auto advances
  const TRANSITION_MS = 800;   // crossfade duration

  // ── Detect reduced-motion preference ──────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Trigger text entrance on mount ────────────────────────────────────────
  useEffect(() => {
    // Small delay so the first image begins loading before text animates in
    const id = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(id);
  }, []);

  // ── Core slide advance ────────────────────────────────────────────────────
  const goTo = useCallback(
    (index) => {
      if (transitioning || index === current) return;
      setPrev(current);
      setTransitioning(true);
      setCurrent(index);

      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, prefersReducedMotion ? 0 : TRANSITION_MS);
    },
    [current, transitioning, prefersReducedMotion]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % count);
  }, [goTo, current, count]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + count) % count);
  }, [goTo, current, count]);

  // ── Autoplay ──────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, SLIDE_DURATION);
  }, [goNext]);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer]);

  // Restart timer after manual navigation
  const navigate = useCallback(
    (fn) => {
      clearInterval(timerRef.current);
      fn();
      if (!paused) startTimer();
    },
    [paused, startTimer]
  );

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") navigate(goPrev);
      if (e.key === "ArrowRight") navigate(goNext);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, goPrev, goNext]);

  // ── Computed transition duration ──────────────────────────────────────────
  const fadeDuration = prefersReducedMotion ? 0 : TRANSITION_MS;

  return (
    <section
      className="hero-carousel"
      aria-label="Laurel Children Academy hero carousel"
      role="region"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background image layers ───────────────────────────────────────── */}
      <div className="hero-slides-container" aria-hidden="true">
        {heroSlides.map((slide, i) => {
          const isActive = i === current;
          const isPrev = i === prev;
          if (!isActive && !isPrev) return null;

          return (
            <div
              key={slide.id}
              className={[
                "hero-slide",
                isActive ? "hero-slide--active" : "",
                isPrev ? "hero-slide--exiting" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--fade-duration": `${fadeDuration}ms` }}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={85}
                className={[
                  "hero-slide__img",
                  isActive && !prefersReducedMotion
                    ? "hero-slide__img--ken-burns"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              {/* Warm Laurel-Brown gradient overlay */}
              <div className="hero-overlay" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div className="hero-content-wrapper">
        <div
          className={[
            "hero-content",
            textVisible ? "hero-content--visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Eyebrow */}
          <p className="hero-eyebrow" style={{ "--delay": "0ms" }}>
            LAUREL CHILDREN ACADEMY
          </p>

          {/* Main heading */}
          <h1 className="hero-heading" style={{ "--delay": "150ms" }}>
            Growing Curious Minds.
            <br />
            Building Confident Futures.
          </h1>

          {/* Description */}
          <p className="hero-description" style={{ "--delay": "300ms" }}>
            At Laurel Children Academy, we create a nurturing environment where
            children are encouraged to explore, discover, create, and develop
            the confidence they need for tomorrow.
          </p>

          {/* CTA buttons */}
          <div className="hero-ctas" style={{ "--delay": "450ms" }}>
            <a href="/about" className="hero-btn hero-btn--primary">
              Explore Laurel
            </a>
            <a href="/admissions" className="hero-btn hero-btn--secondary">
              Start Your Application
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom controls row ───────────────────────────────────────────── */}
      <div className="hero-controls" aria-label="Carousel controls">
        {/* Dot indicators */}
        <div className="hero-indicators" role="tablist">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={[
                "hero-dot",
                i === current ? "hero-dot--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => navigate(() => goTo(i))}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="hero-nav-buttons">
          <button
            onClick={() => navigate(goPrev)}
            className="hero-nav-btn"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => navigate(goNext)}
            className="hero-nav-btn"
            aria-label="Next slide"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
