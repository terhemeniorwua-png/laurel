"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, UserCheck, BookMarked, Wallet, BarChart2 } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getParents } from "@/lib/storage/parents";
import { getStudents } from "@/lib/storage/students";
import { getClasses } from "@/lib/storage/classes";
import { getAttendanceSummary } from "@/lib/storage/attendance";
import { getResultsByStudent } from "@/lib/storage/results";
import { getSubmissions } from "@/lib/storage/submissions";
import { getFeesByStudent } from "@/lib/storage/fees";

function ChildCard({ student, cls }) {
  const attSummary = getAttendanceSummary(student.id);
  const results    = getResultsByStudent(student.id);
  const subs       = getSubmissions().filter((s) => s.studentId === student.id);
  const fees       = getFeesByStudent(student.id);
  const outstanding = fees.filter((f) => f.status !== "paid").reduce((t, f) => t + (f.amount - (f.amountPaid || 0)), 0);
  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.total || 0), 0) / results.length) : null;

  return (
    <div className="child-card">
      <div className="child-card__header">
        <div className="child-card__avatar" aria-hidden="true">
          {student.firstName[0]}{student.lastName[0]}
        </div>
        <div>
          <h2 className="child-card__name">{student.firstName} {student.lastName}</h2>
          <p className="child-card__class">{cls?.name || "—"} · {student.admissionNumber || student.id}</p>
          <span className={`mgmt-badge mgmt-badge--${student.status === "active" ? "green" : "gray"}`}>{student.status}</span>
        </div>
      </div>
      <div className="child-card__stats">
        <div className="child-card__stat">
          <UserCheck size={16} aria-hidden="true" />
          <div>
            <span className="child-card__stat-val">{attSummary.percentage}%</span>
            <span className="child-card__stat-label">Attendance</span>
          </div>
        </div>
        <div className="child-card__stat">
          <BarChart2 size={16} aria-hidden="true" />
          <div>
            <span className="child-card__stat-val">{avg !== null ? `${avg}%` : "—"}</span>
            <span className="child-card__stat-label">Avg Grade</span>
          </div>
        </div>
        <div className="child-card__stat">
          <BookMarked size={16} aria-hidden="true" />
          <div>
            <span className="child-card__stat-val">{subs.filter((s) => s.status === "graded").length}/{subs.length}</span>
            <span className="child-card__stat-label">Assignments</span>
          </div>
        </div>
        <div className="child-card__stat">
          <Wallet size={16} aria-hidden="true" />
          <div>
            <span className="child-card__stat-val" style={{ color: outstanding > 0 ? "#dc2626" : "#15803d" }}>
              {outstanding > 0 ? `₦${(outstanding/1000).toFixed(0)}k` : "Paid"}
            </span>
            <span className="child-card__stat-label">Fees</span>
          </div>
        </div>
      </div>
      <div className="child-card__links">
        <Link href="/portal/attendance" className="mgmt-btn mgmt-btn--ghost" style={{ fontSize: "0.8125rem" }}>Attendance</Link>
        <Link href="/portal/results"    className="mgmt-btn mgmt-btn--ghost" style={{ fontSize: "0.8125rem" }}>Results</Link>
        <Link href="/portal/assignments" className="mgmt-btn mgmt-btn--ghost" style={{ fontSize: "0.8125rem" }}>Assignments</Link>
        <Link href="/portal/fees"       className="mgmt-btn mgmt-btn--ghost" style={{ fontSize: "0.8125rem" }}>Fees</Link>
      </div>
    </div>
  );
}

export default function ChildrenPage() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [classes,  setClasses]  = useState([]);

  useEffect(() => {
    const parent = getParents().find((p) => p.userId === user?.id);
    const ids    = parent?.studentIds || [];
    setChildren(getStudents().filter((s) => ids.includes(s.id)));
    setClasses(getClasses());
  }, [user]);

  const classMap = Object.fromEntries(classes.map((c) => [c.id, c]));

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">My Children</h1>
          <p className="mgmt-page__sub">Overview of all your enrolled children</p>
        </div>
      </div>
      {children.length === 0 ? (
        <div className="mgmt-empty"><Users size={36} style={{ opacity: 0.3 }} /><p className="mgmt-empty__msg">No children linked to this account.</p></div>
      ) : (
        <div className="children-grid">
          {children.map((s) => <ChildCard key={s.id} student={s} cls={classMap[s.classId]} />)}
        </div>
      )}
    </div>
  );
}
