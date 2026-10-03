'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '@/lib/storage/students';
import { getClasses } from '@/lib/storage/classes';
import { getParents } from '@/lib/storage/parents';

/* ── helpers ─────────────────────────────────────────────── */
function calcAge(dateOfBirth) {
  if (!dateOfBirth) return '—';
  return Math.floor(
    (new Date() - new Date(dateOfBirth)) / (365.25 * 24 * 3600 * 1000)
  );
}

function getClassName(classId, classes) {
  const cls = classes.find((c) => c.id === classId);
  return cls ? cls.name : '—';
}

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  classId: '',
  parentId: '',
  status: 'active',
};

/* ── main component ──────────────────────────────────────── */
export default function StudentsPage() {
  /* ── data state ── */
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── filter / search / sort state ── */
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');

  /* ── modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add, object = edit
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  /* ── delete modal state ── */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ── load data ── */
  useEffect(() => {
    setLoading(true);
    setStudents(getStudents());
    setClasses(getClasses());
    setParents(getParents());
    setLoading(false);
  }, []);

  /* ── derived list ── */
  const filtered = useMemo(() => {
    let list = [...students];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          (s.admissionNumber || '').toLowerCase().includes(q)
      );
    }
    if (filterClass) list = list.filter((s) => s.classId === filterClass);
    if (filterGender) list = list.filter((s) => s.gender === filterGender);
    if (filterStatus) list = list.filter((s) => s.status === filterStatus);

    list.sort((a, b) => {
      if (sortBy === 'name') {
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      }
      if (sortBy === 'admissionNumber') {
        return (a.admissionNumber || '').localeCompare(
          b.admissionNumber || ''
        );
      }
      if (sortBy === 'class') {
        return getClassName(a.classId, classes).localeCompare(
          getClassName(b.classId, classes)
        );
      }
      return 0;
    });

    return list;
  }, [students, search, filterClass, filterGender, filterStatus, sortBy, classes]);

  /* ── open add modal ── */
  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setSuccessMsg('');
    setModalOpen(true);
  }

  /* ── open edit modal ── */
  function openEdit(student) {
    setEditTarget(student);
    setForm({
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      dateOfBirth: student.dateOfBirth || '',
      gender: student.gender || '',
      classId: student.classId || '',
      parentId: student.parentId || '',
      status: student.status || 'active',
    });
    setErrors({});
    setSuccessMsg('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  /* ── form field change ── */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  /* ── validate ── */
  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required.';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!form.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.';
    if (!form.gender) errs.gender = 'Gender is required.';
    if (!form.classId) errs.classId = 'Class is required.';
    return errs;
  }

  /* ── save ── */
  function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    try {
      if (editTarget) {
        updateStudent(editTarget.id, {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          classId: form.classId,
          parentId: form.parentId || editTarget.parentId || '',
          status: form.status,
        });
        setSuccessMsg(`${form.firstName} ${form.lastName} updated successfully.`);
      } else {
        createStudent({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          classId: form.classId,
          parentId: form.parentId || '',
          status: form.status,
        });
        setSuccessMsg(`${form.firstName} ${form.lastName} added successfully.`);
      }
      setStudents(getStudents());
      closeModal();
    } catch {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  /* ── delete ── */
  function openDelete(student) {
    setDeleteTarget(student);
  }

  function closeDelete() {
    setDeleteTarget(null);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      deleteStudent(deleteTarget.id);
      setStudents(getStudents());
      setSuccessMsg(
        `${deleteTarget.firstName} ${deleteTarget.lastName} has been removed.`
      );
      closeDelete();
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
    }
  }

  /* ── render ── */
  return (
    <div className="mgmt-page">
      {/* ── Page header ── */}
      <div className="mgmt-header">
        <div className="mgmt-header__left">
          <h1 className="mgmt-header__title">Students</h1>
          <p className="mgmt-header__desc">
            Manage student records, class assignments, and enrolment status.
          </p>
        </div>
        <button className="mgmt-btn mgmt-btn--primary" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Student
        </button>
      </div>

      {/* ── Success banner ── */}
      {successMsg && (
        <div className="mgmt-success" role="status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          {successMsg}
          <button
            className="mgmt-success__close"
            onClick={() => setSuccessMsg('')}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      {/* ── Toolbar: search + filters + sort ── */}
      <div className="mgmt-toolbar">
        {/* Search */}
        <div className="mgmt-search-wrap">
          <svg className="mgmt-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            className="mgmt-search"
            type="search"
            placeholder="Search by name or admission number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search students"
          />
        </div>

        <div className="mgmt-filters">
          {/* Class filter */}
          <select
            className="mgmt-select"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            aria-label="Filter by class"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Gender filter */}
          <select
            className="mgmt-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            aria-label="Filter by gender"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Status filter */}
          <select
            className="mgmt-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Sort */}
          <select
            className="mgmt-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort by"
          >
            <option value="name">Sort: Name</option>
            <option value="admissionNumber">Sort: Admission No.</option>
            <option value="class">Sort: Class</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="mgmt-loading" aria-live="polite">
          <div className="mgmt-loading__spinner" aria-hidden="true" />
          <span>Loading students…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mgmt-empty">
          <svg className="mgmt-empty__icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <p className="mgmt-empty__title">No students found</p>
          <p className="mgmt-empty__sub">
            {search || filterClass || filterGender || filterStatus
              ? 'Try adjusting your search or filters.'
              : 'Add your first student to get started.'}
          </p>
          {!search && !filterClass && !filterGender && !filterStatus && (
            <button className="mgmt-btn mgmt-btn--primary" onClick={openAdd}>
              Add Student
            </button>
          )}
        </div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table" aria-label="Students list">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission No.</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="mgmt-table__name-cell">
                      <div className="mgmt-table__avatar" aria-hidden="true">
                        {(student.firstName?.[0] || '?').toUpperCase()}
                      </div>
                      <span className="mgmt-table__name">
                        {student.firstName} {student.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="mgmt-table__mono">
                    {student.admissionNumber || '—'}
                  </td>
                  <td>{getClassName(student.classId, classes)}</td>
                  <td>{student.gender || '—'}</td>
                  <td>{calcAge(student.dateOfBirth)}</td>
                  <td>
                    <span
                      className={`mgmt-badge mgmt-badge--${student.status === 'active' ? 'green' : 'gray'}`}
                    >
                      {student.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="mgmt-table__actions">
                      <button
                        className="mgmt-icon-btn mgmt-icon-btn--edit"
                        onClick={() => openEdit(student)}
                        aria-label={`Edit ${student.firstName} ${student.lastName}`}
                        title="Edit"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button
                        className="mgmt-icon-btn mgmt-icon-btn--delete"
                        onClick={() => openDelete(student)}
                        aria-label={`Delete ${student.firstName} ${student.lastName}`}
                        title="Delete"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mgmt-table__count">
            Showing {filtered.length} of {students.length} student{students.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          ADD / EDIT MODAL
          ════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={editTarget ? 'Edit student' : 'Add student'}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="mgmt-modal">
            {/* Modal header */}
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">
                {editTarget ? 'Edit Student' : 'Add Student'}
              </h2>
              <button
                className="mgmt-modal__close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="mgmt-modal__error-banner" role="alert">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {errors.general}
              </div>
            )}

            {/* Modal body */}
            <div className="mgmt-modal__body">
              {/* Row 1: First Name + Last Name */}
              <div className="mgmt-modal__row">
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="firstName">
                    First Name <span className="mgmt-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className={`mgmt-input${errors.firstName ? ' mgmt-input--error' : ''}`}
                    type="text"
                    placeholder="e.g. Aisha"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.firstName && (
                    <span className="mgmt-field-error" role="alert">{errors.firstName}</span>
                  )}
                </div>
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="lastName">
                    Last Name <span className="mgmt-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className={`mgmt-input${errors.lastName ? ' mgmt-input--error' : ''}`}
                    type="text"
                    placeholder="e.g. Johnson"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.lastName && (
                    <span className="mgmt-field-error" role="alert">{errors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Date of Birth + Gender */}
              <div className="mgmt-modal__row">
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="dateOfBirth">
                    Date of Birth <span className="mgmt-label__req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className={`mgmt-input${errors.dateOfBirth ? ' mgmt-input--error' : ''}`}
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                  {errors.dateOfBirth && (
                    <span className="mgmt-field-error" role="alert">{errors.dateOfBirth}</span>
                  )}
                </div>
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="gender">
                    Gender <span className="mgmt-label__req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className={`mgmt-input${errors.gender ? ' mgmt-input--error' : ''}`}
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <span className="mgmt-field-error" role="alert">{errors.gender}</span>
                  )}
                </div>
              </div>

              {/* Row 3: Class + Status */}
              <div className="mgmt-modal__row">
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="classId">
                    Class <span className="mgmt-label__req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="classId"
                    name="classId"
                    className={`mgmt-input${errors.classId ? ' mgmt-input--error' : ''}`}
                    value={form.classId}
                    onChange={handleChange}
                  >
                    <option value="">Select class</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.classId && (
                    <span className="mgmt-field-error" role="alert">{errors.classId}</span>
                  )}
                </div>
                <div className="mgmt-field">
                  <label className="mgmt-label" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mgmt-input"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="mgmt-modal__footer">
              <button
                className="mgmt-btn mgmt-btn--ghost"
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="mgmt-btn mgmt-btn--primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="mgmt-spinner" aria-hidden="true" />
                    Saving…
                  </>
                ) : editTarget ? (
                  'Save Changes'
                ) : (
                  'Add Student'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
          ════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete student"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDelete();
          }}
        >
          <div className="mgmt-modal mgmt-modal--confirm">
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">Remove Student</h2>
              <button
                className="mgmt-modal__close"
                onClick={closeDelete}
                aria-label="Close dialog"
                disabled={deleting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="mgmt-modal__body">
              <div className="mgmt-modal__confirm-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </div>
              <p className="mgmt-modal__confirm-text">
                Are you sure you want to remove{' '}
                <strong>
                  {deleteTarget.firstName} {deleteTarget.lastName}
                </strong>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="mgmt-modal__footer">
              <button
                className="mgmt-btn mgmt-btn--ghost"
                onClick={closeDelete}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="mgmt-btn mgmt-btn--danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="mgmt-spinner mgmt-spinner--light" aria-hidden="true" />
                    Removing…
                  </>
                ) : (
                  'Remove Student'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
