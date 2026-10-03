"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BookOpen, Plus, Pencil, Trash2, Users, UserCheck,
  GraduationCap, X, AlertTriangle, Search, ChevronDown,
} from "lucide-react";
import { getClasses, createClass, updateClass, deleteClass } from "@/lib/storage/classes";
import { getTeachers } from "@/lib/storage/teachers";
import { getStudentsByClass } from "@/lib/storage/students";

// ── Constants ─────────────────────────────────────────────────────────────────

const LEVELS = [
  "Nursery 1", "Nursery 2", "Reception",
  "Primary 1", "Primary 2", "Primary 3",
  "Primary 4", "Primary 5", "Primary 6",
];

const SECTIONS = ["", "A", "B", "C", "D"];

const STATUS_OPTIONS = ["active", "inactive"];

const EMPTY_FORM = {
  name: "",
  level: "",
  section: "",
  teacherId: "",
  capacity: "",
  session: "2025/2026",
  status: "active",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusBadgeClass(status) {
  return status === "active"
    ? "class-card__status class-card__status--active"
    : "class-card__status class-card__status--inactive";
}

function teacherFullName(teachers, teacherId) {
  if (!teacherId) return "Unassigned";
  const t = teachers.find((t) => t.id === teacherId);
  if (!t) return "Unassigned";
  return `${t.firstName} ${t.lastName}`;
}

function capacityFill(enrolled, capacity) {
  if (!capacity) return 0;
  return Math.min(100, Math.round((enrolled / capacity) * 100));
}

function capacityStatus(enrolled, capacity) {
  const pct = capacityFill(enrolled, capacity);
  if (pct >= 100) return "full";
  if (pct >= 80)  return "near";
  return "ok";
}

// ── Class Card ────────────────────────────────────────────────────────────────

function ClassCard({ cls, teachers, onEdit, onDelete }) {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    setStudentCount(getStudentsByClass(cls.id).length);
  }, [cls.id]);

  const teacher  = teacherFullName(teachers, cls.teacherId);
  const fill     = capacityFill(studentCount, cls.capacity);
  const capStatus = capacityStatus(studentCount, cls.capacity);

  return (
    <article className="class-card" aria-label={`${cls.name} class card`}>
      {/* Header */}
      <div className="class-card__header">
        <div className="class-card__icon" aria-hidden="true">
          <BookOpen size={20} strokeWidth={1.75} />
        </div>
        <div className="class-card__title-group">
          <h2 className="class-card__name">{cls.name}</h2>
          {cls.level && (
            <span className="class-card__level">{cls.level}</span>
          )}
        </div>
        <span className={statusBadgeClass(cls.status ?? "active")}>
          {cls.status === "inactive" ? "Inactive" : "Active"}
        </span>
      </div>

      {/* Stats */}
      <div className="class-card__stats">
        <div className="class-card__stat">
          <UserCheck size={14} strokeWidth={1.75} aria-hidden="true" />
          <span className="class-card__stat-label">Teacher</span>
          <span className="class-card__stat-value">{teacher}</span>
        </div>
        <div className="class-card__stat">
          <Users size={14} strokeWidth={1.75} aria-hidden="true" />
          <span className="class-card__stat-label">Students</span>
          <span className="class-card__stat-value">
            {studentCount} / {cls.capacity ?? "—"}
          </span>
        </div>
        <div className="class-card__stat">
          <GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />
          <span className="class-card__stat-label">Session</span>
          <span className="class-card__stat-value">{cls.session ?? "—"}</span>
        </div>
      </div>

      {/* Capacity bar */}
      {cls.capacity > 0 && (
        <div className="class-card__capacity">
          <div className="class-card__capacity-header">
            <span className="class-card__capacity-label">Capacity</span>
            <span className={`class-card__capacity-pct class-card__capacity-pct--${capStatus}`}>
              {fill}%
            </span>
          </div>
          <div
            className="class-card__capacity-track"
            role="progressbar"
            aria-valuenow={fill}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${fill}% full`}
          >
            <div
              className={`class-card__capacity-fill class-card__capacity-fill--${capStatus}`}
              style={{ width: `${fill}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="class-card__actions">
        <button
          className="class-card__btn class-card__btn--edit"
          onClick={() => onEdit(cls)}
          aria-label={`Edit ${cls.name}`}
        >
          <Pencil size={14} aria-hidden="true" />
          Edit
        </button>
        <button
          className="class-card__btn class-card__btn--delete"
          onClick={() => onDelete(cls)}
          aria-label={`Delete ${cls.name}`}
        >
          <Trash2 size={14} aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  );
}

// ── Add / Edit Modal ──────────────────────────────────────────────────────────

function ClassModal({ mode, initial, teachers, onClose, onSave }) {
  const [form, setForm]     = useState({ ...EMPTY_FORM, ...initial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Class name is required.";
    if (form.capacity && (isNaN(Number(form.capacity)) || Number(form.capacity) < 1)) {
      errs.capacity = "Capacity must be a positive number.";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      capacity: form.capacity ? Number(form.capacity) : null,
      section: form.section || null,
      teacherId: form.teacherId || null,
    };
    onSave(payload);
  }

  const isEdit = mode === "edit";

  return (
    <div
      className="class-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="class-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="class-modal">
        {/* Header */}
        <div className="class-modal__header">
          <h2 id="class-modal-title" className="class-modal__title">
            {isEdit ? "Edit Class" : "Add New Class"}
          </h2>
          <button
            className="class-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form className="class-modal__form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="class-modal__field">
            <label htmlFor="class-name" className="class-modal__label">
              Class Name <span aria-hidden="true" className="class-modal__required">*</span>
            </label>
            <input
              id="class-name"
              name="name"
              type="text"
              className={`class-modal__input${errors.name ? " class-modal__input--error" : ""}`}
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Primary 4B"
              autoComplete="off"
              required
              aria-required="true"
              aria-describedby={errors.name ? "class-name-err" : undefined}
            />
            {errors.name && (
              <span id="class-name-err" className="class-modal__error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Level + Section */}
          <div className="class-modal__row">
            <div className="class-modal__field">
              <label htmlFor="class-level" className="class-modal__label">Level</label>
              <div className="class-modal__select-wrap">
                <select
                  id="class-level"
                  name="level"
                  className="class-modal__select"
                  value={form.level}
                  onChange={handleChange}
                >
                  <option value="">— Select level —</option>
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="class-modal__select-icon" aria-hidden="true" />
              </div>
            </div>

            <div className="class-modal__field">
              <label htmlFor="class-section" className="class-modal__label">Section</label>
              <div className="class-modal__select-wrap">
                <select
                  id="class-section"
                  name="section"
                  className="class-modal__select"
                  value={form.section}
                  onChange={handleChange}
                >
                  <option value="">— None —</option>
                  {SECTIONS.filter(Boolean).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="class-modal__select-icon" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Teacher */}
          <div className="class-modal__field">
            <label htmlFor="class-teacher" className="class-modal__label">Form Teacher</label>
            <div className="class-modal__select-wrap">
              <select
                id="class-teacher"
                name="teacherId"
                className="class-modal__select"
                value={form.teacherId}
                onChange={handleChange}
              >
                <option value="">— Unassigned —</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.firstName} {t.lastName}
                    {t.department ? ` (${t.department})` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="class-modal__select-icon" aria-hidden="true" />
            </div>
          </div>

          {/* Capacity + Session */}
          <div className="class-modal__row">
            <div className="class-modal__field">
              <label htmlFor="class-capacity" className="class-modal__label">Capacity</label>
              <input
                id="class-capacity"
                name="capacity"
                type="number"
                min="1"
                max="100"
                className={`class-modal__input${errors.capacity ? " class-modal__input--error" : ""}`}
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 30"
                aria-describedby={errors.capacity ? "class-capacity-err" : undefined}
              />
              {errors.capacity && (
                <span id="class-capacity-err" className="class-modal__error" role="alert">
                  {errors.capacity}
                </span>
              )}
            </div>

            <div className="class-modal__field">
              <label htmlFor="class-session" className="class-modal__label">Academic Session</label>
              <input
                id="class-session"
                name="session"
                type="text"
                className="class-modal__input"
                value={form.session}
                onChange={handleChange}
                placeholder="e.g. 2025/2026"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Status */}
          <div className="class-modal__field">
            <label htmlFor="class-status" className="class-modal__label">Status</label>
            <div className="class-modal__select-wrap">
              <select
                id="class-status"
                name="status"
                className="class-modal__select"
                value={form.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="class-modal__select-icon" aria-hidden="true" />
            </div>
          </div>

          {/* Buttons */}
          <div className="class-modal__footer">
            <button
              type="button"
              className="class-modal__cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="class-modal__save"
              disabled={saving}
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete Confirmation Modal ─────────────────────────────────────────────────

function DeleteModal({ cls, onClose, onConfirm }) {
  return (
    <div
      className="class-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="class-modal class-modal--sm">
        <div className="class-modal__header">
          <div className="class-delete__icon-wrap" aria-hidden="true">
            <AlertTriangle size={22} />
          </div>
          <h2 id="delete-modal-title" className="class-modal__title">Delete Class</h2>
          <button
            className="class-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="class-modal__body">
          <p className="class-delete__msg">
            Are you sure you want to delete{" "}
            <strong>{cls.name}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="class-modal__footer">
          <button className="class-modal__cancel" onClick={onClose}>Cancel</button>
          <button className="class-modal__delete-confirm" onClick={onConfirm}>
            Delete Class
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ hasSearch, onAdd }) {
  return (
    <div className="classes-empty" role="status">
      <div className="classes-empty__icon" aria-hidden="true">
        <BookOpen size={40} strokeWidth={1.25} />
      </div>
      {hasSearch ? (
        <>
          <h3 className="classes-empty__title">No classes found</h3>
          <p className="classes-empty__desc">
            No classes match your search. Try a different keyword.
          </p>
        </>
      ) : (
        <>
          <h3 className="classes-empty__title">No classes yet</h3>
          <p className="classes-empty__desc">
            Get started by adding the first class to Laurel Children Academy.
          </p>
          <button className="classes-empty__btn" onClick={onAdd}>
            <Plus size={16} aria-hidden="true" />
            Add First Class
          </button>
        </>
      )}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="classes-toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ClassesPage() {
  const [classes,  setClasses]  = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null); // null | { mode: "add" | "edit", data: {} }
  const [delTarget, setDelTarget] = useState(null); // class object | null
  const [toast,    setToast]    = useState("");

  // Load on mount
  useEffect(() => {
    setClasses(getClasses());
    setTeachers(getTeachers());
  }, []);

  // Filtered list
  const filtered = classes.filter((c) =>
    !search.trim() ||
    c.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    (c.level ?? "").toLowerCase().includes(search.trim().toLowerCase()) ||
    (c.session ?? "").toLowerCase().includes(search.trim().toLowerCase())
  );

  function showToast(msg) {
    setToast(msg);
  }

  const dismissToast = useCallback(() => setToast(""), []);

  // ── CRUD ──

  function handleAdd() {
    setModal({ mode: "add", data: {} });
  }

  function handleEdit(cls) {
    setModal({
      mode: "edit",
      data: {
        ...cls,
        capacity: cls.capacity ?? "",
        section: cls.section ?? "",
        teacherId: cls.teacherId ?? "",
        status: cls.status ?? "active",
      },
    });
  }

  function handleDeletePrompt(cls) {
    setDelTarget(cls);
  }

  function handleSave(formData) {
    if (modal.mode === "edit") {
      updateClass(modal.data.id, formData);
      setClasses(getClasses());
      showToast(`"${formData.name}" updated successfully.`);
    } else {
      createClass(formData);
      setClasses(getClasses());
      showToast(`"${formData.name}" added successfully.`);
    }
    setModal(null);
  }

  function handleDeleteConfirm() {
    if (!delTarget) return;
    deleteClass(delTarget.id);
    setClasses(getClasses());
    showToast(`"${delTarget.name}" deleted.`);
    setDelTarget(null);
  }

  return (
    <div className="classes-page">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="classes-page__header">
        <div className="classes-page__header-left">
          <h1 className="classes-page__title">Classes</h1>
          <p className="classes-page__subtitle">
            {classes.length} class{classes.length !== 1 ? "es" : ""} · 2025/2026 Academic Session
          </p>
        </div>
        <button
          className="classes-page__add-btn"
          onClick={handleAdd}
          aria-label="Add new class"
        >
          <Plus size={17} aria-hidden="true" />
          Add Class
        </button>
      </div>

      {/* ── Search bar ───────────────────────────────────────── */}
      {classes.length > 0 && (
        <div className="classes-page__search-wrap">
          <Search size={16} className="classes-page__search-icon" aria-hidden="true" />
          <input
            type="search"
            className="classes-page__search"
            placeholder="Search classes by name, level or session…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search classes"
          />
        </div>
      )}

      {/* ── Grid / Empty state ───────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState hasSearch={search.trim().length > 0} onAdd={handleAdd} />
      ) : (
        <div className="classes-grid" role="list" aria-label="Classes">
          {filtered.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              teachers={teachers}
              onEdit={handleEdit}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      )}

      {/* ── Add / Edit modal ─────────────────────────────────── */}
      {modal && (
        <ClassModal
          mode={modal.mode}
          initial={modal.data}
          teachers={teachers}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* ── Delete confirmation modal ─────────────────────────── */}
      {delTarget && (
        <DeleteModal
          cls={delTarget}
          onClose={() => setDelTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* ── Toast notification ────────────────────────────────── */}
      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  );
}
