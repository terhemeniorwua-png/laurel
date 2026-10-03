"use client";

import { useState, useEffect, useMemo } from "react";
import { Save, Printer, ChevronDown } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getResults, createResult, updateResult, getResultsByStudent } from "@/lib/storage/results";
import { getStudentsByClass } from "@/lib/storage/students";
import { getClasses } from "@/lib/storage/classes";
import { getTeachers } from "@/lib/storage/teachers";
import { getParents } from "@/lib/storage/parents";
import { getStudents } from "@/lib/storage/students";

const SUBJECTS = [
  { id: "subj_eng",   name: "English Language" },
  { id: "subj_math",  name: "Mathematics" },
  { id: "subj_sci",   name: "Basic Science" },
  { id: "subj_soc",   name: "Social Studies" },
  { id: "subj_comp",  name: "Computer Studies" },
  { id: "subj_arts",  name: "Creative Arts" },
  { id: "subj_phe",   name: "Physical & Health Education" },
  { id: "subj_civic", name: "Civic Education" },
];

const TERMS   = ["First Term", "Second Term", "Third Term"];
const SESSION = "2026/2027";

function gradeFromScore(total) {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
}

function gradeColor(g) {
  return { A: "#15803d", B: "#1d4ed8", C: "#b45309", D: "#7c3aed", E: "#c2410c", F: "#dc2626" }[g] || "#78716C";
}

// ── Report Card ───────────────────────────────────────────────────────────────
function ReportCard({ student, classInfo, results, session, term, onClose }) {
  const subjectMap = Object.fromEntries(SUBJECTS.map((s) => [s.id, s.name]));
  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.total || 0), 0) / results.length) : 0;
  const overallGrade = gradeFromScore(avg);

  return (
    <div className="report-modal-overlay" role="dialog" aria-modal="true" aria-label="Report Card">
      <div className="report-card">
        <div className="report-card__header">
          <div className="report-card__logo-mark" aria-hidden="true">L</div>
          <div>
            <h1 className="report-card__school">Laurel Children Academy</h1>
            <p className="report-card__subtitle">Academic Report Card</p>
          </div>
          <button className="report-card__print" onClick={() => window.print()} aria-label="Print report card">
            <Printer size={16} /> Print
          </button>
          <button className="report-card__close mgmt-modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="report-card__meta">
          <div><span>Student</span><strong>{student?.firstName} {student?.lastName}</strong></div>
          <div><span>Class</span><strong>{classInfo?.name || "—"}</strong></div>
          <div><span>Session</span><strong>{session}</strong></div>
          <div><span>Term</span><strong>{term}</strong></div>
        </div>

        <table className="report-card__table" aria-label="Academic results">
          <thead>
            <tr>
              <th>Subject</th>
              <th>CA (40)</th>
              <th>Exam (60)</th>
              <th>Total (100)</th>
              <th>Grade</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{subjectMap[r.subjectId] || r.subjectName || r.subjectId}</td>
                <td>{r.ca ?? "—"}</td>
                <td>{r.exam ?? "—"}</td>
                <td><strong>{r.total}</strong></td>
                <td style={{ color: gradeColor(r.grade), fontWeight: 700 }}>{r.grade}</td>
                <td className="report-card__comment">{r.teacherComment || ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><strong>Average</strong></td>
              <td><strong>{avg}</strong></td>
              <td style={{ color: gradeColor(overallGrade), fontWeight: 700 }}>{overallGrade}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div className="report-card__footer">
          <div className="report-card__grade-key">
            <strong>Grade Key:</strong> A (70–100) · B (60–69) · C (50–59) · D (45–49) · E (40–44) · F (&lt;40)
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Teacher entry ─────────────────────────────────────────────────────────────
function TeacherResultEntry({ user }) {
  const [classes,    setClasses]    = useState([]);
  const [classId,    setClassId]    = useState("");
  const [subjectId,  setSubjectId]  = useState("");
  const [term,       setTerm]       = useState("First Term");
  const [students,   setStudents]   = useState([]);
  const [scores,     setScores]     = useState({});  // studentId → { ca, exam, comment }
  const [toast,      setToast]      = useState("");

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  useEffect(() => {
    const allClasses = getClasses();
    if (user?.role === "teacher") {
      const teacher = getTeachers().find((t) => t.userId === user.id);
      const ids     = teacher?.classIds || [];
      setClasses(allClasses.filter((c) => ids.includes(c.id)));
    } else {
      setClasses(allClasses);
    }
  }, [user]);

  useEffect(() => {
    if (!classId) { setStudents([]); return; }
    const studs = getStudentsByClass(classId);
    setStudents(studs);
    // Pre-load existing results
    const existing = getResults().filter((r) => r.classId === classId && r.subjectId === subjectId && r.term === term && r.session === SESSION);
    const sc = {};
    studs.forEach((s) => {
      const r = existing.find((x) => x.studentId === s.id);
      sc[s.id] = { ca: r?.ca ?? "", exam: r?.exam ?? "", comment: r?.teacherComment ?? "", existingId: r?.id };
    });
    setScores(sc);
  }, [classId, subjectId, term]);

  function setScore(studentId, field, val) {
    setScores((p) => ({ ...p, [studentId]: { ...p[studentId], [field]: val } }));
  }

  function handleSave() {
    const teacher = getTeachers().find((t) => t.userId === user?.id);
    students.forEach((s) => {
      const { ca, exam, comment, existingId } = scores[s.id] || {};
      const caNum   = parseFloat(ca);
      const examNum = parseFloat(exam);
      if (isNaN(caNum) && isNaN(examNum)) return;
      const safeCA   = isNaN(caNum)   ? 0 : Math.max(0, Math.min(40,  caNum));
      const safeExam = isNaN(examNum) ? 0 : Math.max(0, Math.min(60, examNum));
      const total    = safeCA + safeExam;
      const grade    = gradeFromScore(total);
      const data = { studentId: s.id, classId, subjectId, session: SESSION, term, ca: safeCA, exam: safeExam, total, grade, teacherComment: comment || "", teacherId: teacher?.id || "" };
      if (existingId) updateResult(existingId, data);
      else createResult(data);
    });
    showToast("Results saved successfully.");
  }

  return (
    <div>
      <div className="att-controls">
        <div className="mgmt-field" style={{ minWidth: 200 }}>
          <label className="mgmt-label">Class</label>
          <select className="mgmt-input" value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">Select class</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mgmt-field" style={{ minWidth: 200 }}>
          <label className="mgmt-label">Subject</label>
          <select className="mgmt-input" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            <option value="">Select subject</option>
            {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="mgmt-field">
          <label className="mgmt-label">Term</label>
          <select className="mgmt-input" value={term} onChange={(e) => setTerm(e.target.value)}>
            {TERMS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {classId && subjectId && students.length > 0 ? (
        <>
          <div className="mgmt-table-wrap">
            <table className="mgmt-table">
              <thead><tr>
                <th className="mgmt-th">Student</th>
                <th className="mgmt-th">CA (max 40)</th>
                <th className="mgmt-th">Exam (max 60)</th>
                <th className="mgmt-th">Total</th>
                <th className="mgmt-th">Grade</th>
                <th className="mgmt-th">Comment</th>
              </tr></thead>
              <tbody>
                {students.map((s) => {
                  const { ca = "", exam = "", comment = "" } = scores[s.id] || {};
                  const ca_n = parseFloat(ca), ex_n = parseFloat(exam);
                  const total = (!isNaN(ca_n) && !isNaN(ex_n)) ? ca_n + ex_n : null;
                  const grade = total !== null ? gradeFromScore(total) : "";
                  return (
                    <tr key={s.id} className="mgmt-tr">
                      <td className="mgmt-td mgmt-td--name">{s.firstName} {s.lastName}</td>
                      <td className="mgmt-td">
                        <input className="mgmt-input mgmt-input--sm" type="number" min={0} max={40} value={ca} onChange={(e) => setScore(s.id, "ca", e.target.value)} style={{ width: 80 }} aria-label={`CA score for ${s.firstName}`} />
                      </td>
                      <td className="mgmt-td">
                        <input className="mgmt-input mgmt-input--sm" type="number" min={0} max={60} value={exam} onChange={(e) => setScore(s.id, "exam", e.target.value)} style={{ width: 80 }} aria-label={`Exam score for ${s.firstName}`} />
                      </td>
                      <td className="mgmt-td"><strong>{total !== null ? total : "—"}</strong></td>
                      <td className="mgmt-td" style={{ color: gradeColor(grade), fontWeight: 700 }}>{grade}</td>
                      <td className="mgmt-td">
                        <input className="mgmt-input mgmt-input--sm" value={comment} onChange={(e) => setScore(s.id, "comment", e.target.value)} placeholder="Optional comment…" style={{ width: 200 }} aria-label={`Comment for ${s.firstName}`} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="att-save-row">
            <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave}>
              <Save size={16} aria-hidden="true" /> Save Results
            </button>
          </div>
        </>
      ) : (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">Select a class and subject to enter results.</p></div>
      )}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}

// ── Student/Parent result view ────────────────────────────────────────────────
function StudentResultView({ studentId, studentName, classInfo }) {
  const [term,         setTerm]        = useState("First Term");
  const [results,      setResults]     = useState([]);
  const [showReport,   setShowReport]  = useState(false);
  const [student,      setStudent]     = useState(null);

  useEffect(() => {
    setResults(getResults().filter((r) => r.studentId === studentId && r.term === term && r.session === SESSION));
    const studs = getStudents();
    setStudent(studs.find((s) => s.id === studentId));
  }, [studentId, term]);

  const subjectMap = Object.fromEntries(SUBJECTS.map((s) => [s.id, s.name]));
  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.total || 0), 0) / results.length) : 0;

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div className="mgmt-field">
          <label className="mgmt-label">Term</label>
          <select className="mgmt-input" value={term} onChange={(e) => setTerm(e.target.value)} style={{ width: 180 }}>
            {TERMS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        {results.length > 0 && (
          <button className="mgmt-btn mgmt-btn--ghost" onClick={() => setShowReport(true)} style={{ alignSelf: "flex-end" }}>
            <Printer size={15} /> View Report Card
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">No results available for {term}.</p></div>
      ) : (
        <>
          <div className="result-summary-strip">
            <div className="result-summary-item"><span>Average</span><strong style={{ color: gradeColor(gradeFromScore(avg)) }}>{avg}%</strong></div>
            <div className="result-summary-item"><span>Grade</span><strong style={{ color: gradeColor(gradeFromScore(avg)) }}>{gradeFromScore(avg)}</strong></div>
            <div className="result-summary-item"><span>Subjects</span><strong>{results.length}</strong></div>
          </div>
          <div className="mgmt-table-wrap">
            <table className="mgmt-table">
              <thead><tr>
                <th className="mgmt-th">Subject</th>
                <th className="mgmt-th">CA</th>
                <th className="mgmt-th">Exam</th>
                <th className="mgmt-th">Total</th>
                <th className="mgmt-th">Grade</th>
                <th className="mgmt-th">Teacher Comment</th>
              </tr></thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className="mgmt-tr">
                    <td className="mgmt-td mgmt-td--name">{subjectMap[r.subjectId] || r.subjectId}</td>
                    <td className="mgmt-td">{r.ca ?? "—"}</td>
                    <td className="mgmt-td">{r.exam ?? "—"}</td>
                    <td className="mgmt-td"><strong>{r.total}</strong></td>
                    <td className="mgmt-td" style={{ color: gradeColor(r.grade), fontWeight: 700 }}>{r.grade}</td>
                    <td className="mgmt-td" style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>{r.teacherComment || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showReport && student && (
        <ReportCard student={student} classInfo={classInfo} results={results} session={SESSION} term={term} onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ResultsPage() {
  const { user } = useAuth();
  const role = user?.role;

  // Determine which students to show for parent/student
  const [viewStudentId, setViewStudentId] = useState("");
  const [viewStudents, setViewStudents]   = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(getClasses());
    if (role === "student") {
      const studs = getStudents();
      const s = studs.find((st) => st.userId === user.id);
      if (s) { setViewStudents([s]); setViewStudentId(s.id); }
    } else if (role === "parent") {
      const parent = getParents().find((p) => p.userId === user.id);
      const ids    = parent?.studentIds || [];
      const studs  = getStudents().filter((s) => ids.includes(s.id));
      setViewStudents(studs);
      if (studs.length) setViewStudentId(studs[0].id);
    }
  }, [user, role]);

  const classMap = useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);
  const currentStudent = viewStudents.find((s) => s.id === viewStudentId);
  const currentClass   = classes.find((c) => c.id === currentStudent?.classId);

  if (role === "teacher" || role === "admin" || role === "principal") {
    return (
      <div className="mgmt-page">
        <div className="mgmt-page__header">
          <div><h1 className="mgmt-page__title">Results</h1><p className="mgmt-page__sub">Enter and manage student academic results</p></div>
        </div>
        <TeacherResultEntry user={user} />
      </div>
    );
  }

  if (role === "student" || role === "parent") {
    return (
      <div className="mgmt-page">
        <div className="mgmt-page__header">
          <div><h1 className="mgmt-page__title">Academic Results</h1></div>
        </div>
        {viewStudents.length > 1 && (
          <div className="mgmt-field" style={{ maxWidth: 280 }}>
            <label className="mgmt-label">Viewing results for</label>
            <select className="mgmt-input" value={viewStudentId} onChange={(e) => setViewStudentId(e.target.value)}>
              {viewStudents.map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
            </select>
          </div>
        )}
        {viewStudentId && <StudentResultView studentId={viewStudentId} classInfo={currentClass} />}
      </div>
    );
  }

  return <div className="mgmt-page"><div className="mgmt-empty"><p className="mgmt-empty__msg">Results not available for your role.</p></div></div>;
}
