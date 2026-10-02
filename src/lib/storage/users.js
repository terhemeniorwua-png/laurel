/**
 * Laurel Children Academy — Users storage module.
 * Provides CRUD operations for the lca_users collection.
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

const KEY = STORAGE_KEYS.USERS;

/** @returns {Array} all user records */
export function getUsers() {
  return getCollection(KEY);
}

/** @param {string} id @returns {object|undefined} */
export function getUserById(id) {
  return getUsers().find((u) => u.id === id);
}

/** @param {string} email @returns {object|undefined} */
export function getUserByEmail(email) {
  return getUsers().find((u) => u.email?.toLowerCase() === email?.toLowerCase());
}

/** @param {string} role @returns {Array} */
export function getUsersByRole(role) {
  return getUsers().filter((u) => u.role === role);
}

/**
 * Create a new user record.
 * @param {object} data
 * @returns {object} the created user
 */
export function createUser(data) {
  const now = new Date().toISOString();
  const user = { id: generateId("user"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, user);
  return user;
}

/**
 * Update an existing user.
 * @param {string} id
 * @param {object} updates
 * @returns {Array} updated collection
 */
export function updateUser(id, updates) {
  return updateInCollection(KEY, id, updates);
}

/** @param {string} id @returns {Array} */
export function deleteUser(id) {
  return removeFromCollection(KEY, id);
}

/** Overwrite the entire users collection (used by seed). */
export function setUsers(users) {
  setCollection(KEY, users);
}
