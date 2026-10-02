/**
 * Laurel Children Academy — Demo seed data: Notifications.
 *
 * 18 notifications spread across four user accounts:
 *
 *   user_007  — Aisha Bello (Student, Primary 5A)
 *   user_005  — Mr. Emeka Bello (Aisha's Parent)
 *   user_003  — Mrs. Fatima Williams (Teacher, Primary 5A)
 *   user_001  — Administrator
 *
 * Fields:
 *   id          — unique string ID (notif_001 … notif_018)
 *   userId      — the user this notification belongs to
 *   type        — assignment | attendance | result | payment |
 *                 announcement | message | event | admission
 *   title       — short notification heading
 *   message     — full notification body
 *   read        — boolean; mix of read and unread
 *   link        — null (will be wired up when portal routes exist)
 *   createdAt   — ISO 8601 datetime string
 */

export const demoNotifications = [
  // ── user_007 · Aisha Bello (Student) ─────────────────────────────────────

  // New assignment posted (3)
  {
    id: "notif_001",
    userId: "user_007",
    type: "assignment",
    title: "New Assignment: Mathematics",
    message:
      "Mrs. Williams has posted a new assignment — 'Fractions & Decimals Practice'. It is due on Friday, 9 October 2026. Open your assignments tab to begin.",
    read: true,
    link: null,
    createdAt: "2026-10-01T08:15:00.000Z",
  },
  {
    id: "notif_002",
    userId: "user_007",
    type: "assignment",
    title: "New Assignment: English Language",
    message:
      "A new English Language assignment has been posted — 'Comprehension Passage: The River Niger'. Submission deadline is Wednesday, 7 October 2026.",
    read: true,
    link: null,
    createdAt: "2026-09-29T09:00:00.000Z",
  },
  {
    id: "notif_003",
    userId: "user_007",
    type: "assignment",
    title: "New Assignment: Basic Science",
    message:
      "Mrs. Williams has posted a Basic Science assignment — 'States of Matter'. Please submit your work before Monday, 12 October 2026.",
    read: false,
    link: null,
    createdAt: "2026-10-02T07:45:00.000Z",
  },

  // Graded assignment (2)
  {
    id: "notif_004",
    userId: "user_007",
    type: "result",
    title: "Assignment Graded: Mathematics",
    message:
      "Your Mathematics assignment 'Whole Numbers & Place Value' has been graded. You scored 18/20. Well done! Check your results for teacher comments.",
    read: true,
    link: null,
    createdAt: "2026-09-26T14:30:00.000Z",
  },
  {
    id: "notif_005",
    userId: "user_007",
    type: "result",
    title: "Assignment Graded: Social Studies",
    message:
      "Your Social Studies assignment 'The Three Tiers of Government' has been graded. You scored 15/20. Review the teacher's feedback in your results tab.",
    read: false,
    link: null,
    createdAt: "2026-09-30T11:00:00.000Z",
  },

  // Attendance absent warning (1)
  {
    id: "notif_006",
    userId: "user_007",
    type: "attendance",
    title: "Attendance Notice: Absence Recorded",
    message:
      "You were marked absent on Thursday, 1 October 2026. If this was an error or you have a valid reason, please speak to your class teacher or visit the school office.",
    read: false,
    link: null,
    createdAt: "2026-10-01T13:00:00.000Z",
  },

  // ── user_005 · Mr. Emeka Bello (Parent) ──────────────────────────────────

  // Payment received (1)
  {
    id: "notif_007",
    userId: "user_005",
    type: "payment",
    title: "Payment Received — ₦50,000",
    message:
      "A school fee payment of ₦50,000 has been recorded on your account for Aisha Bello (Primary 5A). Your outstanding balance is now ₦65,000. Thank you.",
    read: true,
    link: null,
    createdAt: "2026-09-25T10:20:00.000Z",
  },

  // Fee reminder (1)
  {
    id: "notif_008",
    userId: "user_005",
    type: "payment",
    title: "Fee Reminder: Outstanding Balance",
    message:
      "This is a reminder that an outstanding school fee balance of ₦65,000 remains for Aisha Bello for the 2026/2027 First Term. Please visit the school bursar or make a payment before 15 October 2026 to avoid a late fee.",
    read: false,
    link: null,
    createdAt: "2026-10-01T08:00:00.000Z",
  },

  // New announcement (2)
  {
    id: "notif_009",
    userId: "user_005",
    type: "announcement",
    title: "Announcement: PTA Meeting — October",
    message:
      "The Parent-Teacher Association (PTA) meeting for October is scheduled for Saturday, 17 October 2026 at 10:00 AM in the school hall. Attendance of all parents and guardians is strongly encouraged.",
    read: true,
    link: null,
    createdAt: "2026-09-28T09:30:00.000Z",
  },
  {
    id: "notif_010",
    userId: "user_005",
    type: "announcement",
    title: "Announcement: Sports Day — Save the Date",
    message:
      "Laurel Children Academy Sports Day is confirmed for Friday, 24 October 2026. Parents are warmly invited to cheer on their children. More details will follow closer to the date.",
    read: false,
    link: null,
    createdAt: "2026-10-02T07:00:00.000Z",
  },

  // Teacher message (1)
  {
    id: "notif_011",
    userId: "user_005",
    type: "message",
    title: "Message from Mrs. Williams",
    message:
      "Good afternoon. I wanted to let you know that Aisha has shown excellent progress in Mathematics this week. Her participation in class has improved noticeably, and her last assignment was outstanding. Keep encouraging her at home.",
    read: false,
    link: null,
    createdAt: "2026-10-02T13:15:00.000Z",
  },

  // ── user_003 · Mrs. Fatima Williams (Teacher) ─────────────────────────────

  // Submission received (2)
  {
    id: "notif_012",
    userId: "user_003",
    type: "assignment",
    title: "Assignment Submitted: Chidi Okafor",
    message:
      "Chidi Okafor (Primary 5A) has submitted the Mathematics assignment 'Fractions & Decimals Practice'. You can review and grade it from your assignments panel.",
    read: true,
    link: null,
    createdAt: "2026-10-01T16:45:00.000Z",
  },
  {
    id: "notif_013",
    userId: "user_003",
    type: "assignment",
    title: "Assignment Submitted: Zainab Musa",
    message:
      "Zainab Musa (Primary 5A) has submitted the Mathematics assignment 'Fractions & Decimals Practice'. You now have 28 out of 32 submissions. Please review when ready.",
    read: false,
    link: null,
    createdAt: "2026-10-02T09:10:00.000Z",
  },

  // Staff announcement (1)
  {
    id: "notif_014",
    userId: "user_003",
    type: "announcement",
    title: "Staff Notice: End-of-Term Report Deadline",
    message:
      "All teachers are reminded to submit first term continuous assessment scores and report card comments by Friday, 28 November 2026. Please contact the principal's office if you require assistance.",
    read: false,
    link: null,
    createdAt: "2026-10-01T08:30:00.000Z",
  },

  // ── user_001 · Administrator ──────────────────────────────────────────────

  // New admission application (3)
  {
    id: "notif_015",
    userId: "user_001",
    type: "admission",
    title: "New Admission Application Received",
    message:
      "A new admission application has been submitted by Mrs. Ngozi Adeyemi for her child Tomiwa Adeyemi (desired class: Primary 1) for the 2027/2028 academic session. Please review it in the Admissions panel.",
    read: true,
    link: null,
    createdAt: "2026-09-30T14:00:00.000Z",
  },
  {
    id: "notif_016",
    userId: "user_001",
    type: "admission",
    title: "New Admission Application Received",
    message:
      "A new admission application has been submitted by Mr. Biodun Ogunleye for his child Simi Ogunleye (desired class: Primary 3) for the 2027/2028 academic session. Pending review.",
    read: true,
    link: null,
    createdAt: "2026-10-01T10:45:00.000Z",
  },
  {
    id: "notif_017",
    userId: "user_001",
    type: "admission",
    title: "New Admission Application Received",
    message:
      "A new admission application has been submitted by Mrs. Chioma Nwosu for her child Obinna Nwosu (desired class: Early Years / Nursery 2) for the 2027/2028 session. Three applications are now awaiting review.",
    read: false,
    link: null,
    createdAt: "2026-10-02T11:30:00.000Z",
  },
  {
    id: "notif_018",
    userId: "user_001",
    type: "announcement",
    title: "System: Demo Data Loaded Successfully",
    message:
      "Laurel Children Academy demo data has been seeded successfully. All demo accounts, students, teachers, classes, assignments, attendance records, results, payments, and announcements are ready for demonstration.",
    read: false,
    link: null,
    createdAt: "2026-10-02T07:00:00.000Z",
  },
];

export default demoNotifications;
