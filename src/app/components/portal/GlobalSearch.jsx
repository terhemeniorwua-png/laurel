"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, Users, GraduationCap, BookOpen, BookMarked, CalendarDays, Wallet } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getStudents } from "@/lib/storage/students";
import { getTeachers } from "@/lib/storage/teachers";
import { getClasses } from "@/lib/storage/classes";
import { getAssignments } from "@/lib/storage/assignments";
import { getItem, setItem } from "@/lib/storage/storage";

const RECENT_KEY = "lca_recent_searches";

function getRecentSearches() { return getItem(RECENT_KEY, []); }
function saveRecentSearch(q) {
  if (!q.trim()) return;
  const recent = getRecentSearches().filter((r) => r !== q).slice(0, 4);
  setItem(RECENT_KEY, [q, ...recent]);
}

const CATEGORY_ICONS = {
  Students:    Users,
  Teachers:    GraduationCap,
  Classes:     BookOpen,
  Assignments: BookMarked,
  Events:      CalendarDays,
};

export default function GlobalSearch({ open, onClose }) {
  const { user } = useAuth();
  const router   = useRouter();
  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [recent,  setRecent]  = useState([]);
  const [cursor,  setCursor]  = useState(-1);
  const inputRef  = useRef(null);
  const listRef   = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(-1);
      setRecent(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const search = useCallback((q) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const found = [];

    // Students
    getStudents().filter((s) => `${s.firstName} ${s.lastName} ${s.admissionNumber || ""}`.toLowerCase().includes(lower))
      .slice(0, 4).forEach((s) => found.push({ id: s.id, category: "Students", label: `${s.firstName} ${s.lastName}`, sub: s.admissionNumber || s.classId, href: "/portal/students" }));

    // Teachers
    getTeachers().filter((t) => `${t.firstName} ${t.lastName} ${t.email}`.toLowerCase().includes(lower))
      .slice(0, 3).forEach((t) => found.push({ id: t.id, category: "Teachers", label: `${t.firstName} ${t.lastName}`, sub: t.email, href: "/portal/teachers" }));

    // Classes
    getClasses().filter((c) => c.name.toLowerCase().includes(lower))
      .slice(0, 3).forEach((c) => found.push({ id: c.id, category: "Classes", label: c.name, sub: c.session, href: "/portal/classes" }));

    // Assignments
    getAssignments().filter((a) => a.title.toLowerCase().includes(lower))
      .slice(0, 3).forEach((a) => found.push({ id: a.id, category: "Assignments", label: a.title, sub: a.status, href: "/portal/assignments" }));

    setResults(found);
    setCursor(-1);
  }, []);

  useEffect(() => { search(query); }, [query, search]);

  function navigate(href) {
    saveRecentSearch(query || "");
    setRecent(getRecentSearches());
    router.push(href);
    onClose();
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    const items = results;
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, items.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(c - 1, -1)); }
    if (e.key === "Enter" && cursor >= 0 && items[cursor]) { navigate(items[cursor].href); }
  }

  // Group results by category
  const grouped = {};
  results.forEach((r) => {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  });
  const allItems = results;

  if (!open) return null;

  return (
    <div className="gsearch-overlay" role="dialog" aria-modal="true" aria-label="Global search" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="gsearch-panel">
        {/* Input */}
        <div className="gsearch-input-wrap">
          <Search size={18} className="gsearch-input-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            className="gsearch-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search students, teachers, classes, assignments…"
            aria-label="Global search input"
            autoComplete="off"
          />
          {query && (
            <button className="gsearch-clear" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>
          )}
          <kbd className="gsearch-esc" aria-label="Press Escape to close">Esc</kbd>
        </div>

        {/* Results */}
        <div className="gsearch-body" ref={listRef}>
          {!query && recent.length > 0 && (
            <div className="gsearch-section">
              <p className="gsearch-section-title"><Clock size={13} aria-hidden="true" /> Recent</p>
              {recent.map((r, i) => (
                <button key={i} className="gsearch-item" onClick={() => setQuery(r)} aria-label={`Search for ${r}`}>
                  <Clock size={14} className="gsearch-item-icon" aria-hidden="true" />{r}
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="gsearch-empty">No results for "<strong>{query}</strong>"</div>
          )}

          {query && Object.entries(grouped).map(([category, items]) => {
            const Icon = CATEGORY_ICONS[category] || Search;
            return (
              <div key={category} className="gsearch-section">
                <p className="gsearch-section-title"><Icon size={13} aria-hidden="true" /> {category}</p>
                {items.map((item, i) => {
                  const globalIdx = allItems.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      className={`gsearch-item${cursor === globalIdx ? " gsearch-item--active" : ""}`}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setCursor(globalIdx)}
                      aria-selected={cursor === globalIdx}
                    >
                      <div className="gsearch-item-body">
                        <span className="gsearch-item-label">{item.label}</span>
                        {item.sub && <span className="gsearch-item-sub">{item.sub}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="gsearch-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
