"use client";

import { useState, useEffect, useCallback } from "react";
import { initializeDemoData, resetDemoData, seedDemoData } from "@/lib/seed";
import { getItem, clearKeys } from "@/lib/storage/storage";
import { STORAGE_KEYS, CURRENT_SEED_VERSION } from "@/lib/storage/keys";
import { getUsers }         from "@/lib/storage/users";
import { getStudents }      from "@/lib/storage/students";
import { getTeachers }      from "@/lib/storage/teachers";
import { getParents }       from "@/lib/storage/parents";
import { getClasses }       from "@/lib/storage/classes";
import { getSubjects }      from "@/lib/storage/subjects";
import { getAssignments }   from "@/lib/storage/assignments";
import { getSubmissions }   from "@/lib/storage/submissions";
import { getAttendance }    from "@/lib/storage/attendance";
import { getResults }       from "@/lib/storage/results";
import { getFees }          from "@/lib/storage/fees";
import { getPayments }      from "@/lib/storage/payments";
import { getAnnouncements } from "@/lib/storage/announcements";
import { getEvents }        from "@/lib/storage/events";
import { getMessages }      from "@/lib/storage/messages";
import { getNotifications } from "@/lib/storage/notifications";
import { getAdmissions }    from "@/lib/storage/admissions";

// ── Helpers ───────────────────────────────────────────────────────────────────

function readStats() {
  return {
    seedVersion:   getItem(STORAGE_KEYS.SEED_VERSION) ?? "—",
    initialized:   getItem(STORAGE_KEYS.INITIALIZED) ?? false,
    users:         getUsers().length,
    students:      getStudents().length,
    teachers:      getTeachers().length,
    parents:       getParents().length,
    classes:       getClasses().length,
    subjects:      getSubjects().length,
    assignments:   getAssignments().length,
    submissions:   getSubmissions().length,
    attendance:    getAttendance().length,
    results:       getResults().length,
    fees:          getFees().length,
    payments:      getPayments().length,
    announcements: getAnnouncements().length,
    events:        getEvents().length,
    messages:      getMessages().length,
    notifications: getNotifications().length,
    admissions:    getAdmissions().length,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DevDataPage() {
  const [stats, setStats] = useState(null);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);

  const addLog = (msg) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 20));

  const refresh = useCallback(() => {
    setStats(readStats());
  }, []);

  // Load stats on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  function handleSeed() {
    setBusy(true);
    try {
      initializeDemoData();
      refresh();
      addLog("initializeDemoData() called — data seeded if not already present.");
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    if (!window.confirm("Reset ALL demo data? This cannot be undone.")) return;
    setBusy(true);
    try {
      resetDemoData();
      refresh();
      addLog("resetDemoData() — all lca_* keys wiped and re-seeded.");
    } finally {
      setBusy(false);
    }
  }

  function handleClear() {
    if (!window.confirm("Clear ALL lca_* keys? You will need to re-seed manually.")) return;
    setBusy(true);
    try {
      clearKeys(Object.values(STORAGE_KEYS));
      refresh();
      addLog("clearKeys() — all lca_* keys removed.");
    } finally {
      setBusy(false);
    }
  }

  function handleForceSeed() {
    setBusy(true);
    try {
      seedDemoData();
      refresh();
      addLog("seedDemoData() — collections overwritten with demo data.");
    } finally {
      setBusy(false);
    }
  }

  const collections = stats
    ? [
        { label: "Users",         count: stats.users,         key: "users" },
        { label: "Students",      count: stats.students,      key: "students" },
        { label: "Teachers",      count: stats.teachers,      key: "teachers" },
        { label: "Parents",       count: stats.parents,       key: "parents" },
        { label: "Classes",       count: stats.classes,       key: "classes" },
        { label: "Subjects",      count: stats.subjects,      key: "subjects" },
        { label: "Assignments",   count: stats.assignments,   key: "assignments" },
        { label: "Submissions",   count: stats.submissions,   key: "submissions" },
        { label: "Attendance",    count: stats.attendance,    key: "attendance" },
        { label: "Results",       count: stats.results,       key: "results" },
        { label: "Fees",          count: stats.fees,          key: "fees" },
        { label: "Payments",      count: stats.payments,      key: "payments" },
        { label: "Announcements", count: stats.announcements, key: "announcements" },
        { label: "Events",        count: stats.events,        key: "events" },
        { label: "Messages",      count: stats.messages,      key: "messages" },
        { label: "Notifications", count: stats.notifications, key: "notifications" },
        { label: "Admissions",    count: stats.admissions,    key: "admissions" },
      ]
    : [];

  return (
    <main className="dev-page">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="dev-page__header">
        <div className="dev-page__header-inner">
          <div>
            <div className="dev-page__badge">Development Only</div>
            <h1 className="dev-page__title">Data Inspector</h1>
            <p className="dev-page__subtitle">
              Laurel Children Academy · localStorage demo data · Phase 3
            </p>
          </div>
          <button
            className="dev-page__refresh-btn"
            onClick={refresh}
            disabled={busy}
            aria-label="Refresh statistics"
          >
            ↺ Refresh
          </button>
        </div>
      </div>

      <div className="dev-page__body">
        {/* ── Seed status ────────────────────────────────────────── */}
        <section className="dev-card">
          <h2 className="dev-card__title">Seed Status</h2>
          <div className="dev-status-grid">
            <div className="dev-status-item">
              <span className="dev-status-item__label">Initialized</span>
              <span className={`dev-status-item__value ${stats?.initialized ? "dev-status-item__value--ok" : "dev-status-item__value--warn"}`}>
                {stats === null ? "…" : stats.initialized ? "Yes ✓" : "No"}
              </span>
            </div>
            <div className="dev-status-item">
              <span className="dev-status-item__label">Stored Version</span>
              <span className="dev-status-item__value">{stats?.seedVersion ?? "…"}</span>
            </div>
            <div className="dev-status-item">
              <span className="dev-status-item__label">Current Version</span>
              <span className="dev-status-item__value dev-status-item__value--ok">{CURRENT_SEED_VERSION}</span>
            </div>
          </div>
        </section>

        {/* ── Collection counts ──────────────────────────────────── */}
        <section className="dev-card">
          <h2 className="dev-card__title">Collections</h2>
          <div className="dev-collection-grid">
            {collections.map(({ label, count }) => (
              <div key={label} className="dev-collection-item">
                <span className="dev-collection-item__label">{label}</span>
                <span className={`dev-collection-item__count ${count > 0 ? "dev-collection-item__count--ok" : "dev-collection-item__count--empty"}`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Actions ────────────────────────────────────────────── */}
        <section className="dev-card">
          <h2 className="dev-card__title">Actions</h2>
          <p className="dev-card__description">
            These actions directly modify <code>localStorage</code>. Refresh the page or click{" "}
            <strong>↺ Refresh</strong> to see updated counts.
          </p>
          <div className="dev-actions">
            <button
              className="dev-btn dev-btn--primary"
              onClick={handleSeed}
              disabled={busy}
            >
              Seed Demo Data
              <span className="dev-btn__sub">initializeDemoData() — only seeds if not already present</span>
            </button>
            <button
              className="dev-btn dev-btn--secondary"
              onClick={handleForceSeed}
              disabled={busy}
            >
              Force Re-seed
              <span className="dev-btn__sub">seedDemoData() — overwrites all collections with demo defaults</span>
            </button>
            <button
              className="dev-btn dev-btn--danger"
              onClick={handleReset}
              disabled={busy}
            >
              Reset Demo Data
              <span className="dev-btn__sub">resetDemoData() — wipes all lca_* keys then re-seeds</span>
            </button>
            <button
              className="dev-btn dev-btn--ghost"
              onClick={handleClear}
              disabled={busy}
            >
              Clear All Data
              <span className="dev-btn__sub">clearKeys() — removes all lca_* keys without re-seeding</span>
            </button>
          </div>
        </section>

        {/* ── Action log ─────────────────────────────────────────── */}
        {log.length > 0 && (
          <section className="dev-card">
            <h2 className="dev-card__title">Log</h2>
            <ul className="dev-log">
              {log.map((entry, i) => (
                <li key={i} className="dev-log__entry">
                  {entry}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Warning ────────────────────────────────────────────── */}
        <p className="dev-page__warning">
          ⚠ This page is for development only. Do not link it from the public navigation.
        </p>
      </div>
    </main>
  );
}
