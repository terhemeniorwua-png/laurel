"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList,
  BarChart2, Wallet, Bell, CalendarDays, MessageSquare, Settings,
  LogOut, Menu, X, ChevronRight, UserCheck, FileText, Receipt,
  DollarSign, BookMarked, Baby, Search,
} from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { ROLE_NAV, ROLE_LABELS } from "@/lib/auth/roles";
import { getUnreadCount } from "@/lib/storage/notifications";
import { getUnreadCount as getUnreadMessages } from "@/lib/storage/messages";
import GlobalSearch from "./GlobalSearch";

const ICON_MAP = {
  "/portal/dashboard":    LayoutDashboard,
  "/portal/students":     Users,
  "/portal/teachers":     GraduationCap,
  "/portal/classes":      BookOpen,
  "/portal/admissions":   ClipboardList,
  "/portal/attendance":   UserCheck,
  "/portal/assignments":  BookMarked,
  "/portal/results":      BarChart2,
  "/portal/fees":         Wallet,
  "/portal/payments":     DollarSign,
  "/portal/invoices":     Receipt,
  "/portal/announcements":Bell,
  "/portal/events":       CalendarDays,
  "/portal/messages":     MessageSquare,
  "/portal/reports":      FileText,
  "/portal/settings":     Settings,
  "/portal/children":     Baby,
};

export default function PortalSidebar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen]             = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    if (user?.id) setUnreadNotifs(getUnreadCount(user.id));
  }, [user, pathname]);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function handler(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navItems = ROLE_NAV[user?.role] ?? [];

  function handleLogout() { setShowLogout(true); }
  function confirmLogout() {
    signOut();
    setShowLogout(false);
    router.push("/");
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────── */}
      <div className="portal-topbar">
        <button className="portal-topbar__menu" onClick={() => setOpen(true)} aria-label="Open navigation">
          <Menu size={22} />
        </button>
        <span className="portal-topbar__title">Laurel Portal</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button className="portal-topbar__menu" onClick={() => setSearchOpen(true)} aria-label="Open search"><Search size={20} /></button>
          <div className="portal-topbar__avatar" aria-hidden="true">{initials}</div>
        </div>
      </div>

      {/* ── Sidebar overlay (mobile) ────────────────────────── */}
      {open && <div className="portal-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside className={`portal-sidebar${open ? " portal-sidebar--open" : ""}`} aria-label="Portal navigation">
        {/* Logo */}
        <div className="portal-sidebar__logo">
          <Link href="/" className="portal-sidebar__logo-link" onClick={() => setOpen(false)}>
            <span className="portal-sidebar__logo-mark" aria-hidden="true">L</span>
            <span className="portal-sidebar__logo-text">
              <span>Laurel</span>
              <span>Children Academy</span>
            </span>
          </Link>
          <button className="portal-sidebar__close" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="portal-sidebar__user">
          <div className="portal-sidebar__user-avatar" aria-hidden="true">{initials}</div>
          <div className="portal-sidebar__user-info">
            <span className="portal-sidebar__user-name">{user?.name}</span>
            <span className="portal-sidebar__user-role">{ROLE_LABELS[user?.role]}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="portal-sidebar__nav" aria-label="Portal menu">
          {/* Search shortcut */}
          <button className="portal-nav-item portal-nav-item--search" onClick={() => setSearchOpen(true)} aria-label="Search (Ctrl+K)">
            <Search size={18} aria-hidden="true" />
            <span>Search</span>
            <kbd className="portal-search-kbd">⌘K</kbd>
          </button>
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.href] ?? ChevronRight;
            const active = pathname === item.href || (item.href !== "/portal/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`portal-nav-item${active ? " portal-nav-item--active" : ""}`}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.75} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button className="portal-sidebar__logout" onClick={handleLogout} aria-label="Sign out">
          <LogOut size={18} aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* ── Logout confirmation modal ───────────────────────── */}
      {showLogout && (
        <div className="portal-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="portal-modal">
            <h2 id="logout-title" className="portal-modal__title">Sign Out</h2>
            <p className="portal-modal__body">Are you sure you want to sign out of the portal?</p>
            <div className="portal-modal__actions">
              <button className="portal-modal__cancel" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="portal-modal__confirm" onClick={confirmLogout}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Global Search ───────────────────────────────────── */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
