/**
 * Laurel Children Academy — Low-level localStorage abstraction.
 *
 * All localStorage access goes through these functions.
 * UI components and entity modules must NOT call localStorage directly.
 *
 * Safety guarantees:
 *  - Safe to import in server components: no module-level window access.
 *  - Safe to call during SSR: all functions check `typeof window`.
 *  - Malformed JSON is caught and returns `null` / the provided default.
 *  - Missing keys return `null` / the provided default.
 *  - Serialization errors are caught and logged without crashing.
 *
 * Future migration path:
 *  Replace the body of these functions with API calls when a backend exists.
 */

/**
 * True when running in a browser environment.
 * @returns {boolean}
 */
function isBrowser() {
  return typeof window !== "undefined";
}

// ── Core primitives ───────────────────────────────────────────────────────────

/**
 * Read and JSON-parse a value from localStorage.
 *
 * @template T
 * @param {string} key
 * @param {T} [defaultValue=null] — returned when key is missing or JSON invalid
 * @returns {T|null}
 */
export function getItem(key, defaultValue = null) {
  if (!isBrowser()) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return defaultValue;
    return JSON.parse(raw);
  } catch {
    console.warn(`[lca-storage] Failed to parse key "${key}". Returning default.`);
    return defaultValue;
  }
}

/**
 * JSON-stringify and store a value in localStorage.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean} — true on success, false on failure
 */
export function setItem(key, value) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[lca-storage] Failed to write key "${key}":`, err);
    return false;
  }
}

/**
 * Remove a key from localStorage.
 *
 * @param {string} key
 */
export function removeItem(key) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[lca-storage] Failed to remove key "${key}":`, err);
  }
}

// ── Collection helpers ────────────────────────────────────────────────────────

/**
 * Read a collection (array) from localStorage.
 * Always returns an array — never null / undefined.
 *
 * @param {string} key
 * @returns {Array}
 */
export function getCollection(key) {
  const data = getItem(key, []);
  return Array.isArray(data) ? data : [];
}

/**
 * Overwrite an entire collection in localStorage.
 *
 * @param {string} key
 * @param {Array} items
 */
export function setCollection(key, items) {
  setItem(key, Array.isArray(items) ? items : []);
}

/**
 * Append a single item to an existing collection.
 * Does NOT check for duplicate IDs — caller is responsible.
 *
 * @param {string} key
 * @param {object} item
 * @returns {Array} — the updated collection
 */
export function appendToCollection(key, item) {
  const existing = getCollection(key);
  const updated = [...existing, item];
  setCollection(key, updated);
  return updated;
}

/**
 * Replace one item in a collection by matching on `item.id`.
 * Returns the updated collection. If no match is found, the original is returned.
 *
 * @param {string} key
 * @param {string} id
 * @param {object} updates — fields to merge into the matched item
 * @returns {Array}
 */
export function updateInCollection(key, id, updates) {
  const existing = getCollection(key);
  const updated = existing.map((item) =>
    item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
  );
  setCollection(key, updated);
  return updated;
}

/**
 * Remove one item from a collection by `id`.
 *
 * @param {string} key
 * @param {string} id
 * @returns {Array}
 */
export function removeFromCollection(key, id) {
  const existing = getCollection(key);
  const updated = existing.filter((item) => item.id !== id);
  setCollection(key, updated);
  return updated;
}

// ── Bulk / meta helpers ───────────────────────────────────────────────────────

/**
 * Remove all localStorage keys that match the given key names.
 *
 * @param {string[]} keys
 */
export function clearKeys(keys) {
  keys.forEach((k) => removeItem(k));
}

/**
 * Check whether a key exists and has a non-null value.
 *
 * @param {string} key
 * @returns {boolean}
 */
export function hasItem(key) {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(key) !== null;
}
