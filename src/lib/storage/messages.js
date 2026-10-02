/**
 * Laurel Children Academy — Messages storage module.
 */
import { STORAGE_KEYS } from "./keys.js";
import {
  getCollection,
  setCollection,
  appendToCollection,
  updateInCollection,
} from "./storage.js";
import { generateId } from "../utils/id.js";

const KEY = STORAGE_KEYS.MESSAGES;

export function getMessages() {
  return getCollection(KEY);
}

export function getMessageById(id) {
  return getMessages().find((m) => m.id === id);
}

/** All messages received by a user. */
export function getInbox(userId) {
  return getMessages()
    .filter((m) => m.recipientId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** All messages sent by a user. */
export function getSent(userId) {
  return getMessages()
    .filter((m) => m.senderId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Count of unread messages for a user. */
export function getUnreadCount(userId) {
  return getMessages().filter((m) => m.recipientId === userId && !m.read).length;
}

/** Mark a single message as read. */
export function markAsRead(id) {
  return updateInCollection(KEY, id, { read: true });
}

export function createMessage(data) {
  const now = new Date().toISOString();
  const message = {
    id: generateId("msg"),
    read: false,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  appendToCollection(KEY, message);
  return message;
}

export function setMessages(messages) {
  setCollection(KEY, messages);
}
