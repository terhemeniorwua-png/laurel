/**
 * Laurel Children Academy — Demo seed data: Messages.
 *
 * 12 messages between teachers, parents, principal, admin, and bursar.
 *
 * Participant reference
 * ─────────────────────
 *  user_001   Admin User              (admin)
 *  user_002   Dr. Emmanuel Okafor     (principal)
 *  user_003   Mrs. Sarah Johnson      (teacher — teacher_001)
 *  user_004   Mr. Chukwuemeka Adeyemi (teacher)
 *  user_005   Mrs. Fatima Ibrahim     (parent — parent_001, Aisha's mother)
 *  user_009   Mrs. Blessing Okonkwo   (bursar)
 *  user_010   Miss. Grace Nwachukwu   (teacher)
 *
 * Thread overview
 * ───────────────
 *  msg_001  teacher_001 → parent_001     Aisha's weekly progress (unread)
 *  msg_002  parent_001  → teacher_001    Homework query (unread)
 *  msg_003  teacher_001 → parent_001     Homework reply (read)
 *  msg_004  user_001    → user_003       Staff meeting notice
 *  msg_005  user_002    → user_003       Principal's staff memo
 *  msg_006  user_002    → user_004       Principal's staff memo (copy)
 *  msg_007  user_002    → user_010       Principal's staff memo (copy)
 *  msg_008  user_002    → user_001       Principal → Admin, term report reminder
 *  msg_009  user_009    → user_005       Bursar fee reminder to parent_001
 *  msg_010  user_005    → user_009       Parent reply to bursar
 *  msg_011  user_002    → user_003       Classroom inspection notice
 *  msg_012  user_001    → user_002       Admin → Principal, IT upgrade notice
 */

/** @type {Array<Object>} */
const demoMessages = [
  // ── Teacher → Parent: Aisha's progress ────────────────────────────────────

  {
    id: "msg_001",
    senderId: "user_003",   // Mrs. Sarah Johnson (teacher_001)
    recipientId: "user_005", // Mrs. Fatima Ibrahim (parent_001)
    subject: "Aisha's Progress This Week",
    content:
      "Dear Mrs. Ibrahim,\n\nI hope this message finds you well. I wanted to share some wonderful news about Aisha's performance this week.\n\nShe scored the highest mark in our Mathematics mid-term assessment and produced an outstanding essay for English class. Her attitude in class continues to be exemplary — she is focused, respectful, and always willing to support her classmates.\n\nI believe she is on course for an excellent First Term result. Please do keep encouraging her at home; it is clearly making a difference.\n\nWarm regards,\nMrs. Sarah Johnson\nClass Teacher, Primary 5A",
    read: false,
    createdAt: "2026-09-29T10:00:00.000Z",
  },

  // ── Parent → Teacher: Homework query ──────────────────────────────────────

  {
    id: "msg_002",
    senderId: "user_005",   // Mrs. Fatima Ibrahim (parent_001)
    recipientId: "user_003", // Mrs. Sarah Johnson (teacher_001)
    subject: "Question About This Week's Homework",
    content:
      "Good afternoon, Mrs. Johnson,\n\nThank you for the kind update about Aisha — we are so proud of her!\n\nI am reaching out because Aisha mentioned that the Mathematics homework this week involves word problems that she found a little confusing, particularly the section on multiplication of fractions.\n\nCould you kindly clarify whether she should show her full working or if a short answer is acceptable? I want to make sure she submits it correctly.\n\nThank you for your time and continued support.\n\nKind regards,\nMrs. Fatima Ibrahim",
    read: false,
    createdAt: "2026-09-29T17:45:00.000Z",
  },

  // ── Teacher → Parent: Homework reply ──────────────────────────────────────

  {
    id: "msg_003",
    senderId: "user_003",   // Mrs. Sarah Johnson (teacher_001)
    recipientId: "user_005", // Mrs. Fatima Ibrahim (parent_001)
    subject: "Re: Question About This Week's Homework",
    content:
      "Dear Mrs. Ibrahim,\n\nThank you for reaching out — it is always great to hear from engaged parents!\n\nFor this particular assignment, Aisha should show her full working step by step. This helps me see her reasoning and award method marks even if the final answer has a small error.\n\nPlease remind her to label each step clearly: what she knows, the method she is applying, and her final answer. She can refer to pages 58–60 of her Mathematics workbook for the format.\n\nDo not hesitate to message me if anything else is unclear.\n\nBest wishes,\nMrs. Sarah Johnson",
    read: true,
    createdAt: "2026-09-30T08:20:00.000Z",
  },

  // ── Admin → Teacher: Staff meeting ────────────────────────────────────────

  {
    id: "msg_004",
    senderId: "user_001",   // Admin User
    recipientId: "user_003", // Mrs. Sarah Johnson (teacher_001)
    subject: "Staff Meeting — Friday 3rd October",
    content:
      "Dear Mrs. Johnson,\n\nThis is a reminder that the weekly staff meeting is scheduled for Friday, 3rd October 2026 at 1:00 PM in the Staff Common Room.\n\nAgenda items include:\n\n1. First Term assessment update\n2. Upcoming Sports Day arrangements\n3. New homework submission policy\n4. Any other business\n\nKindly ensure you bring your class register and any pending result sheets.\n\nThank you,\nAdmin Office\nLaurel Children Academy",
    read: true,
    createdAt: "2026-10-01T07:30:00.000Z",
  },

  // ── Principal → Teachers (staff memo broadcast) ───────────────────────────

  {
    id: "msg_005",
    senderId: "user_002",   // Dr. Emmanuel Okafor (principal)
    recipientId: "user_003", // Mrs. Sarah Johnson
    subject: "First Term Result Submission Deadline — All Teaching Staff",
    content:
      "Dear Teaching Staff,\n\nAs we approach the end of First Term, I wish to remind all subject teachers that academic results must be fully entered into the school portal no later than Friday, 10th October 2026.\n\nPlease ensure the following are completed before the deadline:\n\n• Continuous assessment scores (max 40)\n• Examination scores (max 60)\n• Teacher comments for each student\n• Class positions (to be confirmed after all scores are entered)\n\nReport cards will be generated and distributed on the last day of term. Late submissions will delay printing and cause unnecessary inconvenience to parents.\n\nThank you for your cooperation.\n\nDr. Emmanuel Okafor\nPrincipal, Laurel Children Academy",
    read: true,
    createdAt: "2026-10-01T08:00:00.000Z",
  },
  {
    id: "msg_006",
    senderId: "user_002",   // Dr. Emmanuel Okafor (principal)
    recipientId: "user_004", // Mr. Chukwuemeka Adeyemi
    subject: "First Term Result Submission Deadline — All Teaching Staff",
    content:
      "Dear Teaching Staff,\n\nAs we approach the end of First Term, I wish to remind all subject teachers that academic results must be fully entered into the school portal no later than Friday, 10th October 2026.\n\nPlease ensure the following are completed before the deadline:\n\n• Continuous assessment scores (max 40)\n• Examination scores (max 60)\n• Teacher comments for each student\n• Class positions (to be confirmed after all scores are entered)\n\nReport cards will be generated and distributed on the last day of term. Late submissions will delay printing and cause unnecessary inconvenience to parents.\n\nThank you for your cooperation.\n\nDr. Emmanuel Okafor\nPrincipal, Laurel Children Academy",
    read: false,
    createdAt: "2026-10-01T08:01:00.000Z",
  },
  {
    id: "msg_007",
    senderId: "user_002",   // Dr. Emmanuel Okafor (principal)
    recipientId: "user_010", // Miss. Grace Nwachukwu
    subject: "First Term Result Submission Deadline — All Teaching Staff",
    content:
      "Dear Teaching Staff,\n\nAs we approach the end of First Term, I wish to remind all subject teachers that academic results must be fully entered into the school portal no later than Friday, 10th October 2026.\n\nPlease ensure the following are completed before the deadline:\n\n• Continuous assessment scores (max 40)\n• Examination scores (max 60)\n• Teacher comments for each student\n• Class positions (to be confirmed after all scores are entered)\n\nReport cards will be generated and distributed on the last day of term. Late submissions will delay printing and cause unnecessary inconvenience to parents.\n\nThank you for your cooperation.\n\nDr. Emmanuel Okafor\nPrincipal, Laurel Children Academy",
    read: false,
    createdAt: "2026-10-01T08:02:00.000Z",
  },

  // ── Principal → Admin: Term report ────────────────────────────────────────

  {
    id: "msg_008",
    senderId: "user_002",   // Dr. Emmanuel Okafor (principal)
    recipientId: "user_001", // Admin User
    subject: "End-of-Term Statistical Report",
    content:
      "Dear Admin,\n\nKindly prepare the end-of-term statistical report covering enrolment figures, attendance rates, and outstanding fee balances.\n\nThe report should be ready by Wednesday, 8th October so that I can review it before the Governing Board meeting on Thursday.\n\nPlease extract data from the portal and format it as a summary table. If you encounter any data discrepancies, flag them to me immediately.\n\nThank you,\nDr. Emmanuel Okafor",
    read: true,
    createdAt: "2026-10-01T09:00:00.000Z",
  },

  // ── Bursar → Parent: Fee reminder ─────────────────────────────────────────

  {
    id: "msg_009",
    senderId: "user_009",   // Mrs. Blessing Okonkwo (bursar)
    recipientId: "user_005", // Mrs. Fatima Ibrahim (parent_001)
    subject: "Outstanding Books Fee — Aisha Ibrahim (LCA/2024/0001)",
    content:
      "Dear Mrs. Ibrahim,\n\nThis is a friendly reminder from the Finance Office regarding an outstanding balance on Aisha's Books fee for First Term 2026/2027.\n\nFee Summary:\n  Books Fee:        ₦15,000\n  Amount Paid:       ₦8,000\n  Outstanding:       ₦7,000\n  Due Date:   19 September 2026\n\nKindly settle the outstanding balance at your earliest convenience to avoid disruption to Aisha's learning materials.\n\nPayments can be made via bank transfer to our school account or in person at the Finance Office during school hours (Monday – Friday, 8:00 AM – 3:00 PM).\n\nAccount Name: Laurel Children Academy\nBank: First Bank Nigeria\nAccount No: 3012456789\n\nPlease quote Aisha's admission number (LCA/2024/0001) as the payment reference.\n\nThank you for your cooperation.\n\nMrs. Blessing Okonkwo\nBursar, Laurel Children Academy",
    read: false,
    createdAt: "2026-09-26T09:00:00.000Z",
  },

  // ── Parent → Bursar: Reply ─────────────────────────────────────────────────

  {
    id: "msg_010",
    senderId: "user_005",   // Mrs. Fatima Ibrahim (parent_001)
    recipientId: "user_009", // Mrs. Blessing Okonkwo (bursar)
    subject: "Re: Outstanding Books Fee — Aisha Ibrahim (LCA/2024/0001)",
    content:
      "Good morning, Mrs. Okonkwo,\n\nThank you for the reminder. I apologise for the delay in settling the balance.\n\nI will make the remaining payment of ₦7,000 via bank transfer by Friday, 3rd October. I will send a screenshot of the payment confirmation to the Finance Office immediately after the transfer.\n\nKindly confirm receipt once it is processed.\n\nKind regards,\nMrs. Fatima Ibrahim",
    read: true,
    createdAt: "2026-09-26T11:30:00.000Z",
  },

  // ── Principal → Teacher: Classroom inspection ─────────────────────────────

  {
    id: "msg_011",
    senderId: "user_002",   // Dr. Emmanuel Okafor (principal)
    recipientId: "user_003", // Mrs. Sarah Johnson
    subject: "Classroom Inspection — Primary 5A (Wednesday)",
    content:
      "Dear Mrs. Johnson,\n\nPlease be informed that I will be conducting a routine classroom inspection of Primary 5A this Wednesday, 7th October, during the 10:30 AM session.\n\nThis is a standard end-of-term quality check. Please ensure your lesson plan, attendance register, and student exercise books are available for review.\n\nThere is nothing to be concerned about — I simply want to observe best practices in action before we close the term.\n\nThank you,\nDr. Emmanuel Okafor",
    read: false,
    createdAt: "2026-10-02T08:00:00.000Z",
  },

  // ── Admin → Principal: IT upgrade ─────────────────────────────────────────

  {
    id: "msg_012",
    senderId: "user_001",   // Admin User
    recipientId: "user_002", // Dr. Emmanuel Okafor (principal)
    subject: "IT Infrastructure Upgrade — Scheduled Downtime Notice",
    content:
      "Dear Dr. Okafor,\n\nI wish to bring to your attention that our IT service provider has scheduled a system maintenance window for Saturday, 4th October 2026 between 10:00 PM and 2:00 AM.\n\nDuring this window, the school portal may be temporarily unavailable. No data will be lost — this is a routine upgrade to improve portal performance and security.\n\nI will send a notice to all staff and parents via the announcements board.\n\nKindly approve this communication before I publish it.\n\nThank you,\nAdmin Office",
    read: false,
    createdAt: "2026-10-02T10:00:00.000Z",
  },
];

export default demoMessages;
