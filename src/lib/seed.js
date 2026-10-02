/**
 * Laurel Children Academy — Demo data seed orchestrator.
 *
 * Three public functions:
 *
 *  initializeDemoData()
 *    Called once on app start (from a client component).
 *    Seeds data only if lca_seed_version is not already set.
 *    Idempotent — safe to call multiple times.
 *
 *  seedDemoData()
 *    Writes all demo collections unconditionally.
 *    Used internally by initializeDemoData() and resetDemoData().
 *
 *  resetDemoData()
 *    Clears all lca_* keys then re-seeds from scratch.
 *    Development utility — do not expose in production UI.
 *
 * ─────────────────────────────────────────────────────────────
 * IMPORTANT: This file imports from localStorage-backed modules.
 * It must only be called from client-side code (useEffect, event
 * handlers, client components). Never call it during SSR.
 * ─────────────────────────────────────────────────────────────
 */

import { STORAGE_KEYS, CURRENT_SEED_VERSION } from "./storage/keys.js";
import { getItem, setItem, clearKeys } from "./storage/storage.js";

// ── Entity set functions (used to bulk-write each collection) ─────────────────
import { setUsers }         from "./storage/users.js";
import { setStudents }      from "./storage/students.js";
import { setTeachers }      from "./storage/teachers.js";
import { setParents }       from "./storage/parents.js";
import { setClasses }       from "./storage/classes.js";
import { setSubjects }      from "./storage/subjects.js";
import { setAssignments }   from "./storage/assignments.js";
import { setSubmissions }   from "./storage/submissions.js";
import { setAttendance }    from "./storage/attendance.js";
import { setResults }       from "./storage/results.js";
import { setFees }          from "./storage/fees.js";
import { setPayments }      from "./storage/payments.js";
import { setAnnouncements } from "./storage/announcements.js";
import { setEvents }        from "./storage/events.js";
import { setMessages }      from "./storage/messages.js";
import { setNotifications } from "./storage/notifications.js";
import { setAdmissions }    from "./storage/admissions.js";

// ── Demo data imports ─────────────────────────────────────────────────────────
import demoUsers         from "../data/demo/users.js";
import demoStudents      from "../data/demo/students.js";
import demoTeachers      from "../data/demo/teachers.js";
import demoParents       from "../data/demo/parents.js";
import demoClasses       from "../data/demo/classes.js";
import demoSubjects      from "../data/demo/subjects.js";
import demoAssignments   from "../data/demo/assignments.js";
import demoSubmissions   from "../data/demo/submissions.js";
import demoAttendance    from "../data/demo/attendance.js";
import demoResults       from "../data/demo/results.js";
import demoFees          from "../data/demo/fees.js";
import demoPayments      from "../data/demo/payments.js";
import demoAnnouncements from "../data/demo/announcements.js";
import demoEvents        from "../data/demo/events.js";
import demoMessages      from "../data/demo/messages.js";
import demoNotifications from "../data/demo/notifications.js";
import demoAdmissions    from "../data/demo/admissions.js";

// ── All lca_* keys — used by resetDemoData to wipe cleanly ───────────────────
const ALL_KEYS = Object.values(STORAGE_KEYS);

// ─────────────────────────────────────────────────────────────────────────────
// seedDemoData
// Writes all 17 collections unconditionally, then records the seed version.
// ─────────────────────────────────────────────────────────────────────────────
export function seedDemoData() {
  setUsers(demoUsers);
  setStudents(demoStudents);
  setTeachers(demoTeachers);
  setParents(demoParents);
  setClasses(demoClasses);
  setSubjects(demoSubjects);
  setAssignments(demoAssignments);
  setSubmissions(demoSubmissions);
  setAttendance(demoAttendance);
  setResults(demoResults);
  setFees(demoFees);
  setPayments(demoPayments);
  setAnnouncements(demoAnnouncements);
  setEvents(demoEvents);
  setMessages(demoMessages);
  setNotifications(demoNotifications);
  setAdmissions(demoAdmissions);

  // Record that seeding is complete and store the version
  setItem(STORAGE_KEYS.SEED_VERSION, CURRENT_SEED_VERSION);
  setItem(STORAGE_KEYS.INITIALIZED, true);

  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[lca] Demo data seeded successfully (version ${CURRENT_SEED_VERSION}).`
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// initializeDemoData
// Called on every app load — only seeds if no version is recorded.
// Safe to call multiple times; will NOT overwrite user-created data.
// ─────────────────────────────────────────────────────────────────────────────
export function initializeDemoData() {
  // Guard: only runs in the browser
  if (typeof window === "undefined") return;

  const existingVersion = getItem(STORAGE_KEYS.SEED_VERSION);

  if (existingVersion === CURRENT_SEED_VERSION) {
    // Already initialized at the current version — nothing to do
    return;
  }

  if (existingVersion === null) {
    // First ever launch — seed from scratch
    seedDemoData();
    return;
  }

  // Future versions can add migration logic here.
  // For now: if version differs but exists, we do NOT auto-wipe —
  // this preserves any user-created records across code updates.
  // Developer can call resetDemoData() manually if a clean slate is needed.
  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[lca] Existing seed version "${existingVersion}" differs from current ` +
        `"${CURRENT_SEED_VERSION}". Skipping auto-reseed to preserve data. ` +
        `Call resetDemoData() to reset.`
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// resetDemoData
// Development utility: wipes all lca_* keys then re-seeds.
// DO NOT call this from any user-facing UI without an explicit confirmation.
// ─────────────────────────────────────────────────────────────────────────────
export function resetDemoData() {
  if (typeof window === "undefined") return;
  clearKeys(ALL_KEYS);
  seedDemoData();

  if (process.env.NODE_ENV !== "production") {
    console.info("[lca] Demo data has been reset to defaults.");
  }
}
