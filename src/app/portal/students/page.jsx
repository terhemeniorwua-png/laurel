"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Edit2, Trash2, X, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/lib/storage/students";
import { getClasses } from "@/lib/storage/classes";
import { getParents } from "@/lib/storage/parents";

// ── Helpers ───────────────────────────────────────────────────────────────────
function calcAge(dob) {
  if (!dob) return "—";
  return Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000));
}

function StatusBadge({ status }) {
  return (
    <span className={`mgmt-badge mgmt-badge--${status === "active" ? "green" : "gray"}`}>
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}

const EMPTY_FORM = { firstName: "", lastName: "", dateOfBirth: "", gender: "", classId: "", status: "active" };

// ── Add/Edit Modal ────────────────────────────────────────────────────────────
function StudentModal({ student, classes, onSave, onClose }) {
  const [form, setForm] = useState(student ? { firstName: student.firstName, lastName: student.lastName, dateOfBirth: student.dateOfBirth, gender: student.gender, classId: student.classId, status: student.status } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (f) => (e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: "" })); };

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim())  e.lastName  = "Last name is required.";
    if (!form.dateOfBirth)      e.dateOfBirth = "Date of birth is required.";
    if (!form.gender)           e.gender    = "Please select a gender.";
    if (!form.classId)          e.classId   = "Please select a class.";
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setBusy(true);
    setTimeout(() => {
      onSave(form, student?.id);
      setBusy(false);
    }, 400);
  }

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="student-modal-title">
      <div className="mgmt-modal">
        <div className="mgmt-modal__header">
          <h2 id="student-modal-title" className="mgmt-modal__title">{student ? "Edit Student" : "Add Student"}</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">First Name <span aria-hidden="true">*</span></label>
              <input className={`mgmt-input${errors.firstName ? " mgmt-input--error" : ""}`} value={form.firstName} onChange={set("firstName")} placeholder="e.g. Aisha" autoFocus />
              {errors.firstName && <span className="mgmt-error">{errors.firstName}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Last Name <span aria-hidden="true">*</span></label>
              <input className={`mgmt-input${errors.lastName ? " mgmt-input--error" : ""}`} value={form.lastName} onChange={set("lastName")} placeholder="e.g. Ibrahim" />
              {errors.lastName && <span className="mgmt-error">{errors.lastName}</span>}
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Date of Birth <span aria-hidden="true">*</span></label>
              <input type="date" className={`mgmt-input${errors.dateOfBirth ? " mgmt-input--error" : ""}`} value={form.dateOfBirth} onChange={set("dateOfBirth")} max={new Date().toISOString().slice(0, 10)} />
              {errors.dateOfBirth && <span className="mgmt-error">{errors.dateOfBirth}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Gender <span aria-hidden="true">*</span></label>
              <select className={`mgmt-input${errors.gender ? " mgmt-input--error" : ""}`} value={form.gender} onChange={set("gender")}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="mgmt-error">{errors.gender}</span>}
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Class <span aria-hidden="true">*</span></label>
              <select className={`mgmt-input${errors.classId ? " mgmt-input--error" : ""}`} value={form.classId} onChange={set("classId")}>
                <option value="">Select class</option>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.classId && <span className="mgmt-error">{errors.classId}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Status</label>
              <select className="mgmt-input" value={form.status} onChange={set("status")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave} disabled={busy}>
            {busy ? "Saving…" : student ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Modal ──────────────────────────────────────────────────────────────
function DeleteModal({ student, onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal mgmt-modal--sm">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">Delete Student</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <p className="mgmt-delete-msg">
            Are you sure you want to delete <strong>{student.firstName} {student.lastName}</strong>?
            This action will remove all associated data and cannot be easily undone.
          </p>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--danger" disabled={busy} onClick={() => { setBusy(true); setTimeout(() => onConfirm(student.id), 400); }}>
            {busy ? "Deleting…" : "Delete Student"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StudentsPage() {
  const [students,   setStudents]   = useState([]);
  const [classes,    setClasses]    = useState([]);
  const [search,     setSearch]     = useState("");
  const [classFilter,setClassFilter]= useState("");
  const [genderFilter,setGenderFilter] = useState("");
  const [statusFilter,setStatusFilter] = useState("");
  const [sortKey,    setSortKey]    = useState("firstName");
  const [sortDir,    setSortDir]    = useState("asc");
  const [modalMode,  setModalMode]  = useState(null); // null | "add" | "edit" | "delete"
  const [selected,   setSelected]   = useState(null);
  const [toast,      setToast]      = useState("");

  function load() {
    setStudents(getStudents());
    setClasses(getClasses());
  }
  useEffect(load, []);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function handleSave(form, id) {
    if (id) { updateStudent(id, form); showToast("Student updated successfully."); }
    else    { createStudent(form);      showToast("Student added successfully."); }
    load(); setModalMode(null); setSelected(null);
  }
  function handleDelete(id) { deleteStudent(id); load(); setModalMode(null); setSelected(null); showToast("Student deleted."); }

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  const classMap = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);

  const filtered = useMemo(() => {
    let list = [...students];
    if (search)       list = list.filter((s) => `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) || (s.admissionNumber || "").toLowerCase().includes(search.toLowerCase()));
    if (classFilter)  list = list.filter((s) => s.classId === classFilter);
    if (genderFilter) list = list.filter((s) => s.gender?.toLowerCase() === genderFilter.toLowerCase());
    if (statusFilter) list = list.filter((s) => s.status === statusFilter);
    list.sort((a, b) => {
      const av = sortKey === "class" ? (classMap[a.classId] || "") : (a[sortKey] || "");
      const bv = sortKey === "class" ? (classMap[b.classId] || "") : (b[sortKey] || "");
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [students, search, classFilter, genderFilter, statusFilter, sortKey, sortDir, classMap]);

  function SortIcon({ k }) {
    if (sortKey !== k) return <ChevronDown size={14} style={{ opacity: 0.3 }} />;
    return sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  }

  return (
    <div className="mgmt-page">
      {/* Header */}
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Students</h1>
          <p className="mgmt-page__sub">Manage all enrolled students — {filtered.length} of {students.length}</p>
        </div>
        <button className="mgmt-btn mgmt-btn--primary" onClick={() => { setSelected(null); setModalMode("add"); }}>
          <Plus size={16} aria-hidden="true" /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="mgmt-filters">
        <div className="mgmt-search-wrap">
          <Search size={16} className="mgmt-search-icon" aria-hidden="true" />
          <input className="mgmt-search" placeholder="Search by name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search students" />
        </div>
        <select className="mgmt-filter-sel" value={classFilter} onChange={(e) => setClassFilter(e.target.value)} aria-label="Filter by class">
          <option value="">All Classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="mgmt-filter-sel" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} aria-label="Filter by gender">
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className="mgmt-filter-sel" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="mgmt-empty">
          <p className="mgmt-empty__msg">No students found.</p>
          {(search || classFilter || genderFilter || statusFilter) && (
            <button className="mgmt-btn mgmt-btn--ghost" onClick={() => { setSearch(""); setClassFilter(""); setGenderFilter(""); setStatusFilter(""); }}>Clear filters</button>
          )}
        </div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table" aria-label="Students list">
            <thead>
              <tr>
                {[["firstName","Name"],["admissionNumber","ID"],["classId","Class"],["gender","Gender"],["dateOfBirth","Age"],["status","Status"]].map(([k,l]) => (
                  <th key={k} className="mgmt-th mgmt-th--sortable" onClick={() => toggleSort(k)}>
                    {l} <SortIcon k={k} />
                  </th>
                ))}
                <th className="mgmt-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="mgmt-tr">
                  <td className="mgmt-td mgmt-td--name">{s.firstName} {s.lastName}</td>
                  <td className="mgmt-td">{s.admissionNumber || "—"}</td>
                  <td className="mgmt-td">{classMap[s.classId] || "—"}</td>
                  <td className="mgmt-td">{s.gender || "—"}</td>
                  <td className="mgmt-td">{calcAge(s.dateOfBirth)}</td>
                  <td className="mgmt-td"><StatusBadge status={s.status} /></td>
                  <td className="mgmt-td mgmt-td--actions">
                    <button className="mgmt-action-btn" onClick={() => { setSelected(s); setModalMode("edit"); }} aria-label={`Edit ${s.firstName}`}><Edit2 size={15} /></button>
                    <button className="mgmt-action-btn mgmt-action-btn--danger" onClick={() => { setSelected(s); setModalMode("delete"); }} aria-label={`Delete ${s.firstName}`}><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {(modalMode === "add" || modalMode === "edit") && (
        <StudentModal student={selected} classes={classes} onSave={handleSave} onClose={() => { setModalMode(null); setSelected(null); }} />
      )}
      {modalMode === "delete" && selected && (
        <DeleteModal student={selected} onConfirm={handleDelete} onClose={() => { setModalMode(null); setSelected(null); }} />
      )}

      {/* Toast */}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
