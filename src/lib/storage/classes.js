/**
 * Laurel Children Academy — Classes storage module.
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

const KEY = STORAGE_KEYS.CLASSES;

export function getClasses() {
  return getCollection(KEY);
}

export function getClassById(id) {
  return getClasses().find((c) => c.id === id);
}

/** @param {string} teacherId */
export function getClassesByTeacher(teacherId) {
  return getClasses().filter((c) => c.teacherId === teacherId);
}

export function createClass(data) {
  const now = new Date().toISOString();
  const cls = { id: generateId("class"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, cls);
  return cls;
}

export function updateClass(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteClass(id) {
  return removeFromCollection(KEY, id);
}

export function setClasses(classes) {
  setCollection(KEY, classes);
}
