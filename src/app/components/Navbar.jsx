"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";

export default function Navbar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

  const isHidden   = pathname.startsWith("/portal") || pathname === "/login";
  const isHomePage = pathname === "/";

  // ── All hooks BEFORE any conditional return ───────────────────────────────
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage || isHidden) { setScrolled(false); return; }
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage, isHidden]);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // ── After all hooks — safe to early-return ────────────────────────────────
  if (isHidden) return null;

  const isSolid = !isHomePage || scrolled || menuOpen;

  const navLinks = [
    { label: "Home",       href: "/" },
    { label: "About",      href: "/about" },
    { label: "Academics",  href: "/academics" },
    { label: "Admissions", href: "/admissions" },
    { label: "News",       href: "/news" },
    { label: "Events",     href: "/events" },
    { label: "Contact",    href: "/contact" },
  ];

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "";

  function handleLogout() {
    signOut();
    setUserMenuOpen(false);
    router.push("/");
  }

  return (
    <header
      className={["lca-navbar", isSolid ? "lca-navbar--solid" : "lca-navbar--transparent"].join(" ")}
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

        {/* Desktop nav */}
        <nav className="lca-navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={["lca-navbar__link", pathname === link.href ? "lca-navbar__link--active" : ""].filter(Boolean).join(" ")}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="lca-navbar__actions">
          {isAuthenticated ? (
            <div className="lca-navbar__user-menu">
              <button
                className="lca-navbar__user-btn"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="Account menu"
              >
                <span className="lca-navbar__user-avatar" aria-hidden="true">{initials}</span>
                <span className="lca-navbar__user-name">{user.name.split(" ")[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="lca-navbar__dropdown" role="menu">
                  <p className="lca-navbar__dropdown-name">{user.name}</p>
                  <p className="lca-navbar__dropdown-email">{user.email}</p>
                  <hr className="lca-navbar__dropdown-divider" />
                  <Link href="/portal/dashboard" className="lca-navbar__dropdown-item" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                    <LayoutDashboard size={15} aria-hidden="true" /> Portal
                  </Link>
                  <button className="lca-navbar__dropdown-item lca-navbar__dropdown-item--danger" role="menuitem" onClick={handleLogout}>
                    <LogOut size={15} aria-hidden="true" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="lca-navbar__portal-btn">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lca-navbar__hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
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
              className={["lca-navbar__mobile-link", pathname === link.href ? "lca-navbar__mobile-link--active" : ""].filter(Boolean).join(" ")}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link href="/portal/dashboard" className="lca-navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
                Portal Dashboard
              </Link>
              <button className="lca-navbar__mobile-signout" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="lca-navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
              Sign In to Portal
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
