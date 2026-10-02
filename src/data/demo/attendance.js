/**
 * Demo seed data — Attendance
 * Laurel Children Academy
 *
 * 30 records covering the last 2 full school weeks of September 2026:
 *   Week 1: Mon 14 – Fri 18 September 2026
 *   Week 2: Mon 21 – Fri 25 September 2026
 *   (10 school days total, Monday–Friday)
 *
 * Students covered (class_pri5a):
 *   student_001  Aisha Ibrahim    — 10 days (absent on 2026-09-23)
 *   student_002  Emeka Okafor     — 10 days
 *   student_003  Fatima Bello     —  5 days (Week 2 only)
 *   student_004  Daniel Adeyemi   —  5 days (Week 1 only)
 *
 * Marked by: Sarah Johnson (teacher_001)
 */

const attendance = [
  // ────────────────────────────────────────────────────────────────────────────
  // WEEK 1 — 14 September 2026 (Monday) to 18 September 2026 (Friday)
  // ────────────────────────────────────────────────────────────────────────────

  // Monday 14 Sep
  {
    id: "att_001",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-14",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-14T08:10:00.000Z",
  },
  {
    id: "att_002",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-14",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-14T08:10:00.000Z",
  },
  {
    id: "att_003",
    studentId: "student_004",
    classId: "class_pri5a",
    date: "2026-09-14",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-14T08:10:00.000Z",
  },

  // Tuesday 15 Sep
  {
    id: "att_004",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-15",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-15T08:10:00.000Z",
  },
  {
    id: "att_005",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-15",
    status: "late",
    markedBy: "teacher_001",
    createdAt: "2026-09-15T08:10:00.000Z",
  },
  {
    id: "att_006",
    studentId: "student_004",
    classId: "class_pri5a",
    date: "2026-09-15",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-15T08:10:00.000Z",
  },

  // Wednesday 16 Sep
  {
    id: "att_007",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-16",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-16T08:10:00.000Z",
  },
  {
    id: "att_008",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-16",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-16T08:10:00.000Z",
  },
  {
    id: "att_009",
    studentId: "student_004",
    classId: "class_pri5a",
    date: "2026-09-16",
    status: "excused",
    markedBy: "teacher_001",
    createdAt: "2026-09-16T08:10:00.000Z",
  },

  // Thursday 17 Sep
  {
    id: "att_010",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-17",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-17T08:10:00.000Z",
  },
  {
    id: "att_011",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-17",
    status: "absent",
    markedBy: "teacher_001",
    createdAt: "2026-09-17T08:10:00.000Z",
  },
  {
    id: "att_012",
    studentId: "student_004",
    classId: "class_pri5a",
    date: "2026-09-17",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-17T08:10:00.000Z",
  },

  // Friday 18 Sep
  {
    id: "att_013",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-18",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-18T08:10:00.000Z",
  },
  {
    id: "att_014",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-18",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-18T08:10:00.000Z",
  },
  {
    id: "att_015",
    studentId: "student_004",
    classId: "class_pri5a",
    date: "2026-09-18",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-18T08:10:00.000Z",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // WEEK 2 — 21 September 2026 (Monday) to 25 September 2026 (Friday)
  // ────────────────────────────────────────────────────────────────────────────

  // Monday 21 Sep
  {
    id: "att_016",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-21",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-21T08:10:00.000Z",
  },
  {
    id: "att_017",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-21",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-21T08:10:00.000Z",
  },
  {
    id: "att_018",
    studentId: "student_003",
    classId: "class_pri5a",
    date: "2026-09-21",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-21T08:10:00.000Z",
  },

  // Tuesday 22 Sep
  {
    id: "att_019",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-22",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-22T08:10:00.000Z",
  },
  {
    id: "att_020",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-22",
    status: "late",
    markedBy: "teacher_001",
    createdAt: "2026-09-22T08:10:00.000Z",
  },
  {
    id: "att_021",
    studentId: "student_003",
    classId: "class_pri5a",
    date: "2026-09-22",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-22T08:10:00.000Z",
  },

  // Wednesday 23 Sep — Aisha is ABSENT this day
  {
    id: "att_022",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-23",
    status: "absent",
    markedBy: "teacher_001",
    createdAt: "2026-09-23T08:10:00.000Z",
  },
  {
    id: "att_023",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-23",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-23T08:10:00.000Z",
  },
  {
    id: "att_024",
    studentId: "student_003",
    classId: "class_pri5a",
    date: "2026-09-23",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-23T08:10:00.000Z",
  },

  // Thursday 24 Sep
  {
    id: "att_025",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-24",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-24T08:10:00.000Z",
  },
  {
    id: "att_026",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-24",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-24T08:10:00.000Z",
  },
  {
    id: "att_027",
    studentId: "student_003",
    classId: "class_pri5a",
    date: "2026-09-24",
    status: "excused",
    markedBy: "teacher_001",
    createdAt: "2026-09-24T08:10:00.000Z",
  },

  // Friday 25 Sep
  {
    id: "att_028",
    studentId: "student_001",
    classId: "class_pri5a",
    date: "2026-09-25",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-25T08:10:00.000Z",
  },
  {
    id: "att_029",
    studentId: "student_002",
    classId: "class_pri5a",
    date: "2026-09-25",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-25T08:10:00.000Z",
  },
  {
    id: "att_030",
    studentId: "student_003",
    classId: "class_pri5a",
    date: "2026-09-25",
    status: "present",
    markedBy: "teacher_001",
    createdAt: "2026-09-25T08:10:00.000Z",
  },
];

export default attendance;
