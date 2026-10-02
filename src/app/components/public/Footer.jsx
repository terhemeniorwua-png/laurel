import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

/**
 * Footer
 *
 * Full school footer for Laurel Children Academy.
 * Rendered as a Server Component — no client-side interactivity required.
 *
 * Layout:
 *  - Brand column: logo, tagline, short description
 *  - Three link columns: Quick Links · School Life · Portal
 *  - Contact column: address, phone, email
 *  - Bottom bar: copyright, privacy policy, terms
 */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
];

const schoolLifeLinks = [
  { label: "News & Updates", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Student Life", href: "/about#student-life" },
  { label: "Gallery", href: "/about#gallery" },
];

const portalLinks = [
  { label: "School Portal", href: "/portal" },
  { label: "Student Login", href: "/portal?role=student" },
  { label: "Parent Login", href: "/portal?role=parent" },
  { label: "Teacher Login", href: "/portal?role=teacher" },
];

export default function Footer() {
  return (
    <footer className="lca-footer" role="contentinfo">
      <div className="lca-footer__inner">

        {/* ── Brand ─────────────────────────────────────── */}
        <div className="lca-footer__brand">
          <Link href="/" className="lca-footer__logo" aria-label="Laurel Children Academy — Home">
            <span className="lca-footer__logo-mark" aria-hidden="true">L</span>
            <span className="lca-footer__logo-text">
              <span>Laurel</span>
              <span>Children Academy</span>
            </span>
          </Link>

          <p className="lca-footer__tagline">
            Growing Curious Minds. Building Confident Futures.
          </p>

          <p className="lca-footer__description">
            Laurel Children Academy is a modern primary school dedicated to
            nurturing every child's potential through academic excellence,
            character development, and a love of lifelong learning.
          </p>
        </div>

        {/* ── Link columns ──────────────────────────────── */}
        <div className="lca-footer__links-grid">

          {/* Quick Links */}
          <div className="lca-footer__col">
            <h3 className="lca-footer__col-title">Quick Links</h3>
            <nav aria-label="Quick links">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="lca-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* School Life */}
          <div className="lca-footer__col">
            <h3 className="lca-footer__col-title">School Life</h3>
            <nav aria-label="School life links">
              {schoolLifeLinks.map((link) => (
                <Link key={link.href} href={link.href} className="lca-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Portal */}
          <div className="lca-footer__col">
            <h3 className="lca-footer__col-title">Portal</h3>
            <nav aria-label="Portal links">
              {portalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="lca-footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Contact ───────────────────────────────────── */}
        <address className="lca-footer__contact" aria-label="School contact information">
          <h3 className="lca-footer__col-title">Contact Us</h3>

          <div className="lca-footer__contact-item">
            <MapPin size={15} aria-hidden="true" />
            <span>
              14 Greenfield Close, Lekki Phase 1,
              <br />
              Lagos, Nigeria
            </span>
          </div>

          <div className="lca-footer__contact-item">
            <Phone size={15} aria-hidden="true" />
            <a href="tel:+2348123456789" className="lca-footer__link">
              +234 812 345 6789
            </a>
          </div>

          <div className="lca-footer__contact-item">
            <Mail size={15} aria-hidden="true" />
            <a href="mailto:info@laurelacademy.edu.ng" className="lca-footer__link">
              info@laurelacademy.edu.ng
            </a>
          </div>
        </address>
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className="lca-footer__bottom">
        <p className="lca-footer__copy">
          &copy; 2026 Laurel Children Academy. All rights reserved.
        </p>
        <div className="lca-footer__legal">
          <Link href="/privacy" className="lca-footer__link">
            Privacy Policy
          </Link>
          <Link href="/terms" className="lca-footer__link">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
