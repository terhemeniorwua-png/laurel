/**
 * Laurel Children Academy — Students storage module.
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

const KEY = STORAGE_KEYS.STUDENTS;

export function getStudents() {
  return getCollection(KEY);
}

/** @param {string} id */
export function getStudentById(id) {
  return getStudents().find((s) => s.id === id);
}

/** @param {string} classId */
export function getStudentsByClass(classId) {
  return getStudents().filter((s) => s.classId === classId);
}

/** @param {string} parentId */
export function getStudentsByParent(parentId) {
  return getStudents().filter((s) => s.parentId === parentId);
}

export function createStudent(data) {
  const now = new Date().toISOString();
  const student = { id: generateId("student"), status: "active", createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, student);
  return student;
}

export function updateStudent(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteStudent(id) {
  return removeFromCollection(KEY, id);
}

export function setStudents(students) {
  setCollection(KEY, students);
}
