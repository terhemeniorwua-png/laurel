"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, GraduationCap, UserCheck, Wallet, UserPlus, TrendingUp,
  TrendingDown, Minus, BarChart2, BookMarked, Bell, CalendarDays,
  BookOpen, ClipboardList, FileText, Settings, RefreshCw, ArrowRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from "recharts";
import {
  adminMetrics, performanceData, attendanceToday,
  admissionsPipeline, financialSummary, recentActivities, quickActions,
} from "@/data/demo/adminDashboard";
import { getAdmissions } from "@/lib/storage/admissions";
import demoNotifications from "@/data/demo/notifications";
import demoEvents from "@/data/demo/events";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Users, GraduationCap, UserCheck, Wallet, UserPlus, TrendingUp,
  BarChart2, BookMarked, Bell, CalendarDays, BookOpen, ClipboardList,
  FileText, Settings,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatNaira(n) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n}`;
}

function TrendBadge({ trend }) {
  if (trend === "up")      return <span className="adm-metric-trend adm-metric-trend--up"><TrendingUp size={13} /> Up</span>;
  if (trend === "down")    return <span className="adm-metric-trend adm-metric-trend--down"><TrendingDown size={13} /> Down</span>;
  return null;
}

// ── 1. Page header ────────────────────────────────────────────────────────────
function AdminHeader({ name, onRefresh }) {
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    setDateStr(new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);

  return (
    <div className="adm-header">
      <div className="adm-header__left">
        <p className="adm-header__greeting">{greeting()}, {name} 👋</p>
        <h1 className="adm-header__title">School Overview</h1>
        <p className="adm-header__sub">Here's what's happening across Laurel Children Academy today.</p>
      </div>
      <div className="adm-header__right">
        {dateStr && <p className="adm-header__date">{dateStr}</p>}
        <span className="adm-header__session">2026/2027 — First Term</span>
        <button className="adm-header__refresh" onClick={onRefresh} aria-label="Refresh dashboard data">
          <RefreshCw size={15} aria-hidden="true" /> Refresh
        </button>
      </div>
    </div>
  );
}

// ── 2. Metric cards ───────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, sub, trend, color, href }) {
  const Icon = ICON_MAP[icon] ?? Users;
  return (
    <Link href={href} className="adm-metric-card" style={{ "--mc-color": color }}>
      <div className="adm-metric-card__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></div>
      <div className="adm-metric-card__body">
        <span className="adm-metric-card__label">{label}</span>
        <span className="adm-metric-card__value">{value}</span>
        <div className="adm-metric-card__footer">
          <span className="adm-metric-card__sub">{sub}</span>
          <TrendBadge trend={trend} />
        </div>
      </div>
    </Link>
  );
}

// ── 3. Academic performance chart ─────────────────────────────────────────────
function AcademicPerformance() {
  const [filter, setFilter] = useState("this");
  return (
    <div className="adm-panel adm-panel--chart">
      <div className="adm-panel__header">
        <div>
          <h2 className="adm-panel__title">Academic Performance</h2>
          <p className="adm-panel__sub">Average scores by class — First Term 2026/2027</p>
        </div>
        <div className="adm-chart-filter">
          {[["this","This Term"],["last","Last Term"]].map(([v,l]) => (
            <button key={v} className={`adm-chart-filter__btn${filter===v?" adm-chart-filter__btn--active":""}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="adm-chart-wrap" role="img" aria-label="Bar chart showing average academic performance by class">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={performanceData} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E0DC" vertical={false} />
            <XAxis dataKey="class" tick={{ fontSize: 12, fill: "#78716C" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#78716C" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(v) => [`${v}%`, "Average"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E7E0DC", fontSize: 13 }}
            />
            <Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {performanceData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={filter === "last" ? 0.5 : 1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── 4. Attendance overview (donut) ────────────────────────────────────────────
function AttendanceOverview() {
  const { present, absent, late, excused, total } = attendanceToday;
  const rate = Math.round((present / total) * 100);
  const pieData = [
    { name: "Present",  value: present, fill: "#1a5e3a" },
    { name: "Absent",   value: absent,  fill: "#dc2626" },
    { name: "Late",     value: late,    fill: "#b45309" },
    { name: "Excused",  value: excused, fill: "#78716C" },
  ];

  return (
    <div className="adm-panel adm-attendance">
      <div className="adm-panel__header">
        <div>
          <h2 className="adm-panel__title">Today's Attendance</h2>
          <p className="adm-panel__sub">{total} students total</p>
        </div>
        <span className="adm-attendance__rate">{rate}%</span>
      </div>
      <div className="adm-attendance__body">
        <div className="adm-attendance__chart" role="img" aria-label={`Attendance donut chart: ${rate}% present`}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="adm-attendance__center" aria-hidden="true">
            <span className="adm-attendance__center-num">{rate}%</span>
            <span className="adm-attendance__center-label">Present</span>
          </div>
        </div>
        <div className="adm-attendance__stats">
          {pieData.map((d) => (
            <div key={d.name} className="adm-att-stat">
              <span className="adm-att-stat__dot" style={{ background: d.fill }} aria-hidden="true" />
              <span className="adm-att-stat__label">{d.name}</span>
              <span className="adm-att-stat__val">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 5. Admissions overview ────────────────────────────────────────────────────
function AdmissionsOverview() {
  const [total, setTotal] = useState(admissionsPipeline[0].value);
  useEffect(() => {
    const count = getAdmissions().length;
    if (count > 0) setTotal(count);
  }, []);

  return (
    <div className="adm-panel adm-admissions">
      <div className="adm-panel__header">
        <div>
          <h2 className="adm-panel__title">Admissions</h2>
          <p className="adm-panel__sub">{total} applications total</p>
        </div>
        <Link href="/portal/admissions" className="adm-panel__link">
          View All <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="adm-admissions__grid">
        {admissionsPipeline.slice(1).map((item) => (
          <div key={item.label} className="adm-adm-item" style={{ "--adm-color": item.color }}>
            <span className="adm-adm-item__val">{item.value}</span>
            <span className="adm-adm-item__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 6. Financial overview ─────────────────────────────────────────────────────
function FinancialOverview() {
  const { total, collected, outstanding, currency } = financialSummary;
  const pct = Math.round((collected / total) * 100);
  return (
    <div className="adm-panel adm-finance">
      <div className="adm-panel__header">
        <div>
          <h2 className="adm-panel__title">Financial Overview</h2>
          <p className="adm-panel__sub">First Term 2026/2027</p>
        </div>
        <Link href="/portal/fees" className="adm-panel__link">
          View Financials <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="adm-finance__stats">
        <div className="adm-finance__stat">
          <span className="adm-finance__label">Total Fees</span>
          <span className="adm-finance__val">{formatNaira(total)}</span>
        </div>
        <div className="adm-finance__stat adm-finance__stat--green">
          <span className="adm-finance__label">Collected</span>
          <span className="adm-finance__val">{formatNaira(collected)}</span>
        </div>
        <div className="adm-finance__stat adm-finance__stat--red">
          <span className="adm-finance__label">Outstanding</span>
          <span className="adm-finance__val">{formatNaira(outstanding)}</span>
        </div>
      </div>
      <div className="adm-finance__progress-wrap">
        <div className="adm-finance__progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="adm-finance__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="adm-finance__progress-label">{pct}% collected</span>
      </div>
    </div>
  );
}

// ── 7. Recent activity ────────────────────────────────────────────────────────
function RecentActivity() {
  return (
    <div className="adm-panel adm-activity">
      <div className="adm-panel__header">
        <h2 className="adm-panel__title">Recent Activity</h2>
      </div>
      <ul className="adm-activity__list" role="list">
        {recentActivities.map((act) => {
          const Icon = ICON_MAP[act.icon] ?? Bell;
          return (
            <li key={act.id} className="adm-activity__item" role="listitem">
              <div className="adm-activity__icon" style={{ "--act-color": act.color }} aria-hidden="true">
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <div className="adm-activity__body">
                <p className="adm-activity__text">{act.text}</p>
                <p className="adm-activity__who">{act.who}</p>
              </div>
              <div className="adm-activity__right">
                <span className="adm-activity__cat">{act.category}</span>
                <span className="adm-activity__time">{act.time}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── 8. Upcoming events ────────────────────────────────────────────────────────
function UpcomingEvents() {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today = new Date().toISOString().slice(0, 10);
  const events = demoEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="adm-panel adm-events">
      <div className="adm-panel__header">
        <h2 className="adm-panel__title">Upcoming Events</h2>
        <Link href="/portal/events" className="adm-panel__link">View all <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      {events.length === 0 ? (
        <p className="adm-empty">No upcoming events scheduled.</p>
      ) : (
        <ul className="adm-events__list" role="list">
          {events.map((ev) => {
            const d = new Date(ev.date + "T00:00:00");
            return (
              <li key={ev.id} className="adm-event-item" role="listitem">
                <div className="adm-event-item__date" aria-label={`${d.getDate()} ${MONTHS[d.getMonth()]}`}>
                  <span className="adm-event-item__day">{d.getDate()}</span>
                  <span className="adm-event-item__month">{MONTHS[d.getMonth()]}</span>
                </div>
                <div className="adm-event-item__body">
                  <p className="adm-event-item__title">{ev.title}</p>
                  <p className="adm-event-item__meta">{ev.startTime} {ev.location ? `· ${ev.location.split(",")[0]}` : ""}</p>
                </div>
                <span className="adm-event-item__cat">{ev.category}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── 9. Notifications ──────────────────────────────────────────────────────────
function NotificationsPanel() {
  const adminNotifs = demoNotifications
    .filter((n) => n.userId === "user_001")
    .slice(0, 5);

  const typeIcon = { admission: UserPlus, payment: Wallet, announcement: Bell, event: CalendarDays };

  return (
    <div className="adm-panel adm-notifs">
      <div className="adm-panel__header">
        <h2 className="adm-panel__title">Notifications</h2>
        <span className="adm-notifs__badge">{adminNotifs.filter((n) => !n.read).length} new</span>
      </div>
      {adminNotifs.length === 0 ? (
        <p className="adm-empty">No notifications.</p>
      ) : (
        <ul className="adm-notifs__list" role="list">
          {adminNotifs.map((n) => {
            const Icon = typeIcon[n.type] ?? Bell;
            return (
              <li key={n.id} className={`adm-notif-item${n.read ? "" : " adm-notif-item--unread"}`} role="listitem">
                <div className="adm-notif-item__icon" aria-hidden="true"><Icon size={15} /></div>
                <div className="adm-notif-item__body">
                  <p className="adm-notif-item__title">{n.title}</p>
                  <p className="adm-notif-item__msg">{n.message}</p>
                </div>
                {!n.read && <span className="adm-notif-item__dot" aria-label="Unread" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── 10. Quick actions ─────────────────────────────────────────────────────────
function QuickActions() {
  return (
    <div className="adm-quick-actions">
      <h2 className="adm-section-title">Quick Actions</h2>
      <div className="adm-quick-actions__grid">
        {quickActions.map((action) => {
          const Icon = ICON_MAP[action.icon] ?? Users;
          return (
            <Link key={action.href} href={action.href} className="adm-quick-btn" style={{ "--qa-color": action.color }} aria-label={action.label}>
              <div className="adm-quick-btn__icon" aria-hidden="true"><Icon size={20} strokeWidth={1.75} /></div>
              <span className="adm-quick-btn__label">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminDashboard({ userName }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="adm-dashboard" key={refreshKey}>
      {/* 1. Header */}
      <AdminHeader name={userName} onRefresh={() => setRefreshKey((k) => k + 1)} />

      {/* 2. Metric cards */}
      <div className="adm-metrics-grid">
        {adminMetrics.map((m) => <MetricCard key={m.id} {...m} />)}
      </div>

      {/* 3. Charts row */}
      <div className="adm-charts-row">
        <AcademicPerformance />
        <AttendanceOverview />
      </div>

      {/* 4. Middle row */}
      <div className="adm-mid-row">
        <AdmissionsOverview />
        <FinancialOverview />
      </div>

      {/* 5. Quick actions */}
      <QuickActions />

      {/* 6. Bottom row */}
      <div className="adm-bottom-row">
        <RecentActivity />
        <div className="adm-bottom-right">
          <UpcomingEvents />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
}
