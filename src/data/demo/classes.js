/**
 * Laurel Children Academy — Demo seed data: Classes.
 *
 * 6 classes spanning the school's full academic range from Nursery
 * through Primary 6. Each class references the userId of its form
 * teacher via teacherId so the teacher portal can resolve the link.
 *
 * session — academic year in the format "YYYY/YYYY Term N"
 * capacity — maximum number of enrolled students
 * section  — used for classes that have multiple streams (A, B, etc.)
 *            Nursery / Reception classes have no section.
 */

const classes = [
  {
    id: "class_nur2",
    name: "Nursery 2",
    level: "Nursery",
    section: null,
    teacherId: "teacher_005", // Miss Grace Nwachukwu (form teacher)
    capacity: 20,
    session: "2025/2026",
    createdAt: "2025-09-01T09:00:00.000Z",
  },
  {
    id: "class_rec",
    name: "Reception",
    level: "Reception",
    section: null,
    teacherId: "teacher_004", // Mr Chukwuemeka Adeyemi (form teacher)
    capacity: 22,
    session: "2025/2026",
    createdAt: "2025-09-01T09:05:00.000Z",
  },
  {
    id: "class_pri1a",
    name: "Primary 1A",
    level: "Primary 1",
    section: "A",
    teacherId: "teacher_003", // secondary teacher — placeholder
    capacity: 25,
    session: "2025/2026",
    createdAt: "2025-09-01T09:10:00.000Z",
  },
  {
    id: "class_pri3a",
    name: "Primary 3A",
    level: "Primary 3",
    section: "A",
    teacherId: "teacher_002", // secondary teacher — placeholder
    capacity: 28,
    session: "2025/2026",
    createdAt: "2025-09-01T09:15:00.000Z",
  },
  {
    id: "class_pri5a",
    name: "Primary 5A",
    level: "Primary 5",
    section: "A",
    teacherId: "teacher_001", // Mrs Sarah Johnson — primary demo teacher
    capacity: 32,
    session: "2025/2026",
    createdAt: "2025-09-01T09:20:00.000Z",
  },
  {
    id: "class_pri6a",
    name: "Primary 6A",
    level: "Primary 6",
    section: "A",
    teacherId: "teacher_002", // secondary teacher — placeholder
    capacity: 30,
    session: "2025/2026",
    createdAt: "2025-09-01T09:25:00.000Z",
  },
];

export default classes;
