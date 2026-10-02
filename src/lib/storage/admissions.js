/**
 * Laurel Children Academy — Admissions storage module.
 *
 * Provides CRUD for the lca_admissions collection.
 * Extends the base module with a human-readable application ID generator
 * so the parent-facing confirmation can show e.g. "LCA-2026-0004".
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.ADMISSIONS;

// ── Application ID generator ──────────────────────────────────────────────────

/**
 * Generate a human-readable application ID.
 * Format: LCA-YYYY-NNNN where NNNN is zero-padded sequential.
 *
 * @param {Array} existingAdmissions — current collection, used to determine next seq
 * @returns {string}  e.g. "LCA-2026-0001"
 */
export function generateApplicationId(existingAdmissions = []) {
  const year = new Date().getFullYear();
  // Count existing applications for the current year
  const prefix = `LCA-${year}-`;
  const yearApps = existingAdmissions.filter((a) =>
    a.applicationId && a.applicationId.startsWith(prefix)
  );
  const next = yearApps.length + 1;
  return `${prefix}${String(next).padStart(4, "0")}`;
}

// ── Collection accessors ──────────────────────────────────────────────────────

export function getAdmissions() {
  return getCollection(KEY);
}

export function getAdmissionById(id) {
  return getAdmissions().find((a) => a.id === id);
}

/** Look up by the human-readable applicationId (e.g. "LCA-2026-0001"). */
export function getAdmissionByAppId(applicationId) {
  return getAdmissions().find(
    (a) => a.applicationId?.toLowerCase() === applicationId?.toLowerCase()
  );
}

export function getAdmissionsByStatus(status) {
  return getAdmissions().filter((a) => a.status === status);
}

export function getAdmissionsByClass(desiredClass) {
  return getAdmissions().filter((a) =>
    a.child?.preferredClass === desiredClass ||
    a.desiredClass === desiredClass
  );
}

// ── Mutation ──────────────────────────────────────────────────────────────────

/**
 * Create and persist a new admission application.
 *
 * Automatically assigns:
 *  - internal `id` (random)
 *  - human-readable `applicationId` (LCA-YYYY-NNNN)
 *  - `status: "submitted"`
 *  - `submittedAt`, `updatedAt`, `createdAt`
 *
 * @param {object} data — application payload (child, guardian, previousSchool, …)
 * @returns {object} the saved application record
 */
export function createAdmission(data) {
  const now = new Date().toISOString();
  const existing = getAdmissions();
  const applicationId = generateApplicationId(existing);

  const admission = {
    id: generateId("adm"),
    applicationId,
    status: "submitted",
    notes: "",
    submittedAt: now,
    updatedAt: now,
    createdAt: now,
    ...data,
  };

  appendToCollection(KEY, admission);
  return admission;
}

/** Update status, notes, etc. (used by admin review in later phases). */
export function updateAdmission(id, updates) {
  return updateInCollection(KEY, id, updates);
}

/** Overwrite the entire admissions collection (used by seed). */
export function setAdmissions(admissions) {
  setCollection(KEY, admissions);
}
