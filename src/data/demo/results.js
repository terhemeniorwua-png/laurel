/**
 * Laurel Children Academy — Demo seed data: Results.
 *
 * 20 academic results for the First Term, 2026/2027 session.
 *
 * Students covered
 * ────────────────
 *  student_001  Aisha Ibrahim   (class_pri5a) — 8 subjects (strong student)
 *  student_013  Seun Bankole    (class_pri5a) — 6 subjects (average student)
 *  student_014  Zainab Abdullahi (class_pri5a) — 6 subjects (good student)
 *
 * Subjects
 * ────────
 *  subj_eng   English Language
 *  subj_math  Mathematics
 *  subj_sci   Basic Science
 *  subj_soc   Social Studies
 *  subj_comp  Computer Studies
 *  subj_arts  Creative Arts
 *  subj_phe   Physical & Health Education
 *  subj_civic Civic Education
 *
 * Grading scale
 * ─────────────
 *  A  70 – 100  (Excellent)
 *  B  60 –  69  (Very Good)
 *  C  50 –  59  (Good)
 *  D  40 –  49  (Pass)
 *  F   0 –  39  (Fail)
 *
 * Scoring rules
 * ─────────────
 *  CA   max 40   (continuous assessment)
 *  Exam max 60
 *  Total = CA + Exam  (always verified to match)
 *
 * Teacher: Mrs. Sarah Johnson (teacher_001)
 */

/** @type {Array<Object>} */
const demoResults = [
  // ════════════════════════════════════════════════════════════════════════════
  // Aisha Ibrahim (student_001) — Primary 5A — strong, mostly A & B
  // ════════════════════════════════════════════════════════════════════════════

  // res_001 — English Language
  {
    id: "res_001",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    session: "2026/2027",
    term: "First Term",
    ca: 36,
    exam: 52,
    total: 88, // 36 + 52
    grade: "A",
    position: 1,
    teacherComment:
      "Aisha demonstrates outstanding command of English. Her written compositions show clarity, creativity, and maturity well beyond her age group. Keep it up!",
    createdAt: "2026-10-01T09:00:00.000Z",
  },

  // res_002 — Mathematics
  {
    id: "res_002",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_math",
    session: "2026/2027",
    term: "First Term",
    ca: 38,
    exam: 54,
    total: 92, // 38 + 54
    grade: "A",
    position: 1,
    teacherComment:
      "Excellent performance. Aisha solves multi-step problems with speed and accuracy. She should continue practising mental arithmetic to maintain her edge.",
    createdAt: "2026-10-01T09:05:00.000Z",
  },

  // res_003 — Basic Science
  {
    id: "res_003",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_sci",
    session: "2026/2027",
    term: "First Term",
    ca: 35,
    exam: 50,
    total: 85, // 35 + 50
    grade: "A",
    position: 2,
    teacherComment:
      "Aisha shows a genuine curiosity for science. Her lab observations are thorough and her reports are well-written. A very commendable result.",
    createdAt: "2026-10-01T09:10:00.000Z",
  },

  // res_004 — Social Studies
  {
    id: "res_004",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_soc",
    session: "2026/2027",
    term: "First Term",
    ca: 34,
    exam: 48,
    total: 82, // 34 + 48
    grade: "A",
    position: 1,
    teacherComment:
      "A strong grasp of social issues and community values. Aisha participates actively in class discussions and her project work is always well-researched.",
    createdAt: "2026-10-01T09:15:00.000Z",
  },

  // res_005 — Computer Studies
  {
    id: "res_005",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_comp",
    session: "2026/2027",
    term: "First Term",
    ca: 37,
    exam: 49,
    total: 86, // 37 + 49
    grade: "A",
    position: 1,
    teacherComment:
      "Aisha is one of the most technically proficient students in the class. She grasps new concepts quickly and is always willing to assist her peers.",
    createdAt: "2026-10-01T09:20:00.000Z",
  },

  // res_006 — Creative Arts
  {
    id: "res_006",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_arts",
    session: "2026/2027",
    term: "First Term",
    ca: 32,
    exam: 43,
    total: 75, // 32 + 43
    grade: "A",
    position: 3,
    teacherComment:
      "Aisha brings imagination and effort to every creative task. Her artwork is expressive and original. Continued practice will further develop her natural talent.",
    createdAt: "2026-10-01T09:25:00.000Z",
  },

  // res_007 — Physical & Health Education
  {
    id: "res_007",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_phe",
    session: "2026/2027",
    term: "First Term",
    ca: 33,
    exam: 44,
    total: 77, // 33 + 44
    grade: "A",
    position: 2,
    teacherComment:
      "Aisha is active, disciplined, and shows great team spirit. She consistently demonstrates good physical fitness and a positive attitude during PE sessions.",
    createdAt: "2026-10-01T09:30:00.000Z",
  },

  // res_008 — Civic Education
  {
    id: "res_008",
    studentId: "student_001",
    classId: "class_pri5a",
    subjectId: "subj_civic",
    session: "2026/2027",
    term: "First Term",
    ca: 30,
    exam: 36,
    total: 66, // 30 + 36
    grade: "B",
    position: 4,
    teacherComment:
      "Good understanding of civic responsibilities. Aisha engages thoughtfully with topics on governance and community. A little more focus during revision will push this to an A.",
    createdAt: "2026-10-01T09:35:00.000Z",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // Seun Bankole (student_013) — Primary 5A — average performer
  // ════════════════════════════════════════════════════════════════════════════

  // res_009 — English Language
  {
    id: "res_009",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    session: "2026/2027",
    term: "First Term",
    ca: 24,
    exam: 34,
    total: 58, // 24 + 34
    grade: "C",
    position: 7,
    teacherComment:
      "Seun has a decent foundation but needs to focus more on comprehension and essay structure. Regular reading will help him improve significantly next term.",
    createdAt: "2026-10-01T09:40:00.000Z",
  },

  // res_010 — Mathematics
  {
    id: "res_010",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_math",
    session: "2026/2027",
    term: "First Term",
    ca: 27,
    exam: 38,
    total: 65, // 27 + 38
    grade: "B",
    position: 5,
    teacherComment:
      "Good improvement this term. Seun performs well in number work but should spend more time on word problems. Keep up the positive effort.",
    createdAt: "2026-10-01T09:45:00.000Z",
  },

  // res_011 — Basic Science
  {
    id: "res_011",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_sci",
    session: "2026/2027",
    term: "First Term",
    ca: 22,
    exam: 30,
    total: 52, // 22 + 30
    grade: "C",
    position: 9,
    teacherComment:
      "Seun shows interest in science practicals but needs to improve his theoretical knowledge. Consistent study of the textbook will make a big difference.",
    createdAt: "2026-10-01T09:50:00.000Z",
  },

  // res_012 — Social Studies
  {
    id: "res_012",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_soc",
    session: "2026/2027",
    term: "First Term",
    ca: 25,
    exam: 35,
    total: 60, // 25 + 35
    grade: "B",
    position: 6,
    teacherComment:
      "Satisfactory performance. Seun contributes meaningfully to class discussions. He should work on his written responses to improve further.",
    createdAt: "2026-10-01T09:55:00.000Z",
  },

  // res_013 — Computer Studies
  {
    id: "res_013",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_comp",
    session: "2026/2027",
    term: "First Term",
    ca: 28,
    exam: 40,
    total: 68, // 28 + 40
    grade: "B",
    position: 4,
    teacherComment:
      "Seun is enthusiastic about computer studies and it shows in his practical scores. Strengthening his theory will help him break into the top three.",
    createdAt: "2026-10-01T10:00:00.000Z",
  },

  // res_014 — Creative Arts
  {
    id: "res_014",
    studentId: "student_013",
    classId: "class_pri5a",
    subjectId: "subj_arts",
    session: "2026/2027",
    term: "First Term",
    ca: 20,
    exam: 28,
    total: 48, // 20 + 28
    grade: "D",
    position: 11,
    teacherComment:
      "Seun has potential in visual art but needs to commit more time to his projects. Submitting complete work on time will greatly improve his overall grade.",
    createdAt: "2026-10-01T10:05:00.000Z",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // Zainab Abdullahi (student_014) — Primary 5A — good performer
  // ════════════════════════════════════════════════════════════════════════════

  // res_015 — English Language
  {
    id: "res_015",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    session: "2026/2027",
    term: "First Term",
    ca: 33,
    exam: 46,
    total: 79, // 33 + 46
    grade: "A",
    position: 2,
    teacherComment:
      "Zainab writes with confidence and reads widely. Her vocabulary and comprehension skills are impressive. An excellent result — well earned.",
    createdAt: "2026-10-01T10:10:00.000Z",
  },

  // res_016 — Mathematics
  {
    id: "res_016",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_math",
    session: "2026/2027",
    term: "First Term",
    ca: 30,
    exam: 42,
    total: 72, // 30 + 42
    grade: "A",
    position: 3,
    teacherComment:
      "Zainab has a solid understanding of mathematical concepts. She works carefully and checks her work. A very pleasing result this term.",
    createdAt: "2026-10-01T10:15:00.000Z",
  },

  // res_017 — Basic Science
  {
    id: "res_017",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_sci",
    session: "2026/2027",
    term: "First Term",
    ca: 29,
    exam: 40,
    total: 69, // 29 + 40
    grade: "B",
    position: 4,
    teacherComment:
      "Good scientific reasoning and neat experimental records. Zainab would benefit from reviewing her theory notes before exams to push her score even higher.",
    createdAt: "2026-10-01T10:20:00.000Z",
  },

  // res_018 — Social Studies
  {
    id: "res_018",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_soc",
    session: "2026/2027",
    term: "First Term",
    ca: 31,
    exam: 44,
    total: 75, // 31 + 44
    grade: "A",
    position: 2,
    teacherComment:
      "Zainab demonstrates a strong awareness of social and cultural issues. Her project presentations are well-organised and confidently delivered.",
    createdAt: "2026-10-01T10:25:00.000Z",
  },

  // res_019 — Computer Studies
  {
    id: "res_019",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_comp",
    session: "2026/2027",
    term: "First Term",
    ca: 28,
    exam: 38,
    total: 66, // 28 + 38
    grade: "B",
    position: 3,
    teacherComment:
      "Zainab is careful and methodical in computer practicals. She should practise typing speed and explore software features independently to further develop her skills.",
    createdAt: "2026-10-01T10:30:00.000Z",
  },

  // res_020 — Creative Arts
  {
    id: "res_020",
    studentId: "student_014",
    classId: "class_pri5a",
    subjectId: "subj_arts",
    session: "2026/2027",
    term: "First Term",
    ca: 35,
    exam: 47,
    total: 82, // 35 + 47
    grade: "A",
    position: 1,
    teacherComment:
      "Outstanding creative work! Zainab's artwork stands out for its originality, use of colour, and attention to detail. She is a natural artist — truly exceptional this term.",
    createdAt: "2026-10-01T10:35:00.000Z",
  },
];

export default demoResults;
