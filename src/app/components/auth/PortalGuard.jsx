"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/providers/AuthProvider";

/**
 * PortalGuard
 *
 * Wraps portal pages to enforce authentication and optional role checks.
 *
 * Props:
 *  - children       — page content to render when authorised
 *  - requiredRoles  — optional array of roles that may access this page.
 *                     If omitted, any authenticated user may access.
 *
 * Behavior:
 *  - While session is loading: renders a full-screen loader (prevents flicker)
 *  - Not authenticated: redirects to /login
 *  - Wrong role: renders a polished Access Denied screen
 *  - Authorised: renders children
 */
export default function PortalGuard({ children, requiredRoles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  // ── Loading ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="portal-guard-loading" aria-busy="true" aria-label="Loading your portal">
        <div className="portal-guard-loading__spinner" aria-hidden="true" />
        <p className="portal-guard-loading__text">Loading your portal…</p>
      </div>
    );
  }

  // ── Not authenticated ────────────────────────────────────────────────────
  if (!isAuthenticated) {
    // Redirect is happening via useEffect — show loader while it fires
    return (
      <div className="portal-guard-loading" aria-busy="true">
        <div className="portal-guard-loading__spinner" aria-hidden="true" />
        <p className="portal-guard-loading__text">Redirecting to login…</p>
      </div>
    );
  }

  // ── Wrong role ───────────────────────────────────────────────────────────
  if (requiredRoles && !requiredRoles.includes(user?.role)) {
    return (
      <div className="portal-access-denied">
        <div className="portal-access-denied__icon" aria-hidden="true">🔒</div>
        <h1 className="portal-access-denied__title">Access Denied</h1>
        <p className="portal-access-denied__message">
          You don't have permission to view this page.
        </p>
        <a href="/portal/dashboard" className="portal-access-denied__btn">
          Return to Dashboard
        </a>
      </div>
    );
  }

  return children;
}
