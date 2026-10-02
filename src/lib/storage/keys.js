/**
 * Laurel Children Academy — Centralized localStorage key constants.
 *
 * All localStorage keys used by the application are defined here.
 * Never hardcode "lca_*" strings elsewhere in the codebase.
 *
 * Changing a key in this one file propagates throughout the application.
 * When the backend is added, this file can be adapted or removed without
 * touching every module that reads/writes data.
 */

export const STORAGE_KEYS = {
  // ── Data collections ─────────────────────────────────────────────────────
  USERS:         "lca_users",
  STUDENTS:      "lca_students",
  TEACHERS:      "lca_teachers",
  PARENTS:       "lca_parents",
  CLASSES:       "lca_classes",
  SUBJECTS:      "lca_subjects",
  ASSIGNMENTS:   "lca_assignments",
  SUBMISSIONS:   "lca_submissions",
  ATTENDANCE:    "lca_attendance",
  RESULTS:       "lca_results",
  FEES:          "lca_fees",
  PAYMENTS:      "lca_payments",
  ANNOUNCEMENTS: "lca_announcements",
  EVENTS:        "lca_events",
  MESSAGES:      "lca_messages",
  NOTIFICATIONS: "lca_notifications",
  ADMISSIONS:    "lca_admissions",

  // ── Seed / versioning ─────────────────────────────────────────────────────
  SEED_VERSION:  "lca_seed_version",
  INITIALIZED:   "lca_initialized",
};

/**
 * Current seed data version.
 * Bump this string when the demo dataset structure changes.
 * Phase 3 seed is "1.0.0".
 */
export const CURRENT_SEED_VERSION = "1.0.0";
