/**
 * Laurel Children Academy — Demo seed data: Parents.
 *
 * 8 parent / guardian profiles.
 *
 * parent_001 — Mrs Fatima Ibrahim
 *   The primary demo parent account (email: parent@laurelacademy.edu).
 *   She has TWO children enrolled:
 *     • student_001 — Aisha Ibrahim  (Primary 5A)
 *     • student_002 — Usman Ibrahim  (Primary 3A — younger sibling)
 *
 * parents 002–008 each have one child so the portal's multi-child
 * switcher can be demonstrated alongside single-child flows.
 *
 * studentIds — array of student IDs belonging to this guardian
 * userId     — links to the user account (null if no portal login seeded)
 */

const parents = [
  // ── Primary demo parent (two children) ───────────────────────────────────
  {
    id: "parent_001",
    userId: "user_005",
    firstName: "Fatima",
    lastName: "Ibrahim",
    email: "parent@laurelacademy.edu",
    phone: "+234 806 100 0001",
    occupation: "Civil Servant",
    studentIds: ["student_001", "student_002"],
    createdAt: "2025-09-01T10:00:00.000Z",
  },

  // ── Single-child parents ──────────────────────────────────────────────────
  {
    id: "parent_002",
    userId: "user_006",
    firstName: "Tobechukwu",
    lastName: "Eze",
    email: "tobe.eze@laurelacademy.edu",
    phone: "+234 806 200 0002",
    occupation: "Engineer",
    studentIds: ["student_003"],
    createdAt: "2025-09-01T10:05:00.000Z",
  },
  {
    id: "parent_003",
    userId: null,
    firstName: "Chidinma",
    lastName: "Okeke",
    email: "chidinma.okeke@mail.com",
    phone: "+234 806 300 0003",
    occupation: "Teacher",
    studentIds: ["student_004"],
    createdAt: "2025-09-01T10:10:00.000Z",
  },
  {
    id: "parent_004",
    userId: null,
    firstName: "Emeka",
    lastName: "Nwosu",
    email: "emeka.nwosu@mail.com",
    phone: "+234 806 400 0004",
    occupation: "Businessman",
    studentIds: ["student_005"],
    createdAt: "2025-09-01T10:15:00.000Z",
  },
  {
    id: "parent_005",
    userId: null,
    firstName: "Halima",
    lastName: "Bello",
    email: "halima.bello@mail.com",
    phone: "+234 806 500 0005",
    occupation: "Nurse",
    studentIds: ["student_006"],
    createdAt: "2025-09-01T10:20:00.000Z",
  },
  {
    id: "parent_006",
    userId: null,
    firstName: "Adaeze",
    lastName: "Obi",
    email: "adaeze.obi@mail.com",
    phone: "+234 806 600 0006",
    occupation: "Accountant",
    studentIds: ["student_007"],
    createdAt: "2025-09-01T10:25:00.000Z",
  },
  {
    id: "parent_007",
    userId: null,
    firstName: "Musa",
    lastName: "Garba",
    email: "musa.garba@mail.com",
    phone: "+234 806 700 0007",
    occupation: "Pharmacist",
    studentIds: ["student_008"],
    createdAt: "2025-09-01T10:30:00.000Z",
  },
  {
    id: "parent_008",
    userId: null,
    firstName: "Yetunde",
    lastName: "Adeyemi",
    email: "yetunde.adeyemi@mail.com",
    phone: "+234 806 800 0008",
    occupation: "Lawyer",
    studentIds: ["student_009"],
    createdAt: "2025-09-01T10:35:00.000Z",
  },
];

export default parents;
