/**
 * Laurel Children Academy — Admin Dashboard demo data.
 *
 * Structured so each section can be replaced with an API call later.
 * All values are clearly demo data.
 */

// ── Summary metrics ───────────────────────────────────────────────────────────
export const adminMetrics = [
  {
    id: "students",
    icon: "Users",
    label: "Total Students",
    value: "500",
    sub: "+24 this term",
    trend: "up",
    color: "#532306",
    href: "/portal/students",
  },
  {
    id: "teachers",
    icon: "GraduationCap",
    label: "Total Teachers",
    value: "20",
    sub: "18 active today",
    trend: "neutral",
    color: "#1a5e3a",
    href: "/portal/teachers",
  },
  {
    id: "attendance",
    icon: "UserCheck",
    label: "Attendance Rate",
    value: "94.6%",
    sub: "+1.8% from last week",
    trend: "up",
    color: "#1d4ed8",
    href: "/portal/attendance",
  },
  {
    id: "fees",
    icon: "Wallet",
    label: "Outstanding Fees",
    value: "₦1.7M",
    sub: "20.2% of total fees",
    trend: "down",
    color: "#b45309",
    href: "/portal/fees",
  },
  {
    id: "admissions",
    icon: "UserPlus",
    label: "New Admissions",
    value: "24",
    sub: "8 awaiting review",
    trend: "up",
    color: "#7c3aed",
    href: "/portal/admissions",
  },
];

// ── Academic performance (bar chart) ─────────────────────────────────────────
export const performanceData = [
  { class: "Primary 1", avg: 82, fill: "#532306" },
  { class: "Primary 2", avg: 85, fill: "#7a3710" },
  { class: "Primary 3", avg: 88, fill: "#1a5e3a" },
  { class: "Primary 4", avg: 84, fill: "#1d4ed8" },
  { class: "Primary 5", avg: 91, fill: "#7c3aed" },
  { class: "Primary 6", avg: 89, fill: "#b45309" },
];

// ── Attendance breakdown (today) ──────────────────────────────────────────────
export const attendanceToday = {
  present:  472,
  absent:   18,
  late:     7,
  excused:  3,
  total:    500,
};

// ── Admissions pipeline ───────────────────────────────────────────────────────
export const admissionsPipeline = [
  { label: "Total Applications", value: 42,  color: "#532306" },
  { label: "New",                value: 12,  color: "#1d4ed8" },
  { label: "Under Review",       value: 8,   color: "#b45309" },
  { label: "Assessment",         value: 6,   color: "#7c3aed" },
  { label: "Approved",           value: 14,  color: "#1a5e3a" },
  { label: "Rejected",           value: 2,   color: "#dc2626" },
];

// ── Financial summary ─────────────────────────────────────────────────────────
export const financialSummary = {
  total:       8400000,
  collected:   6700000,
  outstanding: 1700000,
  currency:    "₦",
};

// ── Recent activity ───────────────────────────────────────────────────────────
export const recentActivities = [
  {
    id: "act_001",
    icon: "UserPlus",
    color: "#7c3aed",
    text: "New admission application submitted",
    who: "Adeyemi Family",
    time: "2 minutes ago",
    category: "Admissions",
  },
  {
    id: "act_002",
    icon: "UserCheck",
    color: "#1a5e3a",
    text: "Attendance recorded for Primary 5A",
    who: "Mrs. Sarah Johnson",
    time: "18 minutes ago",
    category: "Attendance",
  },
  {
    id: "act_003",
    icon: "BookMarked",
    color: "#1d4ed8",
    text: "New assignment published — Mathematics",
    who: "Mrs. Sarah Johnson",
    time: "1 hour ago",
    category: "Assignments",
  },
  {
    id: "act_004",
    icon: "Wallet",
    color: "#b45309",
    text: "Fee payment received",
    who: "Ibrahim Family — ₦85,000",
    time: "2 hours ago",
    category: "Finance",
  },
  {
    id: "act_005",
    icon: "BarChart2",
    color: "#0f766e",
    text: "First Term results published — Primary 5A",
    who: "Mrs. Sarah Johnson",
    time: "3 hours ago",
    category: "Results",
  },
  {
    id: "act_006",
    icon: "Bell",
    color: "#532306",
    text: "School announcement created",
    who: "Administrator",
    time: "5 hours ago",
    category: "Announcements",
  },
  {
    id: "act_007",
    icon: "Users",
    color: "#1a5e3a",
    text: "New student enrolled in Primary 3A",
    who: "Chiamaka Okonkwo",
    time: "Yesterday, 4:12 PM",
    category: "Students",
  },
];

// ── Quick actions ─────────────────────────────────────────────────────────────
export const quickActions = [
  { icon: "UserPlus",  label: "Add Student",    href: "/portal/students",      color: "#532306" },
  { icon: "GraduationCap", label: "Add Teacher", href: "/portal/teachers",     color: "#1a5e3a" },
  { icon: "BookOpen",  label: "Create Class",   href: "/portal/classes",       color: "#1d4ed8" },
  { icon: "ClipboardList", label: "Admissions", href: "/portal/admissions",    color: "#7c3aed" },
  { icon: "Bell",      label: "Announcement",   href: "/portal/announcements", color: "#b45309" },
  { icon: "CalendarDays", label: "Create Event", href: "/portal/events",       color: "#0f766e" },
  { icon: "FileText",  label: "View Reports",   href: "/portal/reports",       color: "#78716C" },
  { icon: "Settings",  label: "Settings",       href: "/portal/settings",      color: "#211A17" },
];
