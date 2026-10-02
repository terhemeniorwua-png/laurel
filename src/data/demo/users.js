/**
 * Laurel Children Academy — Demo seed data: Users.
 *
 * 10 user accounts covering every supported role.
 * IDs are stable hardcoded strings so they can be referenced
 * safely from other seed files (teachers, parents, students, etc.).
 *
 * Passwords are stored as plain strings in this seed file.
 * Phase 4 will replace them with hashed values before any backend
 * integration — never ship plain-text passwords to a real server.
 *
 * Roles
 *  admin       — full platform access
 *  principal   — school leadership view
 *  teacher     — classroom management
 *  student     — learner portal
 *  parent      — guardian portal
 *  bursar      — finance / payments
 *  secretary   — administrative support
 */

const users = [
  // ── Administration ────────────────────────────────────────────────────────
  {
    id: "user_001",
    name: "Admin User",
    email: "admin@laurelacademy.edu",
    password: "admin123",
    role: "admin",
    avatar: "",
    createdAt: "2025-09-01T08:00:00.000Z",
  },
  {
    id: "user_002",
    name: "Dr. Emmanuel Okafor",
    email: "principal@laurelacademy.edu",
    password: "admin123",
    role: "principal",
    avatar: "",
    createdAt: "2025-09-01T08:05:00.000Z",
  },

  // ── Teachers ──────────────────────────────────────────────────────────────
  {
    id: "user_003",
    name: "Mrs. Sarah Johnson",
    email: "teacher@laurelacademy.edu",
    password: "teacher123",
    role: "teacher",
    avatar: "",
    createdAt: "2025-09-01T08:10:00.000Z",
  },
  {
    id: "user_004",
    name: "Mr. Chukwuemeka Adeyemi",
    email: "adeyemi@laurelacademy.edu",
    password: "teacher123",
    role: "teacher",
    avatar: "",
    createdAt: "2025-09-01T08:15:00.000Z",
  },
  {
    id: "user_010",
    name: "Miss. Grace Nwachukwu",
    email: "nwachukwu@laurelacademy.edu",
    password: "teacher123",
    role: "teacher",
    avatar: "",
    createdAt: "2025-09-01T08:20:00.000Z",
  },

  // ── Parents ───────────────────────────────────────────────────────────────
  {
    id: "user_005",
    name: "Mrs. Fatima Ibrahim",
    email: "parent@laurelacademy.edu",
    password: "parent123",
    role: "parent",
    avatar: "",
    createdAt: "2025-09-01T08:25:00.000Z",
  },
  {
    id: "user_006",
    name: "Mr. Tobechukwu Eze",
    email: "tobe.eze@laurelacademy.edu",
    password: "parent123",
    role: "parent",
    avatar: "",
    createdAt: "2025-09-01T08:30:00.000Z",
  },

  // ── Students ──────────────────────────────────────────────────────────────
  {
    id: "user_007",
    name: "Aisha Ibrahim",
    email: "student@laurelacademy.edu",
    password: "student123",
    role: "student",
    avatar: "",
    createdAt: "2025-09-01T08:35:00.000Z",
  },
  {
    id: "user_008",
    name: "Usman Ibrahim",
    email: "usman.ibrahim@laurelacademy.edu",
    password: "student123",
    role: "student",
    avatar: "",
    createdAt: "2025-09-01T08:40:00.000Z",
  },

  // ── Finance & Admin Support ───────────────────────────────────────────────
  {
    id: "user_009",
    name: "Mrs. Blessing Okonkwo",
    email: "bursar@laurelacademy.edu",
    password: "bursar123",
    role: "bursar",
    avatar: "",
    createdAt: "2025-09-01T08:45:00.000Z",
  },
  // Note: user_010 is reserved for the third teacher above (Grace Nwachukwu).
  // Secretary uses a sequential ID to keep the list tidy.
  {
    id: "user_011",
    name: "Miss. Amaka Obi",
    email: "secretary@laurelacademy.edu",
    password: "admin123",
    role: "secretary",
    avatar: "",
    createdAt: "2025-09-01T08:50:00.000Z",
  },
];

export default users;
