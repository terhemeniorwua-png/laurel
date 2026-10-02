/**
 * Laurel Children Academy — Admissions storage module.
 * Extended for Phase 5 with generateApplicationId and getAdmissionByAppId.
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

/**
 * Generate a human-readable application ID: LCA-YYYY-NNNN
 * @param {Array} existingAdmissions
 * @returns {string}
 */
export function generateApplicationId(existingAdmissions = []) {
  const year = new Date().getFullYear();
  const prefix = `LCA-${year}-`;
  const count = existingAdmissions.filter(
    (a) => a.applicationId && a.applicationId.startsWith(prefix)
  ).length;
  return `${prefix}${String(count + 1).padStart(4, "0")}`;
}

export function getAdmissions() {
  return getCollection(KEY);
}

export function getAdmissionById(id) {
  return getAdmissions().find((a) => a.id === id);
}

/** Look up by human-readable applicationId e.g. "LCA-2026-0001" */
export function getAdmissionByAppId(applicationId) {
  return getAdmissions().find(
    (a) => a.applicationId?.toLowerCase() === applicationId?.trim().toLowerCase()
  );
}

export function getAdmissionsByStatus(status) {
  return getAdmissions().filter((a) => a.status === status);
}

/**
 * Create and persist a new admission application.
 * Assigns applicationId, status:"submitted", timestamps automatically.
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

export function updateAdmission(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function setAdmissions(admissions) {
  setCollection(KEY, admissions);
}
