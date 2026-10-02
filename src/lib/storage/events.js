/**
 * Laurel Children Academy — Events storage module.
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

const KEY = STORAGE_KEYS.EVENTS;

export function getEvents() {
  return getCollection(KEY);
}

export function getEventById(id) {
  return getEvents().find((e) => e.id === id);
}

export function getEventsByCategory(category) {
  return getEvents().filter((e) => e.category === category);
}

/** Returns upcoming events (date >= today), sorted ascending. */
export function getUpcomingEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return getEvents()
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function createEvent(data) {
  const now = new Date().toISOString();
  const event = { id: generateId("evt"), createdAt: now, updatedAt: now, ...data };
  appendToCollection(KEY, event);
  return event;
}

export function updateEvent(id, updates) {
  return updateInCollection(KEY, id, updates);
}

export function deleteEvent(id) {
  return removeFromCollection(KEY, id);
}

export function setEvents(events) {
  setCollection(KEY, events);
}
