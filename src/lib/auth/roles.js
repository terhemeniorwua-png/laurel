/**
 * Laurel Children Academy — Role definitions.
 *
 * Single source of truth for all role identifiers and their display names.
 * Import ROLES wherever a role string is needed rather than hardcoding strings.
 */

export const ROLES = {
  ADMIN:     "admin",
  PRINCIPAL: "principal",
  TEACHER:   "teacher",
  STUDENT:   "student",
  PARENT:    "parent",
  BURSAR:    "bursar",
  SECRETARY: "secretary",
};

/** Human-readable labels for each role. */
export const ROLE_LABELS = {
  admin:     "Administrator",
  principal: "Principal",
  teacher:   "Teacher",
  student:   "Student",
  parent:    "Parent / Guardian",
  bursar:    "Bursar",
  secretary: "Secretary",
};

/** Portal navigation items per role. */
export const ROLE_NAV = {
  admin: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "Students",      href: "/portal/students" },
    { label: "Teachers",      href: "/portal/teachers" },
    { label: "Classes",       href: "/portal/classes" },
    { label: "Admissions",    href: "/portal/admissions" },
    { label: "Attendance",    href: "/portal/attendance" },
    { label: "Assignments",   href: "/portal/assignments" },
    { label: "Results",       href: "/portal/results" },
    { label: "Fees",          href: "/portal/fees" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Events",        href: "/portal/events" },
    { label: "Messages",      href: "/portal/messages" },
    { label: "Settings",      href: "/portal/settings" },
  ],
  principal: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "Students",      href: "/portal/students" },
    { label: "Teachers",      href: "/portal/teachers" },
    { label: "Classes",       href: "/portal/classes" },
    { label: "Admissions",    href: "/portal/admissions" },
    { label: "Attendance",    href: "/portal/attendance" },
    { label: "Assignments",   href: "/portal/assignments" },
    { label: "Results",       href: "/portal/results" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Events",        href: "/portal/events" },
  ],
  teacher: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "My Classes",    href: "/portal/classes" },
    { label: "Students",      href: "/portal/students" },
    { label: "Attendance",    href: "/portal/attendance" },
    { label: "Assignments",   href: "/portal/assignments" },
    { label: "Results",       href: "/portal/results" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Messages",      href: "/portal/messages" },
  ],
  parent: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "My Children",   href: "/portal/children" },
    { label: "Attendance",    href: "/portal/attendance" },
    { label: "Assignments",   href: "/portal/assignments" },
    { label: "Results",       href: "/portal/results" },
    { label: "Fees",          href: "/portal/fees" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Events",        href: "/portal/events" },
    { label: "Messages",      href: "/portal/messages" },
  ],
  student: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "My Classes",    href: "/portal/classes" },
    { label: "Assignments",   href: "/portal/assignments" },
    { label: "Results",       href: "/portal/results" },
    { label: "Attendance",    href: "/portal/attendance" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Events",        href: "/portal/events" },
    { label: "Messages",      href: "/portal/messages" },
  ],
  bursar: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "Fees",          href: "/portal/fees" },
    { label: "Payments",      href: "/portal/payments" },
    { label: "Invoices",      href: "/portal/invoices" },
    { label: "Reports",       href: "/portal/reports" },
  ],
  secretary: [
    { label: "Dashboard",     href: "/portal/dashboard" },
    { label: "Students",      href: "/portal/students" },
    { label: "Admissions",    href: "/portal/admissions" },
    { label: "Announcements", href: "/portal/announcements" },
    { label: "Events",        href: "/portal/events" },
    { label: "Messages",      href: "/portal/messages" },
  ],
};
