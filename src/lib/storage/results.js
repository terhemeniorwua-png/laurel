/**
 * Laurel Children Academy — Results storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.RESULTS;

export function getResults() {
  return getCollection(KEY);
}

export function getResultById(id) {
  return getResults().find((r) => r.id === id);
}

export function getResultsByStudent(studentId) {
  return getResults().filter((r) => r.studentId === studentId);
}

export function getResultsByClass(classId) {
  return getResults().filter((r) => r.classId === classId);
}

export function getResultsByStudentAndTerm(studentId, session, term) {
  return getResults().filter(
    (r) => r.studentId === studentId && r.session === session && r.term === term
  );
}

export function getResultsByClassAndSubject(classId, subjectId) {
  return getResults().filter((r) => r.classId === classId && r.subjectId === subjectId);
}

/**
 * Calculate average total score for a student in a term.
 * @param {string} studentId
 * @param {string} session
 * @param {string} term
 * @returns {number}
 */
export function getStudentAverage(studentId, session, term) {
  const results = getResultsByStudentAndTerm(studentId, session, term);
  if (!results.length) return 0;
  const sum = results.reduce((acc, r) => acc + (r.total || 0), 0);
  return Math.round((sum / results.length) * 10) / 10;
}

export function createResult(data) {
  const now = new Date().toISOString();
  const result = { id: generateId("res"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, result);
  return result;
}

export function updateResult(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function setResults(results) {
  setCollection(KEY, results);
}
