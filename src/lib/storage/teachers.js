/**
 * Laurel Children Academy — Teachers storage module.
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

const KEY = STORAGE_KEYS.TEACHERS;

export function getTeachers() {
  return getCollection(KEY);
}

export function getTeacherById(id) {
  return getTeachers().find((t) => t.id === id);
}

export function getTeacherByUserId(userId) {
  return getTeachers().find((t) => t.userId === userId);
}

/** @param {string} classId */
export function getTeachersByClass(classId) {
  return getTeachers().filter((t) => Array.isArray(t.classIds) && t.classIds.includes(classId));
}

/** @param {string} subjectId */
export function getTeachersBySubject(subjectId) {
  return getTeachers().filter((t) => Array.isArray(t.subjects) && t.subjects.includes(subjectId));
}

export function createTeacher(data) {
  const now = new Date().toISOString();
  const teacher = { id: generateId("teacher"), status: "active", createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, teacher);
  return teacher;
}

export function updateTeacher(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteTeacher(id) {
  return removeFromCollection(KEY, id);
}

export function setTeachers(teachers) {
  setCollection(KEY, teachers);
}
