'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/lib/storage/teachers';
import { getClasses } from '@/lib/storage/classes';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronDown,
  Users,
  AlertCircle,
  CheckCircle2,
  Filter,
} from 'lucide-react';

/* ── Static reference data ──────────────────────────────── */
const AVAILABLE_SUBJECTS = [
  { id: 'subj_eng',   name: 'English Language' },
  { id: 'subj_math',  name: 'Mathematics' },
  { id: 'subj_sci',   name: 'Basic Science' },
  { id: 'subj_soc',   name: 'Social Studies' },
  { id: 'subj_comp',  name: 'Computer Studies' },
  { id: 'subj_arts',  name: 'Creative Arts' },
  { id: 'subj_phe',   name: 'Physical & Health Education' },
  { id: 'subj_civic', name: 'Civic Education' },
];

const FALLBACK_CLASSES = [
  { id: 'class_nur2',  name: 'Nursery 2' },
  { id: 'class_rec',   name: 'Reception' },
  { id: 'class_pri1a', name: 'Primary 1A' },
  { id: 'class_pri3a', name: 'Primary 3A' },
  { id: 'class_pri5a', name: 'Primary 5A' },
  { id: 'class_pri6a', name: 'Primary 6A' },
];

const STATUS_OPTIONS = ['active', 'inactive', 'on_leave'];

/* ── Helpers ─────────────────────────────────────────────── */
function subjectName(id) {
  return AVAILABLE_SUBJECTS.find((s) => s.id === id)?.name ?? id;
}

function className(id, classes) {
  return (classes.find((c) => c.id === id) ?? {}).name ?? id;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const EMPTY_FORM = {
  firstName:     '',
  lastName:      '',
  email:         '',
  phone:         '',
  department:    '',
  qualification: '',
  subjects:      [],
  classIds:      [],
  status:        'active',
};

/* ── StatusBadge ─────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    active:   { label: 'Active',    cls: 'mgmt-badge mgmt-badge--active' },
    inactive: { label: 'Inactive',  cls: 'mgmt-badge mgmt-badge--inactive' },
    on_leave: { label: 'On Leave',  cls: 'mgmt-badge mgmt-badge--on-leave' },
  };
  const { label, cls } = map[status] ?? { label: status, cls: 'mgmt-badge' };
  return <span className={cls}>{label}</span>;
}

/* ── MultiSelect checkboxes component ───────────────────── */
function CheckboxGroup({ items, selected, onChange, label }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="mgmt-checkbox-group">
      {label && <span className="mgmt-checkbox-group__label">{label}</span>}
      <div className="mgmt-checkbox-list">
        {items.map((item) => (
          <label key={item.id} className="mgmt-checkbox-item">
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggle(item.id)}
              className="mgmt-checkbox-input"
            />
            <span className="mgmt-checkbox-text">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── TeacherModal ────────────────────────────────────────── */
function TeacherModal({ teacher, classes, onSave, onClose }) {
  const isEdit = Boolean(teacher?.id);
  const [form, setForm] = useState(
    isEdit
      ? {
          firstName:     teacher.firstName     ?? '',
          lastName:      teacher.lastName      ?? '',
          email:         teacher.email         ?? '',
          phone:         teacher.phone         ?? '',
          department:    teacher.department    ?? '',
          qualification: teacher.qualification ?? '',
          subjects:      teacher.subjects      ?? [],
          classIds:      teacher.classIds      ?? [],
          status:        teacher.status        ?? 'active',
        }
      : { ...EMPTY_FORM }
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim())  errs.firstName = 'First name is required.';
    if (!form.lastName.trim())   errs.lastName  = 'Last name is required.';
    if (!form.email.trim())      errs.email     = 'Email is required.';
    else if (!validateEmail(form.email)) errs.email = 'Enter a valid email address.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  }

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="mgmt-modal-overlay" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit teacher' : 'Add teacher'}>
      <div className="mgmt-modal">
        {/* Header */}
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">{isEdit ? 'Edit Teacher' : 'Add Teacher'}</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form className="mgmt-modal__body" onSubmit={handleSubmit} noValidate>
          {/* Name row */}
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">First Name <span className="mgmt-required">*</span></label>
              <input
                type="text"
                className={`mgmt-input${errors.firstName ? ' mgmt-input--error' : ''}`}
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                placeholder="e.g. Grace"
                autoComplete="given-name"
              />
              {errors.firstName && <span className="mgmt-error">{errors.firstName}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Last Name <span className="mgmt-required">*</span></label>
              <input
                type="text"
                className={`mgmt-input${errors.lastName ? ' mgmt-input--error' : ''}`}
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                placeholder="e.g. Williams"
                autoComplete="family-name"
              />
              {errors.lastName && <span className="mgmt-error">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Email <span className="mgmt-required">*</span></label>
              <input
                type="email"
                className={`mgmt-input${errors.email ? ' mgmt-input--error' : ''}`}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="teacher@laurelacademy.edu"
                autoComplete="email"
              />
              {errors.email && <span className="mgmt-error">{errors.email}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Phone</label>
              <input
                type="tel"
                className="mgmt-input"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="e.g. 08012345678"
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Department + Qualification */}
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Department</label>
              <input
                type="text"
                className="mgmt-input"
                value={form.department}
                onChange={(e) => set('department', e.target.value)}
                placeholder="e.g. Sciences"
              />
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Qualification</label>
              <input
                type="text"
                className="mgmt-input"
                value={form.qualification}
                onChange={(e) => set('qualification', e.target.value)}
                placeholder="e.g. B.Ed Mathematics"
              />
            </div>
          </div>

          {/* Status */}
          <div className="mgmt-field">
            <label className="mgmt-label">Status</label>
            <div className="mgmt-select-wrap">
              <select
                className="mgmt-select"
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s === 'on_leave' ? 'On Leave' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="mgmt-select-icon" />
            </div>
          </div>

          {/* Subjects multi-select */}
          <div className="mgmt-field">
            <label className="mgmt-label">Subjects</label>
            <CheckboxGroup
              items={AVAILABLE_SUBJECTS}
              selected={form.subjects}
              onChange={(val) => set('subjects', val)}
            />
          </div>

          {/* Classes multi-select */}
          <div className="mgmt-field">
            <label className="mgmt-label">Assigned Classes</label>
            <CheckboxGroup
              items={classes.length ? classes : FALLBACK_CLASSES}
              selected={form.classIds}
              onChange={(val) => set('classIds', val)}
            />
          </div>

          {/* Footer */}
          <div className="mgmt-modal__footer">
            <button type="button" className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="mgmt-btn mgmt-btn--primary" disabled={saving}>
              {saving ? (
                <>
                  <span className="mgmt-spinner" />
                  Saving…
                </>
              ) : isEdit ? (
                'Save Changes'
              ) : (
                'Add Teacher'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── DeleteModal ─────────────────────────────────────────── */
function DeleteModal({ teacher, onConfirm, onClose }) {
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="mgmt-modal-overlay" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label="Delete teacher">
      <div className="mgmt-modal mgmt-modal--sm">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">Remove Teacher</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="mgmt-modal__body mgmt-modal__body--confirm">
          <div className="mgmt-confirm-icon">
            <AlertCircle size={32} />
          </div>
          <p className="mgmt-confirm-text">
            Are you sure you want to remove{' '}
            <strong>{teacher.firstName} {teacher.lastName}</strong> from the system?
            This action cannot be undone.
          </p>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="mgmt-btn mgmt-btn--danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="mgmt-spinner mgmt-spinner--white" />
                Removing…
              </>
            ) : (
              'Yes, Remove'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className={`mgmt-toast mgmt-toast--${type}`} role="status" aria-live="polite">
      {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      <span>{message}</span>
      <button className="mgmt-toast__close" onClick={onDismiss} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function TeachersPage() {
  const [teachers, setTeachers]     = useState([]);
  const [classes,  setClassesState] = useState([]);
  const [loading,  setLoading]      = useState(true);

  /* Modal state */
  const [addEditModal, setAddEditModal]   = useState(null); // null | 'add' | teacher-object
  const [deleteTarget, setDeleteTarget]   = useState(null); // null | teacher-object

  /* Toast */
  const [toast, setToast] = useState(null); // null | { message, type }

  /* Filters */
  const [search,        setSearch]        = useState('');
  const [filterStatus,  setFilterStatus]  = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  /* ── Load data on mount ─────────────────────────────────── */
  useEffect(() => {
    try {
      setTeachers(getTeachers());
      const c = getClasses();
      setClassesState(c.length ? c : FALLBACK_CLASSES);
    } catch (err) {
      console.error('[TeachersPage] load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Toast helpers ──────────────────────────────────────── */
  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  /* ── CRUD handlers ──────────────────────────────────────── */
  function handleSave(formData) {
    if (addEditModal === 'add') {
      const newTeacher = createTeacher(formData);
      setTeachers((prev) => [...prev, newTeacher]);
      showToast(`${newTeacher.firstName} ${newTeacher.lastName} added successfully.`);
    } else {
      const updated = updateTeacher(addEditModal.id, formData);
      setTeachers((prev) =>
        prev.map((t) => (t.id === addEditModal.id ? { ...t, ...formData } : t))
      );
      showToast(`${formData.firstName} ${formData.lastName} updated successfully.`);
    }
    setAddEditModal(null);
  }

  function handleDelete() {
    deleteTeacher(deleteTarget.id);
    setTeachers((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    showToast(`${deleteTarget.firstName} ${deleteTarget.lastName} removed.`, 'error');
    setDeleteTarget(null);
  }

  /* ── Filtered / searched list ────────────────────────────── */
  const filtered = useMemo(() => {
    let list = teachers;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) ||
          (t.email ?? '').toLowerCase().includes(q)
      );
    }

    if (filterStatus) {
      list = list.filter((t) => t.status === filterStatus);
    }

    if (filterSubject) {
      list = list.filter(
        (t) => Array.isArray(t.subjects) && t.subjects.includes(filterSubject)
      );
    }

    return list;
  }, [teachers, search, filterStatus, filterSubject]);

  /* ── Derived class list for display ─────────────────────── */
  const classMap = useMemo(() => {
    const m = {};
    (classes.length ? classes : FALLBACK_CLASSES).forEach((c) => { m[c.id] = c.name; });
    return m;
  }, [classes]);

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="mgmt-page">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="mgmt-page__header">
        <div className="mgmt-page__header-left">
          <h1 className="mgmt-page__title">Teachers</h1>
          <p className="mgmt-page__desc">
            Manage teaching staff, subjects, and class assignments.
          </p>
        </div>
        <button
          className="mgmt-btn mgmt-btn--primary"
          onClick={() => setAddEditModal('add')}
        >
          <Plus size={16} />
          Add Teacher
        </button>
      </div>

      {/* ── Filters bar ──────────────────────────────────── */}
      <div className="mgmt-filters">
        {/* Search */}
        <div className="mgmt-search-wrap">
          <Search size={15} className="mgmt-search-icon" />
          <input
            type="text"
            className="mgmt-search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search teachers"
          />
          {search && (
            <button
              className="mgmt-search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="mgmt-filter-group">
          <Filter size={14} className="mgmt-filter-icon" />
          <div className="mgmt-select-wrap">
            <select
              className="mgmt-select mgmt-select--sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === 'on_leave' ? 'On Leave' : s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="mgmt-select-icon" />
          </div>
        </div>

        {/* Subject filter */}
        <div className="mgmt-filter-group">
          <div className="mgmt-select-wrap">
            <select
              className="mgmt-select mgmt-select--sm"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              aria-label="Filter by subject"
            >
              <option value="">All Subjects</option>
              {AVAILABLE_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <ChevronDown size={13} className="mgmt-select-icon" />
          </div>
        </div>

        {/* Result count */}
        <span className="mgmt-count">
          {filtered.length} {filtered.length === 1 ? 'teacher' : 'teachers'}
        </span>
      </div>

      {/* ── Table / Empty state ───────────────────────────── */}
      {loading ? (
        <div className="mgmt-loading">
          <span className="mgmt-spinner mgmt-spinner--lg" />
          <span>Loading teachers…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mgmt-empty">
          <div className="mgmt-empty__icon">
            <Users size={40} />
          </div>
          <h3 className="mgmt-empty__title">
            {teachers.length === 0 ? 'No teachers yet' : 'No results found'}
          </h3>
          <p className="mgmt-empty__desc">
            {teachers.length === 0
              ? 'Add your first teacher to get started.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {teachers.length === 0 && (
            <button
              className="mgmt-btn mgmt-btn--primary"
              onClick={() => setAddEditModal('add')}
            >
              <Plus size={16} />
              Add Teacher
            </button>
          )}
        </div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table" aria-label="Teachers table">
            <thead>
              <tr>
                <th className="mgmt-th">Name</th>
                <th className="mgmt-th">Email</th>
                <th className="mgmt-th">Phone</th>
                <th className="mgmt-th">Subjects</th>
                <th className="mgmt-th">Classes</th>
                <th className="mgmt-th">Status</th>
                <th className="mgmt-th mgmt-th--actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((teacher) => {
                const subjectNames = (teacher.subjects ?? [])
                  .map((id) => subjectName(id))
                  .join(', ') || '—';
                const classNames = (teacher.classIds ?? [])
                  .map((id) => classMap[id] ?? id)
                  .join(', ') || '—';

                return (
                  <tr key={teacher.id} className="mgmt-tr">
                    <td className="mgmt-td">
                      <div className="mgmt-name-cell">
                        <div className="mgmt-avatar">
                          {(teacher.firstName?.[0] ?? '?').toUpperCase()}
                          {(teacher.lastName?.[0]  ?? '').toUpperCase()}
                        </div>
                        <div>
                          <div className="mgmt-name">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          {teacher.department && (
                            <div className="mgmt-sub">{teacher.department}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="mgmt-td">
                      <span className="mgmt-muted">{teacher.email || '—'}</span>
                    </td>
                    <td className="mgmt-td">
                      <span className="mgmt-muted">{teacher.phone || '—'}</span>
                    </td>
                    <td className="mgmt-td">
                      <span className="mgmt-tags-text">{subjectNames}</span>
                    </td>
                    <td className="mgmt-td">
                      <span className="mgmt-tags-text">{classNames}</span>
                    </td>
                    <td className="mgmt-td">
                      <StatusBadge status={teacher.status} />
                    </td>
                    <td className="mgmt-td mgmt-td--actions">
                      <button
                        className="mgmt-action-btn mgmt-action-btn--edit"
                        onClick={() => setAddEditModal(teacher)}
                        aria-label={`Edit ${teacher.firstName} ${teacher.lastName}`}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="mgmt-action-btn mgmt-action-btn--delete"
                        onClick={() => setDeleteTarget(teacher)}
                        aria-label={`Remove ${teacher.firstName} ${teacher.lastName}`}
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit modal ─────────────────────────────── */}
      {addEditModal && (
        <TeacherModal
          teacher={addEditModal === 'add' ? null : addEditModal}
          classes={classes.length ? classes : FALLBACK_CLASSES}
          onSave={handleSave}
          onClose={() => setAddEditModal(null)}
        />
      )}

      {/* ── Delete confirmation modal ─────────────────────── */}
      {deleteTarget && (
        <DeleteModal
          teacher={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast notification ────────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
