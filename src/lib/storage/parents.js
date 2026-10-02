/**
 * Laurel Children Academy — Parents storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
  removeFromCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.PARENTS;

export function getParents() {
  return getCollection(KEY);
}

export function getParentById(id) {
  return getParents().find((p) => p.id === id);
}

export function getParentByUserId(userId) {
  return getParents().find((p) => p.userId === userId);
}

/** Returns the parent record for a given studentId. */
export function getParentByStudentId(studentId) {
  return getParents().find(
    (p) => Array.isArray(p.studentIds) && p.studentIds.includes(studentId)
  );
}

export function createParent(data) {
  const now = new Date().toISOString();
  const parent = { id: generateId("parent"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, parent);
  return parent;
}

export function updateParent(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteParent(id) {
  return removeFromCollection(KEY, id);
}

export function setParents(parents) {
  setCollection(KEY, parents);
}
