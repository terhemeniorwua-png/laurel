/**
 * Laurel Children Academy — ID generation utility.
 *
 * Generates unique, stable IDs for demo records.
 * IDs are human-readable prefixed strings so records are easy to debug.
 *
 * Design:
 *  - Prefix identifies the entity type (e.g. "user", "student").
 *  - Suffix is a compact random alphanumeric segment.
 *  - IDs are assigned once during seeding and never regenerated.
 */

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a short random alphanumeric segment of the given length.
 * @param {number} length
 * @returns {string}
 */
function randomSegment(length = 8) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return result;
}

/**
 * Generate a unique ID with an optional prefix.
 *
 * Examples:
 *   generateId()             → "xk8mq2vp"
 *   generateId("student")   → "student_xk8mq2vp"
 *   generateId("payment")   → "payment_xk8mq2vp"
 *
 * @param {string} [prefix] — entity type prefix
 * @returns {string}
 */
export function generateId(prefix = "") {
  const segment = randomSegment(8);
  return prefix ? `${prefix}_${segment}` : segment;
}

/**
 * Generate a sequential demo ID for use in seed files.
 * These IDs are hardcoded in seed data so relationships remain stable.
 *
 * Usage in seed files:
 *   const ID = demoId;
 *   export const DEMO_USERS = { ADMIN: demoId("user", "001"), ... };
 *
 * @param {string} prefix
 * @param {string} seq — zero-padded sequence, e.g. "001"
 * @returns {string}
 */
export function demoId(prefix, seq) {
  return `${prefix}_${seq}`;
}
