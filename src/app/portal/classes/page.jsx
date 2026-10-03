"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, X, Users, GraduationCap } from "lucide-react";
import { getClasses, createClass, updateClass, deleteClass } from "@/lib/storage/classes";
import { getTeachers } from "@/lib/storage/teachers";
import { getStudentsByClass } from "@/lib/storage/students";

const EMPTY_FORM = { name: "", level: "", section: "", teacherId: "", capacity: 30, session: "2026/2027", status: "active" };

function ClassModal({ cls, teachers, onSave, onClose }) {
  const [form, setForm] = useState(cls ? { name: cls.name, level: cls.level || "", section: cls.section || "", teacherId: cls.teacherId || "", capacity: cls.capacity || 30, session: cls.session || "2026/2027", status: cls.status || "active" } : { ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const set = (f) => (e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: "" })); };

  function handleSave() {
    const e = {};
    if (!form.name.trim()) e.name = "Class name is required.";
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form, cls?.id);
  }

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">{cls ? "Edit Class" : "Add Class"}</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Class Name *</label>
              <input className={`mgmt-input${errors.name ? " mgmt-input--error" : ""}`} value={form.name} onChange={set("name")} placeholder="e.g. Primary 5A" autoFocus />
              {errors.name && <span className="mgmt-error">{errors.name}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Level</label>
              <input className="mgmt-input" value={form.level} onChange={set("level")} placeholder="e.g. Primary 5" />
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Section</label>
              <input className="mgmt-input" value={form.section} onChange={set("section")} placeholder="e.g. A" />
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Capacity</label>
              <input type="number" className="mgmt-input" value={form.capacity} onChange={set("capacity")} min={1} max={50} />
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Class Teacher</label>
              <select className="mgmt-input" value={form.teacherId} onChange={set("teacherId")}>
                <option value="">— Select teacher —</option>
                {teachers.map((t) => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}
              </select>
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Academic Session</label>
              <input className="mgmt-input" value={form.session} onChange={set("session")} />
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
          <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave}>{cls ? "Save Changes" : "Add Class"}</button>
        </div>
      </div>
    </div>
  );
}

export default function ClassesPage() {
  const [classes,  setClasses]  = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast, setToast]       = useState("");

  function load() { setClasses(getClasses()); setTeachers(getTeachers()); }
  useEffect(load, []);
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function handleSave(form, id) {
    if (id) updateClass(id, form); else createClass(form);
    load(); setModalMode(null); setSelected(null);
    showToast(id ? "Class updated." : "Class created.");
  }
  function handleDelete(id) {
    deleteClass(id); load(); setModalMode(null); setSelected(null); showToast("Class deleted.");
  }

  const teacherMap = useMemo(() => Object.fromEntries(teachers.map((t) => [t.id, `${t.firstName} ${t.lastName}`])), [teachers]);

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Classes</h1>
          <p className="mgmt-page__sub">{classes.length} classes — 2026/2027 academic session</p>
        </div>
        <button className="mgmt-btn mgmt-btn--primary" onClick={() => { setSelected(null); setModalMode("add"); }}>
          <Plus size={16} /> Add Class
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">No classes found.</p></div>
      ) : (
        <div className="class-grid">
          {classes.map((cls) => {
            const studentCount = getStudentsByClass(cls.id).length;
            const teacher = teacherMap[cls.teacherId] || "Unassigned";
            const pct = cls.capacity ? Math.round((studentCount / cls.capacity) * 100) : 0;
            return (
              <div key={cls.id} className="class-card">
                <div className="class-card__header">
                  <h3 className="class-card__name">{cls.name}</h3>
                  <span className={`mgmt-badge mgmt-badge--${cls.status === "active" ? "green" : "gray"}`}>{cls.status || "active"}</span>
                </div>
                <div className="class-card__body">
                  <div className="class-card__stat">
                    <GraduationCap size={15} aria-hidden="true" />
                    <span>{teacher}</span>
                  </div>
                  <div className="class-card__stat">
                    <Users size={15} aria-hidden="true" />
                    <span>{studentCount} / {cls.capacity || "—"} students</span>
                  </div>
                  <div className="class-card__progress-wrap">
                    <div className="class-card__progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                      <div className="class-card__progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <span className="class-card__pct">{pct}% full</span>
                  </div>
                  <p className="class-card__session">{cls.session}</p>
                </div>
                <div className="class-card__actions">
                  <button className="mgmt-action-btn" onClick={() => { setSelected(cls); setModalMode("edit"); }} aria-label={`Edit ${cls.name}`}><Edit2 size={15} /></button>
                  <button className="mgmt-action-btn mgmt-action-btn--danger" onClick={() => { setSelected(cls); setModalMode("delete"); }} aria-label={`Delete ${cls.name}`}><Trash2 size={15} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(modalMode === "add" || modalMode === "edit") && <ClassModal cls={selected} teachers={teachers} onSave={handleSave} onClose={() => { setModalMode(null); setSelected(null); }} />}
      {modalMode === "delete" && selected && (
        <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
          <div className="mgmt-modal mgmt-modal--sm">
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">Delete Class</h2>
              <button className="mgmt-modal__close" onClick={() => setModalMode(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mgmt-modal__body">
              <p className="mgmt-delete-msg">Delete class <strong>{selected.name}</strong>? Students assigned to this class will no longer have a class.</p>
            </div>
            <div className="mgmt-modal__footer">
              <button className="mgmt-btn mgmt-btn--ghost" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="mgmt-btn mgmt-btn--danger" onClick={() => handleDelete(selected.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
