/**
 * Laurel Children Academy — Payments storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.PAYMENTS;

export function getPayments() {
  return getCollection(KEY);
}

export function getPaymentById(id) {
  return getPayments().find((p) => p.id === id);
}

export function getPaymentsByStudent(studentId) {
  return getPayments().filter((p) => p.studentId === studentId);
}

export function getPaymentsByFee(feeId) {
  return getPayments().filter((p) => p.feeId === feeId);
}

/**
 * Total amount paid toward a specific fee.
 * @param {string} feeId
 * @returns {number}
 */
export function getTotalPaidForFee(feeId) {
  return getPaymentsByFee(feeId)
    .filter((p) => p.status === "successful")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
}

export function createPayment(data) {
  const now = new Date().toISOString();
  const payment = {
    id: generateId("pay"),
    status: "successful",
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, payment);
  return payment;
}

export function setPayments(payments) {
  setCollection(KEY, payments);
}
