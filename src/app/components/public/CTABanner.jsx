import Link from "next/link";

/**
 * CTABanner
 *
 * Full-width call-to-action section used across public pages.
 * Supports three visual variants that map to the Laurel brand palette.
 *
 * Props:
 *  - title           {string}                        — Main headline
 *  - subtitle        {string}                        — Supporting text
 *  - primaryLabel    {string}                        — Primary button text
 *  - primaryHref     {string}                        — Primary button destination
 *  - secondaryLabel  {string}   optional             — Secondary button text
 *  - secondaryHref   {string}   optional             — Secondary button destination
 *  - variant         {'brown' | 'peach' | 'warm'}    — Colour scheme (default: 'brown')
 */
export default function CTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "brown",
}) {
  const bannerClass = [
    "cta-banner",
    variant === "peach" ? "cta-banner--peach" : "",
    variant === "warm" ? "cta-banner--warm" : "",
    variant === "brown" || !variant ? "cta-banner--brown" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={bannerClass} aria-label={title}>
      <div className="cta-banner__inner">
        <h2 className="cta-banner__title">{title}</h2>

        {subtitle && (
          <p className="cta-banner__subtitle">{subtitle}</p>
        )}

        <div className="cta-banner__actions">
          <Link href={primaryHref} className="cta-banner__btn-primary">
            {primaryLabel}
          </Link>

          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="cta-banner__btn-secondary">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
