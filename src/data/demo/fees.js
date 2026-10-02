/**
 * Laurel Children Academy — Demo seed data: Fees.
 *
 * 10 fee records for the First Term, 2026/2027 session.
 *
 * Fee amounts (in Naira)
 * ──────────────────────
 *  Tuition     ₦ 85,000
 *  Books       ₦ 15,000
 *  Uniform     ₦ 12,000
 *  Transport   ₦ 25,000
 *  Activities  ₦  8,000
 *
 * Status values: paid | partial | pending | overdue
 *
 * Student ↔ fee mapping
 * ─────────────────────
 *  student_001 (Aisha)    — fee_001 Tuition: paid
 *                          fee_002 Books:   partial
 *  student_013 (Seun)    — fee_003 Tuition: partial
 *                          fee_004 Transport: pending
 *  student_014 (Zainab)  — fee_005 Tuition: paid
 *                          fee_006 Books:   paid
 *  student_002 (Usman)   — fee_007 Tuition: overdue
 *  student_010 (Fatima M)— fee_008 Tuition: pending
 *  student_015 (Ifeanyi) — fee_009 Tuition: paid
 *                          fee_010 Activities: pending
 */

/** @type {Array<Object>} */
const demoFees = [
  // ── Aisha Ibrahim (student_001) ───────────────────────────────────────────

  {
    id: "fee_001",
    studentId: "student_001",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "paid",
    createdAt: "2026-09-01T08:00:00.000Z",
  },
  {
    id: "fee_002",
    studentId: "student_001",
    session: "2026/2027",
    term: "First Term",
    feeType: "Books",
    amount: 15000,
    dueDate: "2026-09-19",
    status: "partial",
    createdAt: "2026-09-01T08:01:00.000Z",
  },

  // ── Seun Bankole (student_013) ────────────────────────────────────────────

  {
    id: "fee_003",
    studentId: "student_013",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "partial",
    createdAt: "2026-09-01T08:05:00.000Z",
  },
  {
    id: "fee_004",
    studentId: "student_013",
    session: "2026/2027",
    term: "First Term",
    feeType: "Transport",
    amount: 25000,
    dueDate: "2026-09-19",
    status: "pending",
    createdAt: "2026-09-01T08:06:00.000Z",
  },

  // ── Zainab Abdullahi (student_014) ────────────────────────────────────────

  {
    id: "fee_005",
    studentId: "student_014",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "paid",
    createdAt: "2026-09-01T08:10:00.000Z",
  },
  {
    id: "fee_006",
    studentId: "student_014",
    session: "2026/2027",
    term: "First Term",
    feeType: "Books",
    amount: 15000,
    dueDate: "2026-09-19",
    status: "paid",
    createdAt: "2026-09-01T08:11:00.000Z",
  },

  // ── Usman Ibrahim (student_002) ───────────────────────────────────────────

  {
    id: "fee_007",
    studentId: "student_002",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "overdue",
    createdAt: "2026-09-01T08:15:00.000Z",
  },

  // ── Fatima Musa (student_010) ─────────────────────────────────────────────

  {
    id: "fee_008",
    studentId: "student_010",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "pending",
    createdAt: "2026-09-01T08:20:00.000Z",
  },

  // ── Ifeanyi Chukwu (student_015) ──────────────────────────────────────────

  {
    id: "fee_009",
    studentId: "student_015",
    session: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amount: 85000,
    dueDate: "2026-09-19",
    status: "paid",
    createdAt: "2026-09-01T08:25:00.000Z",
  },
  {
    id: "fee_010",
    studentId: "student_015",
    session: "2026/2027",
    term: "First Term",
    feeType: "Activities",
    amount: 8000,
    dueDate: "2026-09-26",
    status: "pending",
    createdAt: "2026-09-01T08:26:00.000Z",
  },
];

export default demoFees;
