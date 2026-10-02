"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, isAuthenticated, login, logout, clearSession } from "@/lib/auth/auth";

/**
 * Laurel Children Academy — AuthContext
 *
 * Provides authentication state to the entire application.
 * Mount <AuthProvider> in the root layout.
 *
 * Usage:
 *   const { user, loading, signIn, signOut } = useAuth();
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true until session is restored

  // Restore session on mount (client-side only)
  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } catch {
      clearSession();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Sign in with email + password.
   * @returns {{ success: boolean, error?: string }}
   */
  const signIn = useCallback((email, password) => {
    const result = login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  }, []);

  /**
   * Sign out the current user.
   */
  const signOut = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  /**
   * Quick role-switch for demo purposes.
   * Updates the session directly with the given user record.
   */
  const switchDemoRole = useCallback((email, password) => {
    return signIn(email, password);
  }, [signIn]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    switchDemoRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication state.
 * Must be used inside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
