/**
 * Laurel Children Academy — Submissions storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.SUBMISSIONS;

export function getSubmissions() {
  return getCollection(KEY);
}

export function getSubmissionById(id) {
  return getSubmissions().find((s) => s.id === id);
}

export function getSubmissionsByStudent(studentId) {
  return getSubmissions().filter((s) => s.studentId === studentId);
}

export function getSubmissionsByAssignment(assignmentId) {
  return getSubmissions().filter((s) => s.assignmentId === assignmentId);
}

/** Returns the submission by a specific student for a specific assignment. */
export function getSubmission(assignmentId, studentId) {
  return getSubmissions().find(
    (s) => s.assignmentId === assignmentId && s.studentId === studentId
  );
}

export function createSubmission(data) {
  const now = new Date().toISOString();
  const submission = {
    id: generateId("sub"),
    status: "pending",
    grade: null,
    feedback: null,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, submission);
  return submission;
}

export function updateSubmission(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function setSubmissions(submissions) {
  setCollection(KEY, submissions);
}
