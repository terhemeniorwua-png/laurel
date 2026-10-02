/**
 * Laurel Children Academy — Notifications storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.NOTIFICATIONS;

export function getNotifications() {
  return getCollection(KEY);
}

export function getNotificationById(id) {
  return getNotifications().find((n) => n.id === id);
}

/** All notifications for a specific user, newest first. */
export function getNotificationsForUser(userId) {
  return getNotifications()
    .filter((n) => n.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Count of unread notifications for a user. */
export function getUnreadCount(userId) {
  return getNotifications().filter((n) => n.userId === userId && !n.read).length;
}

/** Mark a single notification as read. */
export function markAsRead(id) {
  return updateInCollection(KEY, id, { read: true });
}

/** Mark all notifications for a user as read. */
export function markAllAsRead(userId) {
  const all = getNotifications();
  const updated = all.map((n) =>
    n.userId === userId && !n.read
      ? { ...n, read: true, updatedAt: new Date().toISOString() }
      : n
  );
  setCollection(KEY, updated);
  return updated;
}

export function createNotification(data) {
  const now = new Date().toISOString();
  const notification = {
    id: generateId("notif"),
    read: false,
    link: null,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, notification);
  return notification;
}

export function setNotifications(notifications) {
  setCollection(KEY, notifications);
}
