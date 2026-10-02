"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RevealObserver from "@/app/components/providers/RevealObserver";

/**
 * PageHero
 *
 * Reusable hero banner for all inner public pages (not the homepage carousel).
 * Also mounts the shared <RevealObserver /> so scroll-reveal animations work
 * on every page that uses PageHero.
 *
 * Props:
 *  - title       {string}  — Page heading (DM Serif Display)
 *  - subtitle    {string}  — Optional supporting text beneath the title
 *  - breadcrumb  {string}  — Optional breadcrumb label
 *  - imageSrc    {string}  — Unsplash URL; falls back to warm school photo
 *  - imageAlt    {string}  — Alt text for the background image
 */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85";

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  imageSrc,
  imageAlt = "Laurel Children Academy",
}) {
  const [visible, setVisible] = useState(false);

  // Hero entrance animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const src = imageSrc || DEFAULT_IMAGE;

  return (
    <>
      {/* Shared scroll-reveal observer for this page */}
      <RevealObserver />

      <section className="page-hero" aria-label={title}>
        <div className="page-hero__bg">
          <Image
            src={src}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="page-hero__img"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div className="page-hero__overlay" aria-hidden="true" />

        <div
          className={[
            "page-hero__content",
            visible ? "page-hero__content--visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {breadcrumb && (
            <p className="page-hero__breadcrumb" aria-label="Breadcrumb">
              {breadcrumb}
            </p>
          )}
          <h1 className="page-hero__title">{title}</h1>
          {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        </div>
      </section>
    </>
  );
}
