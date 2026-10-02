/**
 * Laurel Children Academy — Simulated authentication layer.
 *
 * All auth logic lives here. Components interact with these functions only —
 * never directly with localStorage.
 *
 * Future migration path:
 *   Replace the storage implementation of login/logout/getSession with
 *   real JWT API calls without touching any UI component.
 *
 * Session storage key: lca_auth_session
 */

import { getItem, setItem, removeItem } from "../storage/storage.js";
import { getUserByEmail } from "../storage/users.js";

const SESSION_KEY = "lca_auth_session";

// ── Session ───────────────────────────────────────────────────────────────────

/**
 * Read the current session from localStorage.
 * @returns {object|null}
 */
export function getSession() {
  return getItem(SESSION_KEY, null);
}

/**
 * Save a session to localStorage.
 * @param {object} sessionData
 */
function saveSession(sessionData) {
  setItem(SESSION_KEY, sessionData);
}

/**
 * Remove the session from localStorage.
 */
export function clearSession() {
  removeItem(SESSION_KEY);
}

// ── Auth operations ───────────────────────────────────────────────────────────

/**
 * Attempt to sign in with email + password.
 *
 * Looks up the user in lca_users (seeded demo data).
 * Compares password as plain text (demo only — never do this in production).
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function login(email, password) {
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = getUserByEmail(email);

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  if (user.password !== password) {
    return { success: false, error: "Invalid email or password." };
  }

  if (user.status === "inactive") {
    return { success: false, error: "This account has been deactivated. Please contact the school." };
  }

  const session = {
    userId:          user.id,
    role:            user.role,
    email:           user.email,
    name:            user.name,
    authenticatedAt: new Date().toISOString(),
  };

  saveSession(session);

  // Return a sanitised user object (no password)
  const { password: _pw, ...safeUser } = user;
  return { success: true, user: safeUser };
}

/**
 * Sign out the current user.
 * Clears the session from localStorage.
 */
export function logout() {
  clearSession();
}

/**
 * Returns the currently authenticated user or null.
 * Merges session data with the full user record from storage.
 * @returns {object|null}
 */
export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;

  const user = getUserByEmail(session.email);
  if (!user) {
    // Session references a user that no longer exists — clear it
    clearSession();
    return null;
  }

  const { password: _pw, ...safeUser } = user;
  return safeUser;
}

/**
 * Is there an active session?
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getSession() !== null;
}

/**
 * Does the current user have the given role?
 * @param {string} role
 * @returns {boolean}
 */
export function hasRole(role) {
  const session = getSession();
  return session?.role === role;
}

/**
 * Does the current user have any of the given roles?
 * @param {string[]} roles
 * @returns {boolean}
 */
export function hasAnyRole(roles) {
  const session = getSession();
  return roles.includes(session?.role);
}

/**
 * Get the post-login redirect URL for a given role.
 * All roles land on the unified dashboard.
 * @param {string} role
 * @returns {string}
 */
export function getLoginRedirect() {
  return "/portal/dashboard";
}
