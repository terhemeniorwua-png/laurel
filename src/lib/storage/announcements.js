/**
 * Laurel Children Academy — Announcements storage module.
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

const KEY = STORAGE_KEYS.ANNOUNCEMENTS;

export function getAnnouncements() {
  return getCollection(KEY);
}

export function getAnnouncementById(id) {
  return getAnnouncements().find((a) => a.id === id);
}

/**
 * Returns announcements visible to a given audience.
 * "all" announcements are always returned.
 * @param {string} audience — "all" | "parents" | "students" | "teachers" | "staff"
 */
export function getAnnouncementsForAudience(audience) {
  return getAnnouncements().filter(
    (a) => a.audience === "all" || a.audience === audience
  );
}

export function getAnnouncementsByAuthor(authorId) {
  return getAnnouncements().filter((a) => a.authorId === authorId);
}

export function createAnnouncement(data) {
  const now = new Date().toISOString();
  const announcement = {
    id: generateId("ann"),
    priority: "normal",
    audience: "all",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, announcement);
  return announcement;
}

export function updateAnnouncement(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteAnnouncement(id) {
  return removeFromCollection(KEY, id);
}

export function setAnnouncements(announcements) {
  setCollection(KEY, announcements);
}
