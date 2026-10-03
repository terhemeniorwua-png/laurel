"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from "@/lib/storage/teachers";
import { getClasses } from "@/lib/storage/classes";

const ALL_SUBJECTS = [
  { id: "subj_eng",   name: "English Language" },
  { id: "subj_math",  name: "Mathematics" },
  { id: "subj_sci",   name: "Basic Science" },
  { id: "subj_soc",   name: "Social Studies" },
  { id: "subj_comp",  name: "Computer Studies" },
  { id: "subj_arts",  name: "Creative Arts" },
  { id: "subj_phe",   name: "Physical & Health Education" },
  { id: "subj_civic", name: "Civic Education" },
];

const EMPTY_FORM = { firstName: "", lastName: "", email: "", phone: "", subjects: [], classIds: [], status: "active" };

function StatusBadge({ status }) {
  return <span className={`mgmt-badge mgmt-badge--${status === "active" ? "green" : "gray"}`}>{status === "active" ? "Active" : "Inactive"}</span>;
}

function TeacherModal({ teacher, classes, onSave, onClose }) {
  const [form, setForm] = useState(teacher ? { firstName: teacher.firstName, lastName: teacher.lastName, email: teacher.email, phone: teacher.phone || "", subjects: teacher.subjects || [], classIds: teacher.classIds || [], status: teacher.status || "active" } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (f) => (e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: "" })); };

  function toggleArr(field, val) {
    setForm((p) => ({ ...p, [field]: p[field].includes(val) ? p[field].filter((x) => x !== val) : [...p[field], val] }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim())  e.lastName  = "Last name is required.";
    if (!form.email.trim())     e.email     = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format.";
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setBusy(true);
    setTimeout(() => { onSave(form, teacher?.id); setBusy(false); }, 400);
  }

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">{teacher ? "Edit Teacher" : "Add Teacher"}</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">First Name *</label>
              <input className={`mgmt-input${errors.firstName ? " mgmt-input--error" : ""}`} value={form.firstName} onChange={set("firstName")} autoFocus />
              {errors.firstName && <span className="mgmt-error">{errors.firstName}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Last Name *</label>
              <input className={`mgmt-input${errors.lastName ? " mgmt-input--error" : ""}`} value={form.lastName} onChange={set("lastName")} />
              {errors.lastName && <span className="mgmt-error">{errors.lastName}</span>}
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Email *</label>
              <input type="email" className={`mgmt-input${errors.email ? " mgmt-input--error" : ""}`} value={form.email} onChange={set("email")} />
              {errors.email && <span className="mgmt-error">{errors.email}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Phone</label>
              <input type="tel" className="mgmt-input" value={form.phone} onChange={set("phone")} />
            </div>
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Subjects</label>
            <div className="mgmt-checkboxes">
              {ALL_SUBJECTS.map((s) => (
                <label key={s.id} className="mgmt-checkbox-label">
                  <input type="checkbox" checked={form.subjects.includes(s.id)} onChange={() => toggleArr("subjects", s.id)} />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Assigned Classes</label>
            <div className="mgmt-checkboxes">
              {classes.map((c) => (
                <label key={c.id} className="mgmt-checkbox-label">
                  <input type="checkbox" checked={form.classIds.includes(c.id)} onChange={() => toggleArr("classIds", c.id)} />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Status</label>
            <select className="mgmt-input" value={form.status} onChange={set("status")}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave} disabled={busy}>{busy ? "Saving…" : teacher ? "Save Changes" : "Add Teacher"}</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ teacher, onConfirm, onClose }) {
  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal mgmt-modal--sm">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">Delete Teacher</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <p className="mgmt-delete-msg">Delete <strong>{teacher.firstName} {teacher.lastName}</strong>? This cannot be easily undone.</p>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--danger" onClick={() => onConfirm(teacher.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function TeachersPage() {
  const [teachers, setTeachers]   = useState([]);
  const [classes,  setClasses]    = useState([]);
  const [search,   setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected,  setSelected]  = useState(null);
  const [toast,     setToast]     = useState("");

  function load() { setTeachers(getTeachers()); setClasses(getClasses()); }
  useEffect(load, []);
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function handleSave(form, id) {
    if (id) updateTeacher(id, form); else createTeacher(form);
    load(); setModalMode(null); setSelected(null);
    showToast(id ? "Teacher updated." : "Teacher added.");
  }
  function handleDelete(id) { deleteTeacher(id); load(); setModalMode(null); setSelected(null); showToast("Teacher deleted."); }

  const subjectMap = Object.fromEntries(ALL_SUBJECTS.map((s) => [s.id, s.name]));
  const classMap   = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);

  const filtered = useMemo(() => {
    let list = [...teachers];
    if (search)       list = list.filter((t) => `${t.firstName} ${t.lastName} ${t.email}`.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) list = list.filter((t) => t.status === statusFilter);
    return list;
  }, [teachers, search, statusFilter]);

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Teachers</h1>
          <p className="mgmt-page__sub">{filtered.length} of {teachers.length} teachers</p>
        </div>
        <button className="mgmt-btn mgmt-btn--primary" onClick={() => { setSelected(null); setModalMode("add"); }}>
          <Plus size={16} /> Add Teacher
        </button>
      </div>
      <div className="mgmt-filters">
        <div className="mgmt-search-wrap">
          <Search size={16} className="mgmt-search-icon" />
          <input className="mgmt-search" placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search teachers" />
        </div>
        <select className="mgmt-filter-sel" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">No teachers found.</p></div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table" aria-label="Teachers list">
            <thead>
              <tr>
                <th className="mgmt-th">Name</th>
                <th className="mgmt-th">Email</th>
                <th className="mgmt-th">Phone</th>
                <th className="mgmt-th">Subjects</th>
                <th className="mgmt-th">Classes</th>
                <th className="mgmt-th">Status</th>
                <th className="mgmt-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="mgmt-tr">
                  <td className="mgmt-td mgmt-td--name">{t.firstName} {t.lastName}</td>
                  <td className="mgmt-td">{t.email}</td>
                  <td className="mgmt-td">{t.phone || "—"}</td>
                  <td className="mgmt-td">{(t.subjects || []).map((id) => subjectMap[id] || id).slice(0, 2).join(", ")}{(t.subjects || []).length > 2 ? ` +${t.subjects.length - 2}` : ""}</td>
                  <td className="mgmt-td">{(t.classIds || []).map((id) => classMap[id] || id).join(", ") || "—"}</td>
                  <td className="mgmt-td"><StatusBadge status={t.status || "active"} /></td>
                  <td className="mgmt-td mgmt-td--actions">
                    <button className="mgmt-action-btn" onClick={() => { setSelected(t); setModalMode("edit"); }} aria-label={`Edit ${t.firstName}`}><Edit2 size={15} /></button>
                    <button className="mgmt-action-btn mgmt-action-btn--danger" onClick={() => { setSelected(t); setModalMode("delete"); }} aria-label={`Delete ${t.firstName}`}><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(modalMode === "add" || modalMode === "edit") && <TeacherModal teacher={selected} classes={classes} onSave={handleSave} onClose={() => { setModalMode(null); setSelected(null); }} />}
      {modalMode === "delete" && selected && <DeleteModal teacher={selected} onConfirm={handleDelete} onClose={() => { setModalMode(null); setSelected(null); }} />}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
