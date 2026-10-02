/**
 * Laurel Children Academy — Attendance storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.ATTENDANCE;

export function getAttendance() {
  return getCollection(KEY);
}

export function getAttendanceById(id) {
  return getAttendance().find((a) => a.id === id);
}

export function getAttendanceByStudent(studentId) {
  return getAttendance().filter((a) => a.studentId === studentId);
}

export function getAttendanceByClass(classId) {
  return getAttendance().filter((a) => a.classId === classId);
}

export function getAttendanceByDate(date) {
  return getAttendance().filter((a) => a.date === date);
}

export function getAttendanceByStudentAndDate(studentId, date) {
  return getAttendance().find((a) => a.studentId === studentId && a.date === date);
}

/**
 * Calculate attendance percentage for a student.
 * @param {string} studentId
 * @returns {{ total: number, present: number, percentage: number }}
 */
export function getAttendanceSummary(studentId) {
  const records = getAttendanceByStudent(studentId);
  const total = records.length;
  const present = records.filter((r) => r.status === "present" || r.status === "late").length;
  return {
    total,
    present,
    percentage: total > 0 ? Math.round((present / total) * 100) : 0,
  };
}

export function createAttendance(data) {
  const now = new Date().toISOString();
  const record = { id: generateId("att"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, record);
  return record;
}

export function updateAttendance(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function setAttendance(records) {
  setCollection(KEY, records);
}
