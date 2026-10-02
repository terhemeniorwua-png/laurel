/**
 * SectionHeading
 *
 * Reusable section heading block used across all public pages.
 * Renders a small eyebrow label, a display-font title, and an optional subtitle.
 *
 * Props:
 *  - eyebrow   {string}   — Small uppercase label above the title
 *  - title     {string}   — Main heading (DM Serif Display)
 *  - subtitle  {string}   — Optional supporting paragraph
 *  - centered  {boolean}  — Center-align all text (default: false)
 *  - light     {boolean}  — Light colour scheme for dark backgrounds (default: false)
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}) {
  const classes = [
    "section-heading",
    centered ? "section-heading--centered" : "",
    light ? "section-heading--light" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {eyebrow && (
        <span className="section-heading__eyebrow">{eyebrow}</span>
      )}

      <h2 className="section-heading__title">{title}</h2>

      {subtitle && (
        <p className="section-heading__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
