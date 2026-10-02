/**
 * Laurel Children Academy — Fees storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.FEES;

export function getFees() {
  return getCollection(KEY);
}

export function getFeeById(id) {
  return getFees().find((f) => f.id === id);
}

export function getFeesByStudent(studentId) {
  return getFees().filter((f) => f.studentId === studentId);
}

export function getFeesByStatus(status) {
  return getFees().filter((f) => f.status === status);
}

export function getFeesByStudentAndTerm(studentId, session, term) {
  return getFees().filter(
    (f) => f.studentId === studentId && f.session === session && f.term === term
  );
}

/**
 * Total outstanding amount for a student.
 * @param {string} studentId
 * @returns {number}
 */
export function getOutstandingBalance(studentId) {
  return getFeesByStudent(studentId)
    .filter((f) => f.status !== "paid")
    .reduce((sum, f) => sum + (f.amount - (f.amountPaid || 0)), 0);
}

export function createFee(data) {
  const now = new Date().toISOString();
  const fee = {
    id: generateId("fee"),
    status: "pending",
    amountPaid: 0,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, fee);
  return fee;
}

export function updateFee(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function setFees(fees) {
  setCollection(KEY, fees);
}
