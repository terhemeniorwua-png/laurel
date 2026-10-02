/**
 * Laurel Children Academy — Subjects storage module.
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

const KEY = STORAGE_KEYS.SUBJECTS;

export function getSubjects() {
  return getCollection(KEY);
}

export function getSubjectById(id) {
  return getSubjects().find((s) => s.id === id);
}

export function createSubject(data) {
  const now = new Date().toISOString();
  const subject = { id: generateId("subj"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, subject);
  return subject;
}

export function updateSubject(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteSubject(id) {
  return removeFromCollection(KEY, id);
}

export function setSubjects(subjects) {
  setCollection(KEY, subjects);
}
