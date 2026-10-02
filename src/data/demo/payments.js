/**
 * Laurel Children Academy — Demo seed data: Payments.
 *
 * 8 payment records for the First Term, 2026/2027 session.
 *
 * All payments carry status "successful".
 *
 * Reference format : LCA-PAY-NNNNN
 * Receipt format   : RCP-2026-NNNNN
 *
 * Fee ↔ payment mapping
 * ──────────────────────────────────────────────────────────────
 *  fee_001 (Aisha — Tuition ₦85,000)     → pay_001  full ₦85,000
 *  fee_002 (Aisha — Books   ₦15,000)     → pay_002  partial ₦8,000
 *  fee_003 (Seun  — Tuition ₦85,000)     → pay_003  partial ₦50,000
 *  fee_005 (Zainab — Tuition ₦85,000)    → pay_004  full ₦85,000
 *  fee_006 (Zainab — Books  ₦15,000)     → pay_005  full ₦15,000
 *  fee_009 (Ifeanyi — Tuition ₦85,000)   → pay_006  full ₦85,000
 *  fee_003 (Seun  — Tuition, 2nd instal.) → pay_007  partial ₦20,000
 *  fee_007 (Usman — Tuition ₦85,000)     → pay_008  partial ₦30,000
 *                                                    (now overdue for balance)
 * ──────────────────────────────────────────────────────────────
 * Note: fee_007 remains "overdue" in the fees table because the
 * partial payment (pay_008) was made before the due date but the
 * outstanding balance was never cleared.
 */

/** @type {Array<Object>} */
const demoPayments = [
  // ── Aisha Ibrahim (student_001) ───────────────────────────────────────────

  // pay_001 — Full Tuition payment
  {
    id: "pay_001",
    feeId: "fee_001",
    studentId: "student_001",
    amount: 85000,
    paymentDate: "2026-09-10T10:15:00.000Z",
    reference: "LCA-PAY-00001",
    method: "Bank Transfer",
    status: "successful",
    receiptNumber: "RCP-2026-00001",
    createdAt: "2026-09-10T10:15:00.000Z",
  },

  // pay_002 — Partial Books payment (₦8,000 of ₦15,000 outstanding)
  {
    id: "pay_002",
    feeId: "fee_002",
    studentId: "student_001",
    amount: 8000,
    paymentDate: "2026-09-12T11:30:00.000Z",
    reference: "LCA-PAY-00002",
    method: "Online",
    status: "successful",
    receiptNumber: "RCP-2026-00002",
    createdAt: "2026-09-12T11:30:00.000Z",
  },

  // ── Seun Bankole (student_013) ────────────────────────────────────────────

  // pay_003 — First instalment on Tuition (₦50,000)
  {
    id: "pay_003",
    feeId: "fee_003",
    studentId: "student_013",
    amount: 50000,
    paymentDate: "2026-09-08T09:00:00.000Z",
    reference: "LCA-PAY-00003",
    method: "Cash",
    status: "successful",
    receiptNumber: "RCP-2026-00003",
    createdAt: "2026-09-08T09:00:00.000Z",
  },

  // pay_004 (same fee_003) — Second instalment on Tuition (₦20,000)
  // Combined paid: ₦70,000 of ₦85,000 → fee remains "partial"
  {
    id: "pay_004",
    feeId: "fee_003",
    studentId: "student_013",
    amount: 20000,
    paymentDate: "2026-09-22T14:00:00.000Z",
    reference: "LCA-PAY-00004",
    method: "Bank Transfer",
    status: "successful",
    receiptNumber: "RCP-2026-00004",
    createdAt: "2026-09-22T14:00:00.000Z",
  },

  // ── Zainab Abdullahi (student_014) ────────────────────────────────────────

  // pay_005 — Full Tuition payment
  {
    id: "pay_005",
    feeId: "fee_005",
    studentId: "student_014",
    amount: 85000,
    paymentDate: "2026-09-05T08:45:00.000Z",
    reference: "LCA-PAY-00005",
    method: "Bank Transfer",
    status: "successful",
    receiptNumber: "RCP-2026-00005",
    createdAt: "2026-09-05T08:45:00.000Z",
  },

  // pay_006 — Full Books payment
  {
    id: "pay_006",
    feeId: "fee_006",
    studentId: "student_014",
    amount: 15000,
    paymentDate: "2026-09-05T08:50:00.000Z",
    reference: "LCA-PAY-00006",
    method: "Bank Transfer",
    status: "successful",
    receiptNumber: "RCP-2026-00006",
    createdAt: "2026-09-05T08:50:00.000Z",
  },

  // ── Ifeanyi Chukwu (student_015) ──────────────────────────────────────────

  // pay_007 — Full Tuition payment
  {
    id: "pay_007",
    feeId: "fee_009",
    studentId: "student_015",
    amount: 85000,
    paymentDate: "2026-09-11T15:20:00.000Z",
    reference: "LCA-PAY-00007",
    method: "Online",
    status: "successful",
    receiptNumber: "RCP-2026-00007",
    createdAt: "2026-09-11T15:20:00.000Z",
  },

  // ── Usman Ibrahim (student_002) ───────────────────────────────────────────

  // pay_008 — Partial Tuition payment before due date (₦30,000)
  // Balance of ₦55,000 remains unpaid → fee_007 status is "overdue"
  {
    id: "pay_008",
    feeId: "fee_007",
    studentId: "student_002",
    amount: 30000,
    paymentDate: "2026-09-17T12:00:00.000Z",
    reference: "LCA-PAY-00008",
    method: "Cash",
    status: "successful",
    receiptNumber: "RCP-2026-00008",
    createdAt: "2026-09-17T12:00:00.000Z",
  },
];

export default demoPayments;
