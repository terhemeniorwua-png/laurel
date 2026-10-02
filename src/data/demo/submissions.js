/**
 * Demo seed data — Submissions
 * Laurel Children Academy
 *
 * 15 submissions covering assignments asgn_001 through asgn_012.
 *
 * Aisha Ibrahim (student_001) has graded submissions for her first 6 assignments.
 * Other students (student_002 through student_006) have a mix of statuses.
 *
 * Statuses: graded | submitted | pending | late
 * Grade:    60–100 (number) or null if not yet graded / pending
 * Feedback: string or null
 */

const submissions = [
  // ── Aisha Ibrahim (student_001) — graded submissions ────────────────────────
  {
    id: "sub_001",
    assignmentId: "asgn_001",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-18T14:20:00.000Z",
    grade: 88,
    feedback:
      "Excellent effort, Aisha! Your working was clear and most fractions were correctly simplified. Watch the step where you flip the denominator when dividing — small error on question 14. Keep it up!",
    createdAt: "2026-09-18T14:20:00.000Z",
  },
  {
    id: "sub_002",
    assignmentId: "asgn_004",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-21T13:45:00.000Z",
    grade: 92,
    feedback:
      "A beautifully written essay, Aisha. Your descriptive language was vivid and your paragraphs were well organised. Your conclusion was particularly strong. Continue reading widely — it shows in your writing.",
    createdAt: "2026-09-21T13:45:00.000Z",
  },
  {
    id: "sub_003",
    assignmentId: "asgn_007",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-23T15:00:00.000Z",
    grade: 85,
    feedback:
      "Good experiment report. Your observations table was neatly drawn and your conclusion referenced the results correctly. Next time, include error analysis — mention what could have affected your results. Well done.",
    createdAt: "2026-09-23T15:00:00.000Z",
  },
  {
    id: "sub_004",
    assignmentId: "asgn_010",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-24T12:30:00.000Z",
    grade: 90,
    feedback:
      "Very good computer task. Your document was formatted correctly and the table was clean. The page number was in the right place. Practice your typing speed — you'll finish tasks even faster next term.",
    createdAt: "2026-09-24T12:30:00.000Z",
  },
  {
    id: "sub_005",
    assignmentId: "asgn_002",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-25T14:10:00.000Z",
    grade: 78,
    feedback:
      "Good attempt on decimal place value. The place-value chart was correct for most numbers. You missed writing two numbers in word form — always re-read the instructions before submitting.",
    createdAt: "2026-09-25T14:10:00.000Z",
  },
  {
    id: "sub_006",
    assignmentId: "asgn_005",
    studentId: "student_001",
    status: "graded",
    submittedAt: "2026-09-28T13:00:00.000Z",
    grade: 95,
    feedback:
      "Outstanding grammar exercise! You correctly identified all nouns and pronouns, and your original sentences were creative and accurate. This is one of the best submissions in the class. Well done, Aisha!",
    createdAt: "2026-09-28T13:00:00.000Z",
  },

  // ── Other students — mixed statuses ─────────────────────────────────────────

  // student_002: submitted (awaiting grade)
  {
    id: "sub_007",
    assignmentId: "asgn_001",
    studentId: "student_002",
    status: "submitted",
    submittedAt: "2026-09-19T09:05:00.000Z",
    grade: null,
    feedback: null,
    createdAt: "2026-09-19T09:05:00.000Z",
  },

  // student_002: graded
  {
    id: "sub_008",
    assignmentId: "asgn_004",
    studentId: "student_002",
    status: "graded",
    submittedAt: "2026-09-22T10:00:00.000Z",
    grade: 74,
    feedback:
      "Good essay with a clear structure. Try to use more descriptive adjectives to paint a picture for the reader. Your conclusion needs to be stronger — revisit it.",
    createdAt: "2026-09-22T10:00:00.000Z",
  },

  // student_003: late submission
  {
    id: "sub_009",
    assignmentId: "asgn_001",
    studentId: "student_003",
    status: "late",
    submittedAt: "2026-09-21T16:45:00.000Z",
    grade: 65,
    feedback:
      "Submission accepted but was two days late. Please ensure you manage your time and submit before the deadline. The working shown was mostly correct.",
    createdAt: "2026-09-21T16:45:00.000Z",
  },

  // student_003: graded on time
  {
    id: "sub_010",
    assignmentId: "asgn_007",
    studentId: "student_003",
    status: "graded",
    submittedAt: "2026-09-24T08:55:00.000Z",
    grade: 81,
    feedback:
      "Good experiment report. Your bar chart was clearly drawn. Make sure your aim is written as a question or clear statement next time.",
    createdAt: "2026-09-24T08:55:00.000Z",
  },

  // student_004: pending (has not submitted)
  {
    id: "sub_011",
    assignmentId: "asgn_002",
    studentId: "student_004",
    status: "pending",
    submittedAt: null,
    grade: null,
    feedback: null,
    createdAt: "2026-09-22T00:00:00.000Z",
  },

  // student_004: submitted
  {
    id: "sub_012",
    assignmentId: "asgn_005",
    studentId: "student_004",
    status: "submitted",
    submittedAt: "2026-09-29T11:30:00.000Z",
    grade: null,
    feedback: null,
    createdAt: "2026-09-29T11:30:00.000Z",
  },

  // student_005: graded
  {
    id: "sub_013",
    assignmentId: "asgn_010",
    studentId: "student_005",
    status: "graded",
    submittedAt: "2026-09-25T14:00:00.000Z",
    grade: 70,
    feedback:
      "Task completed. Your table was present but the header was not bolded and the footer page number was missing. Review the instructions carefully before finishing.",
    createdAt: "2026-09-25T14:00:00.000Z",
  },

  // student_005: late submission
  {
    id: "sub_014",
    assignmentId: "asgn_004",
    studentId: "student_005",
    status: "late",
    submittedAt: "2026-09-24T17:00:00.000Z",
    grade: 60,
    feedback:
      "Essay submitted two days after the deadline. Content is present but the essay was below the minimum word count. Please follow the instructions given for each assignment.",
    createdAt: "2026-09-24T17:00:00.000Z",
  },

  // student_006: pending
  {
    id: "sub_015",
    assignmentId: "asgn_007",
    studentId: "student_006",
    status: "pending",
    submittedAt: null,
    grade: null,
    feedback: null,
    createdAt: "2026-09-18T00:00:00.000Z",
  },
];

export default submissions;
