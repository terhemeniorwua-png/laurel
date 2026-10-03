"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, X, BookMarked, Eye } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from "@/lib/storage/assignments";
import { getSubmissions, updateSubmission } from "@/lib/storage/submissions";
import { getClasses } from "@/lib/storage/classes";
import { getTeachers } from "@/lib/storage/teachers";
import { getStudents } from "@/lib/storage/students";

const SUBJECTS = [
  { id: "subj_eng",   name: "English Language" },
  { id: "subj_math",  name: "Mathematics" },
  { id: "subj_sci",   name: "Basic Science" },
  { id: "subj_soc",   name: "Social Studies" },
  { id: "subj_comp",  name: "Computer Studies" },
  { id: "subj_arts",  name: "Creative Arts" },
  { id: "subj_civic", name: "Civic Education" },
];

function statusBadgeClass(s) {
  return { published: "mgmt-badge--blue", draft: "mgmt-badge--gray", closed: "mgmt-badge--brown" }[s] || "mgmt-badge--gray";
}

// ── Assignment Modal ──────────────────────────────────────────────────────────
function AssignmentModal({ assignment, classes, teacherClasses, onSave, onClose }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState(assignment ? {
    title: assignment.title, description: assignment.description || "", subjectId: assignment.subjectId || "",
    classId: assignment.classId, dueDate: assignment.dueDate, instructions: assignment.instructions || "", status: assignment.status,
  } : { title: "", description: "", subjectId: "", classId: teacherClasses[0]?.id || "", dueDate: "", instructions: "", status: "draft" });
  const [errors, setErrors] = useState({});
  const set = (f) => (e) => { setForm((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: "" })); };

  function validate() {
    const e = {};
    if (!form.title.trim())   e.title   = "Title is required.";
    if (!form.classId)         e.classId  = "Please select a class.";
    if (!form.subjectId)       e.subjectId = "Please select a subject.";
    if (!form.dueDate)         e.dueDate  = "Due date is required.";
    return e;
  }

  function handleSave(statusOverride) {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, status: statusOverride || form.status }, assignment?.id);
  }

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">{assignment ? "Edit Assignment" : "Create Assignment"}</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <div className="mgmt-field">
            <label className="mgmt-label">Title *</label>
            <input className={`mgmt-input${errors.title ? " mgmt-input--error" : ""}`} value={form.title} onChange={set("title")} placeholder="e.g. Fractions Homework" autoFocus />
            {errors.title && <span className="mgmt-error">{errors.title}</span>}
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Class *</label>
              <select className={`mgmt-input${errors.classId ? " mgmt-input--error" : ""}`} value={form.classId} onChange={set("classId")}>
                <option value="">Select class</option>
                {teacherClasses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.classId && <span className="mgmt-error">{errors.classId}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Subject *</label>
              <select className={`mgmt-input${errors.subjectId ? " mgmt-input--error" : ""}`} value={form.subjectId} onChange={set("subjectId")}>
                <option value="">Select subject</option>
                {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {errors.subjectId && <span className="mgmt-error">{errors.subjectId}</span>}
            </div>
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Description</label>
            <textarea className="mgmt-input mgmt-textarea" value={form.description} onChange={set("description")} rows={3} placeholder="Brief description of the assignment…" />
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Instructions</label>
            <textarea className="mgmt-input mgmt-textarea" value={form.instructions} onChange={set("instructions")} rows={3} placeholder="Detailed instructions for students…" />
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Due Date *</label>
              <input type="date" className={`mgmt-input${errors.dueDate ? " mgmt-input--error" : ""}`} value={form.dueDate} onChange={set("dueDate")} min={today} />
              {errors.dueDate && <span className="mgmt-error">{errors.dueDate}</span>}
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Status</label>
              <select className="mgmt-input" value={form.status} onChange={set("status")}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--ghost" onClick={() => handleSave("draft")}>Save Draft</button>
          <button className="mgmt-btn mgmt-btn--primary" onClick={() => handleSave("published")}>Publish</button>
        </div>
      </div>
    </div>
  );
}

// ── Submissions Review Modal ───────────────────────────────────────────────────
function SubmissionsModal({ assignment, classId, onClose }) {
  const [submissions, setSubmissions] = useState([]);
  const [students,    setStudents]    = useState([]);
  const [grading,     setGrading]     = useState(null); // submission being graded
  const [grade,       setGrade]       = useState("");
  const [comment,     setComment]     = useState("");
  const [toast,       setToast]       = useState("");

  useEffect(() => {
    setSubmissions(getSubmissions().filter((s) => s.assignmentId === assignment.id));
    setStudents(getStudents().filter((s) => s.classId === classId));
  }, [assignment.id, classId]);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  const subjectName = SUBJECTS.find((s) => s.id === assignment.subjectId)?.name || "";
  const studentMap = Object.fromEntries(students.map((s) => [s.id, `${s.firstName} ${s.lastName}`]));

  function saveGrade() {
    const g = parseFloat(grade);
    if (isNaN(g) || g < 0 || g > 100) { showToast("Please enter a valid score between 0 and 100."); return; }
    updateSubmission(grading.id, { grade: g, feedback: comment, status: "graded" });
    setSubmissions(getSubmissions().filter((s) => s.assignmentId === assignment.id));
    setGrading(null); setGrade(""); setComment("");
    showToast("Submission graded successfully.");
  }

  const subMap = Object.fromEntries(submissions.map((s) => [s.studentId, s]));

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal mgmt-modal--lg">
        <div className="mgmt-modal__header">
          <div>
            <h2 className="mgmt-modal__title">Submissions — {assignment.title}</h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>{subjectName}</p>
          </div>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          {grading ? (
            <div>
              <p style={{ marginBottom: "1rem", fontWeight: 600 }}>Grading: {studentMap[grading.studentId] || grading.studentId}</p>
              {grading.content && <div className="sub-content-box"><p>{grading.content}</p></div>}
              <div className="mgmt-form-row">
                <div className="mgmt-field">
                  <label className="mgmt-label">Score (0–100)</label>
                  <input type="number" className="mgmt-input" value={grade} onChange={(e) => setGrade(e.target.value)} min={0} max={100} />
                </div>
              </div>
              <div className="mgmt-field">
                <label className="mgmt-label">Teacher Comment</label>
                <textarea className="mgmt-input mgmt-textarea" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="e.g. Excellent work. Clear explanations throughout." />
              </div>
              <div style={{ display:"flex", gap:"0.75rem", marginTop:"1rem" }}>
                <button className="mgmt-btn mgmt-btn--ghost" onClick={() => { setGrading(null); setGrade(""); setComment(""); }}>Cancel</button>
                <button className="mgmt-btn mgmt-btn--primary" onClick={saveGrade}>Save Grade</button>
              </div>
            </div>
          ) : (
            <div className="mgmt-table-wrap">
              <table className="mgmt-table">
                <thead><tr>
                  <th className="mgmt-th">Student</th>
                  <th className="mgmt-th">Status</th>
                  <th className="mgmt-th">Grade</th>
                  <th className="mgmt-th">Submitted</th>
                  <th className="mgmt-th">Action</th>
                </tr></thead>
                <tbody>
                  {students.map((s) => {
                    const sub = subMap[s.id];
                    return (
                      <tr key={s.id} className="mgmt-tr">
                        <td className="mgmt-td mgmt-td--name">{s.firstName} {s.lastName}</td>
                        <td className="mgmt-td">
                          <span className={`mgmt-badge ${sub ? { graded:"mgmt-badge--green", submitted:"mgmt-badge--blue", late:"mgmt-badge--orange" }[sub.status] || "mgmt-badge--gray" : "mgmt-badge--gray"}`}>
                            {sub ? sub.status : "Not Submitted"}
                          </span>
                        </td>
                        <td className="mgmt-td">{sub?.grade != null ? `${sub.grade}%` : "—"}</td>
                        <td className="mgmt-td">{sub?.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("en-GB") : "—"}</td>
                        <td className="mgmt-td">
                          {sub && sub.status !== "graded" && (
                            <button className="mgmt-action-btn" onClick={() => { setGrading(sub); setGrade(sub.grade || ""); setComment(sub.feedback || ""); }} aria-label="Grade submission">
                              <Edit2 size={14} /> Grade
                            </button>
                          )}
                          {sub?.status === "graded" && <span style={{ fontSize: "0.8125rem", color: "#1a5e3a" }}>✓ Graded</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [classes,     setClasses]     = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter,  setClassFilter]  = useState("");
  const [modalMode,   setModalMode]   = useState(null);
  const [selected,    setSelected]    = useState(null);
  const [viewSubs,    setViewSubs]    = useState(null);
  const [toast,       setToast]       = useState("");

  function load() {
    const allClasses = getClasses();
    setClasses(allClasses);
    const allAssignments = getAssignments();
    // Filter by teacher if role is teacher
    if (user?.role === "teacher") {
      const teacher = getTeachers().find((t) => t.userId === user.id);
      const ids = teacher?.classIds || [];
      setTeacherClasses(allClasses.filter((c) => ids.includes(c.id)));
      setAssignments(allAssignments.filter((a) => a.teacherId === teacher?.id));
    } else {
      setTeacherClasses(allClasses);
      setAssignments(allAssignments);
    }
  }

  useEffect(load, [user]);
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function handleSave(form, id) {
    const teacher = getTeachers().find((t) => t.userId === user?.id);
    const teacherId = teacher?.id || "teacher_001";
    if (id) updateAssignment(id, form);
    else    createAssignment({ ...form, teacherId, assignedDate: new Date().toISOString().slice(0, 10), createdAt: new Date().toISOString() });
    load(); setModalMode(null); setSelected(null);
    showToast(id ? "Assignment updated." : form.status === "published" ? "Assignment published." : "Assignment saved as draft.");
  }

  function handleDelete(id) {
    deleteAssignment(id); load(); setModalMode(null); setSelected(null); showToast("Assignment deleted.");
  }

  const classMap    = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);
  const subjectMap  = Object.fromEntries(SUBJECTS.map((s) => [s.id, s.name]));

  const filtered = useMemo(() => {
    let list = [...assignments];
    if (statusFilter) list = list.filter((a) => a.status === statusFilter);
    if (classFilter)  list = list.filter((a) => a.classId === classFilter);
    return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [assignments, statusFilter, classFilter]);

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Assignments</h1>
          <p className="mgmt-page__sub">{filtered.length} assignments</p>
        </div>
        <button className="mgmt-btn mgmt-btn--primary" onClick={() => { setSelected(null); setModalMode("add"); }}>
          <Plus size={16} /> Create Assignment
        </button>
      </div>

      <div className="mgmt-filters">
        <select className="mgmt-filter-sel" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
        <select className="mgmt-filter-sel" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="">All Classes</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mgmt-empty"><BookMarked size={36} style={{ opacity: 0.3 }} /><p className="mgmt-empty__msg">No assignments found.</p></div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table">
            <thead><tr>
              <th className="mgmt-th">Title</th>
              <th className="mgmt-th">Subject</th>
              <th className="mgmt-th">Class</th>
              <th className="mgmt-th">Due Date</th>
              <th className="mgmt-th">Status</th>
              <th className="mgmt-th">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((a) => {
                const subs = getSubmissions().filter((s) => s.assignmentId === a.id);
                return (
                  <tr key={a.id} className="mgmt-tr">
                    <td className="mgmt-td mgmt-td--name">{a.title}</td>
                    <td className="mgmt-td">{subjectMap[a.subjectId] || "—"}</td>
                    <td className="mgmt-td">{classMap[a.classId] || "—"}</td>
                    <td className="mgmt-td">{a.dueDate || "—"}</td>
                    <td className="mgmt-td"><span className={`mgmt-badge ${statusBadgeClass(a.status)}`}>{a.status}</span></td>
                    <td className="mgmt-td mgmt-td--actions">
                      <button className="mgmt-action-btn" onClick={() => setViewSubs(a)} aria-label="View submissions" title={`${subs.length} submissions`}><Eye size={15} /></button>
                      <button className="mgmt-action-btn" onClick={() => { setSelected(a); setModalMode("edit"); }} aria-label="Edit"><Edit2 size={15} /></button>
                      <button className="mgmt-action-btn mgmt-action-btn--danger" onClick={() => { setSelected(a); setModalMode("delete"); }} aria-label="Delete"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {(modalMode === "add" || modalMode === "edit") && (
        <AssignmentModal assignment={selected} classes={classes} teacherClasses={teacherClasses} onSave={handleSave} onClose={() => { setModalMode(null); setSelected(null); }} />
      )}
      {modalMode === "delete" && selected && (
        <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
          <div className="mgmt-modal mgmt-modal--sm">
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">Delete Assignment</h2>
              <button className="mgmt-modal__close" onClick={() => setModalMode(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mgmt-modal__body">
              <p className="mgmt-delete-msg">Delete <strong>{selected.title}</strong>? All submissions will also be removed.</p>
            </div>
            <div className="mgmt-modal__footer">
              <button className="mgmt-btn mgmt-btn--ghost" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="mgmt-btn mgmt-btn--danger" onClick={() => handleDelete(selected.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {viewSubs && <SubmissionsModal assignment={viewSubs} classId={viewSubs.classId} onClose={() => setViewSubs(null)} />}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
