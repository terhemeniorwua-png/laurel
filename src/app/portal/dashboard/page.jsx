"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, GraduationCap, BookMarked, UserCheck,
  Wallet, Bell, CalendarDays, TrendingUp, ClipboardList,
} from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { getStudents } from "@/lib/storage/students";
import { getTeachers } from "@/lib/storage/teachers";
import { getAssignments } from "@/lib/storage/assignments";
import { getAttendance } from "@/lib/storage/attendance";
import demoAnnouncements from "@/data/demo/announcements";
import demoEvents from "@/data/demo/events";
import AdminDashboard from "./AdminDashboard";

// ── Greeting ──────────────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Shared stat card ──────────────────────────────────────────────────────────
function DashCard({ icon: Icon, label, value, color, href }) {
  return (
    <Link href={href ?? "#"} className="dash-card" style={{ "--dash-color": color }}>
      <div className="dash-card__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <div className="dash-card__body">
        <span className="dash-card__value">{value}</span>
        <span className="dash-card__label">{label}</span>
      </div>
    </Link>
  );
}

// ── Shared sections (announcements + events) ──────────────────────────────────
function DashSections() {
  const recentAnn = demoAnnouncements.slice(0, 3);
  const today     = new Date().toISOString().slice(0, 10);
  const upcoming  = demoEvents.filter((e) => e.date >= today).slice(0, 3);

  return (
    <div className="dash-sections">
      <div className="dash-panel">
        <div className="dash-panel__header">
          <h2 className="dash-section-title">Announcements</h2>
          <Link href="/portal/announcements" className="dash-panel__see-all">View all</Link>
        </div>
        {recentAnn.map((a) => (
          <div key={a.id} className="dash-ann-item">
            <span className={`dash-ann-item__priority dash-ann-item__priority--${a.priority}`}>{a.priority}</span>
            <div>
              <p className="dash-ann-item__title">{a.title}</p>
              <p className="dash-ann-item__date">{new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dash-panel">
        <div className="dash-panel__header">
          <h2 className="dash-section-title">Upcoming Events</h2>
          <Link href="/portal/events" className="dash-panel__see-all">View all</Link>
        </div>
        {upcoming.length === 0 ? <p className="dash-empty">No upcoming events.</p> : null}
        {upcoming.map((e) => {
          const d = new Date(e.date + "T00:00:00");
          const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          return (
            <div key={e.id} className="dash-event-item">
              <div className="dash-event-item__date">
                <span className="dash-event-item__day">{d.getDate()}</span>
                <span className="dash-event-item__month">{MONTHS[d.getMonth()]}</span>
              </div>
              <div>
                <p className="dash-event-item__title">{e.title}</p>
                <p className="dash-event-item__cat">{e.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Role-specific dashboards ──────────────────────────────────────────────────
function TeacherDash() {
  return (
    <>
      <div className="dash-cards">
        <DashCard icon={Users}      label="My Students"        value="32"    color="#532306" href="/portal/students" />
        <DashCard icon={UserCheck}  label="Today's Attendance" value="94%"   color="#1a5e3a" href="/portal/attendance" />
        <DashCard icon={BookMarked} label="Active Assignments"  value="4"    color="#1d4ed8" href="/portal/assignments" />
        <DashCard icon={TrendingUp} label="Pending Grading"     value="7"    color="#b45309" href="/portal/results" />
      </div>
      <div className="dash-schedule">
        <h2 className="dash-section-title">Today's Schedule</h2>
        <div className="dash-schedule__list">
          {[
            { time: "08:00", subject: "Mathematics",   class: "Primary 5A" },
            { time: "09:00", subject: "English",       class: "Primary 5A" },
            { time: "10:30", subject: "Basic Science", class: "Primary 5A" },
          ].map((s) => (
            <div key={s.time} className="dash-schedule__item">
              <span className="dash-schedule__time">{s.time}</span>
              <div>
                <p className="dash-schedule__subject">{s.subject}</p>
                <p className="dash-schedule__class">{s.class}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DashSections />
    </>
  );
}

function ParentDash() {
  return (
    <>
      <div className="dash-cards">
        <DashCard icon={Users}      label="My Children"       value="2"     color="#532306" href="/portal/children" />
        <DashCard icon={UserCheck}  label="Avg Attendance"    value="96%"   color="#1a5e3a" href="/portal/attendance" />
        <DashCard icon={BookMarked} label="Assignments Due"   value="3"     color="#1d4ed8" href="/portal/assignments" />
        <DashCard icon={Wallet}     label="Outstanding Fees"  value="₦65k"  color="#b45309" href="/portal/fees" />
      </div>
      <DashSections />
    </>
  );
}

function StudentDash() {
  return (
    <>
      <div className="dash-cards">
        <DashCard icon={UserCheck}  label="Attendance"       value="96%"   color="#532306" href="/portal/attendance" />
        <DashCard icon={TrendingUp} label="Average Grade"    value="88.8%" color="#1a5e3a" href="/portal/results" />
        <DashCard icon={BookMarked} label="Assignments"      value="14/16" color="#1d4ed8" href="/portal/assignments" />
        <DashCard icon={Bell}       label="Announcements"    value="3"     color="#7c3aed" href="/portal/announcements" />
      </div>
      <DashSections />
    </>
  );
}

function BursarDash() {
  return (
    <>
      <div className="dash-cards">
        <DashCard icon={Wallet}        label="Total Fees Due"  value="₦2.4M" color="#532306" href="/portal/fees" />
        <DashCard icon={TrendingUp}    label="Collected"       value="₦1.8M" color="#1a5e3a" href="/portal/payments" />
        <DashCard icon={Users}         label="Outstanding"     value="42"    color="#b45309" href="/portal/fees" />
        <DashCard icon={ClipboardList} label="Invoices"        value="87"    color="#1d4ed8" href="/portal/invoices" />
      </div>
      <DashSections />
    </>
  );
}

function GenericDash() {
  return (
    <>
      <div className="dash-cards">
        <DashCard icon={Bell}         label="Announcements"   value="5"  color="#532306" href="/portal/announcements" />
        <DashCard icon={CalendarDays} label="Upcoming Events" value="3"  color="#1a5e3a" href="/portal/events" />
      </div>
      <DashSections />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();
  const role      = user?.role;
  const firstName = user?.name?.split(" ")[0] ?? "there";

  // Admin and Principal get the full AdminDashboard
  if (role === "admin" || role === "principal") {
    return <AdminDashboard userName={firstName} />;
  }

  // All other roles get the existing simplified dashboard
  return (
    <div className="dash-page">
      <div className="dash-greeting">
        <h1 className="dash-greeting__text">{greeting()}, {firstName} 👋</h1>
        <span className="dash-greeting__role">{ROLE_LABELS[role]}</span>
      </div>

      {role === "teacher"                     && <TeacherDash />}
      {role === "parent"                      && <ParentDash />}
      {role === "student"                     && <StudentDash />}
      {role === "bursar"                      && <BursarDash />}
      {(role === "secretary" || !role)        && <GenericDash />}

      <div className="dash-coming-soon">
        <Bell size={18} aria-hidden="true" />
        <p>More portal features are coming in upcoming phases. Navigation links will become active as each module is implemented.</p>
      </div>
    </div>
  );
}
