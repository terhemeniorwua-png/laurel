"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * Navbar
 *
 * Public-facing navigation for Laurel Children Academy.
 *
 * Behaviour:
 *  - On the homepage ("/"):
 *      • Starts fully transparent so the hero image shows through.
 *      • Transitions to a solid/blurred background once the user scrolls
 *        past a threshold (64px).
 *  - On all other pages:
 *      • Always renders with the solid Laurel Brown background.
 *  - Responsive: hamburger menu on mobile.
 */
export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for transparent → solid transition on the homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check immediately in case page was loaded mid-scroll
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Whether the navbar should currently appear solid
  const isSolid = !isHomePage || scrolled || menuOpen;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Admissions", href: "/admissions" },
    { label: "News & Events", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={["lca-navbar", isSolid ? "lca-navbar--solid" : "lca-navbar--transparent"].join(
        " "
      )}
      role="banner"
    >
      <div className="lca-navbar__inner">
        {/* Logo */}
        <Link href="/" className="lca-navbar__logo" aria-label="Laurel Children Academy — Home">
          <span className="lca-navbar__logo-mark" aria-hidden="true">L</span>
          <span className="lca-navbar__logo-text">
            <span className="lca-navbar__logo-name">Laurel</span>
            <span className="lca-navbar__logo-sub">Children Academy</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="lca-navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "lca-navbar__link",
                pathname === link.href ? "lca-navbar__link--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="lca-navbar__actions">
          <Link href="/portal" className="lca-navbar__portal-btn">
            School Portal
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lca-navbar__hamburger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        id="mobile-nav"
        className={["lca-navbar__mobile", menuOpen ? "lca-navbar__mobile--open" : ""].join(" ")}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "lca-navbar__mobile-link",
                pathname === link.href ? "lca-navbar__mobile-link--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/portal" className="lca-navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
            School Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}
