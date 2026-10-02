/**
 * Laurel Children Academy — Assignments storage module.
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

const KEY = STORAGE_KEYS.ASSIGNMENTS;

export function getAssignments() {
  return getCollection(KEY);
}

export function getAssignmentById(id) {
  return getAssignments().find((a) => a.id === id);
}

export function getAssignmentsByClass(classId) {
  return getAssignments().filter((a) => a.classId === classId);
}

export function getAssignmentsByTeacher(teacherId) {
  return getAssignments().filter((a) => a.teacherId === teacherId);
}

export function getAssignmentsBySubject(subjectId) {
  return getAssignments().filter((a) => a.subjectId === subjectId);
}

/** Returns published assignments for a class — what students see. */
export function getPublishedAssignmentsForClass(classId) {
  return getAssignments().filter(
    (a) => a.classId === classId && a.status === "published"
  );
}

export function createAssignment(data) {
  const now = new Date().toISOString();
  const assignment = {
    id: generateId("asgn"),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, assignment);
  return assignment;
}

export function updateAssignment(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteAssignment(id) {
  return removeFromCollection(KEY, id);
}

export function setAssignments(assignments) {
  setCollection(KEY, assignments);
}
