"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle, X, Clock, MinusCircle, Save, Users } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getClasses } from "@/lib/storage/classes";
import { getTeachers } from "@/lib/storage/teachers";
import { getStudentsByClass } from "@/lib/storage/students";
import { getAttendance, createAttendance, updateAttendance, getAttendanceByStudentAndDate } from "@/lib/storage/attendance";

const STATUSES = [
  { value: "present",  label: "Present",  icon: CheckCircle, color: "#1a5e3a" },
  { value: "absent",   label: "Absent",   icon: X,           color: "#dc2626" },
  { value: "late",     label: "Late",     icon: Clock,       color: "#b45309" },
  { value: "excused",  label: "Excused",  icon: MinusCircle, color: "#78716C" },
];

function AttendanceSummary({ records }) {
  const counts = { present: 0, absent: 0, late: 0, excused: 0 };
  records.forEach((r) => { if (counts[r.status] !== undefined) counts[r.status]++; });
  return (
    <div className="att-summary">
      {STATUSES.map((s) => (
        <div key={s.value} className="att-summary__item" style={{ "--att-color": s.color }}>
          <span className="att-summary__val">{counts[s.value]}</span>
          <span className="att-summary__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [classes,   setClasses]   = useState([]);
  const [classId,   setClassId]   = useState("");
  const [date,      setDate]      = useState(new Date().toISOString().slice(0, 10));
  const [students,  setStudents]  = useState([]);
  const [records,   setRecords]   = useState({}); // studentId → status
  const [notes,     setNotes]     = useState({}); // studentId → note
  const [saved,     setSaved]     = useState(false);
  const [toast,     setToast]     = useState("");

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  // Determine which classes to show
  useEffect(() => {
    const allClasses = getClasses();
    if (user?.role === "teacher") {
      const teachers = getTeachers();
      const teacher  = teachers.find((t) => t.userId === user.id);
      const ids      = teacher?.classIds || [];
      setClasses(allClasses.filter((c) => ids.includes(c.id)));
    } else {
      setClasses(allClasses);
    }
  }, [user]);

  // Load students and existing attendance when class/date changes
  useEffect(() => {
    if (!classId) return;
    const studs = getStudentsByClass(classId);
    setStudents(studs);
    // Pre-load existing attendance records for this class+date
    const existing = getAttendance().filter((a) => a.classId === classId && a.date === date);
    const rec = {};
    const nt  = {};
    existing.forEach((a) => { rec[a.studentId] = a.status; nt[a.studentId] = a.note || ""; });
    // Default to present if no record
    studs.forEach((s) => { if (!rec[s.id]) rec[s.id] = "present"; });
    setRecords(rec);
    setNotes(nt);
    setSaved(existing.length > 0);
  }, [classId, date]);

  function markAll(status) {
    const rec = {};
    students.forEach((s) => { rec[s.id] = status; });
    setRecords(rec);
  }

  function handleSave() {
    if (!classId || !date || students.length === 0) return;
    const existing = getAttendance().filter((a) => a.classId === classId && a.date === date);
    const existingMap = Object.fromEntries(existing.map((a) => [a.studentId, a.id]));
    students.forEach((s) => {
      const status = records[s.id] || "present";
      const note   = notes[s.id] || "";
      if (existingMap[s.id]) {
        updateAttendance(existingMap[s.id], { status, note });
      } else {
        createAttendance({ studentId: s.id, classId, date, status, note, markedBy: user?.id || "admin" });
      }
    });
    setSaved(true);
    showToast(`Attendance saved for ${classes.find((c) => c.id === classId)?.name || classId} — ${date}`);
  }

  const summary = useMemo(() => {
    return students.map((s) => ({ ...s, status: records[s.id] || "present" }));
  }, [students, records]);

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Attendance</h1>
          <p className="mgmt-page__sub">Mark and manage daily class attendance</p>
        </div>
      </div>

      {/* Controls */}
      <div className="att-controls">
        <div className="mgmt-field" style={{ flex: 1, maxWidth: 280 }}>
          <label className="mgmt-label">Select Class</label>
          <select className="mgmt-input" value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">— Choose a class —</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mgmt-field">
          <label className="mgmt-label">Date</label>
          <input type="date" className="mgmt-input" value={date} onChange={(e) => setDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
        </div>
        {classId && students.length > 0 && (
          <div className="att-bulk-btns">
            <button className="mgmt-btn mgmt-btn--ghost" onClick={() => markAll("present")}>Mark All Present</button>
            <button className="mgmt-btn mgmt-btn--ghost" onClick={() => markAll("absent")}>Mark All Absent</button>
            <button className="mgmt-btn mgmt-btn--ghost" onClick={() => { const r = {}; students.forEach((s) => { r[s.id] = "present"; }); setRecords(r); }}>Reset</button>
          </div>
        )}
      </div>

      {/* Attendance table */}
      {!classId ? (
        <div className="mgmt-empty"><Users size={36} style={{ opacity: 0.3 }} /><p className="mgmt-empty__msg">Select a class to take attendance.</p></div>
      ) : students.length === 0 ? (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">No students found for this class.</p></div>
      ) : (
        <>
          {saved && <div className="att-saved-banner">✓ Attendance already saved for this date. Changes will update existing records.</div>}
          <AttendanceSummary records={summary} />
          <div className="mgmt-table-wrap">
            <table className="mgmt-table">
              <thead>
                <tr>
                  <th className="mgmt-th">Student</th>
                  <th className="mgmt-th">Student ID</th>
                  <th className="mgmt-th">Status</th>
                  <th className="mgmt-th">Note</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="mgmt-tr">
                    <td className="mgmt-td mgmt-td--name">{s.firstName} {s.lastName}</td>
                    <td className="mgmt-td">{s.admissionNumber || s.id}</td>
                    <td className="mgmt-td">
                      <div className="att-status-btns">
                        {STATUSES.map((st) => (
                          <button
                            key={st.value}
                            className={`att-status-btn${records[s.id] === st.value ? " att-status-btn--active" : ""}`}
                            style={{ "--att-color": st.color }}
                            onClick={() => setRecords((p) => ({ ...p, [s.id]: st.value }))}
                            aria-pressed={records[s.id] === st.value}
                            aria-label={`Mark ${s.firstName} as ${st.label}`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="mgmt-td">
                      <input
                        className="mgmt-input mgmt-input--sm"
                        value={notes[s.id] || ""}
                        onChange={(e) => setNotes((p) => ({ ...p, [s.id]: e.target.value }))}
                        placeholder="Optional note…"
                        aria-label={`Note for ${s.firstName}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="att-save-row">
            <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave}>
              <Save size={16} aria-hidden="true" /> Save Attendance
            </button>
          </div>
        </>
      )}

      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
