/**
 * Laurel Children Academy — Demo seed data: Teachers.
 *
 * 5 teacher profiles that complement the user seed.
 * Each teacher links back to their user account via userId.
 *
 * teacher_001 — Mrs Sarah Johnson
 *   The primary demo teacher account (email: teacher@laurelacademy.edu).
 *   Form teacher of Primary 5A. Teaches Mathematics and English.
 *
 * teachers 002–005 fill out the staff list so the admin portal,
 * class assignments, and attendance flows have realistic data.
 *
 * subjects  — array of subject IDs the teacher is responsible for
 * classIds  — classes the teacher is assigned to (may include form class)
 * status    — "active" | "on_leave" | "inactive"
 */

const teachers = [
  {
    id: "teacher_001",
    userId: "user_003",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "teacher@laurelacademy.edu",
    phone: "+234 801 234 5678",
    subjects: ["subj_math", "subj_eng"],
    classIds: ["class_pri5a"],
    department: "Upper Primary",
    qualification: "B.Ed. Mathematics Education",
    status: "active",
    createdAt: "2025-09-01T09:35:00.000Z",
  },
  {
    id: "teacher_002",
    userId: "user_004",
    firstName: "Chukwuemeka",
    lastName: "Adeyemi",
    email: "adeyemi@laurelacademy.edu",
    phone: "+234 802 345 6789",
    subjects: ["subj_sci", "subj_soc", "subj_civic"],
    classIds: ["class_pri3a", "class_pri6a"],
    department: "Middle Primary",
    qualification: "B.Sc. Biology, PGDE",
    status: "active",
    createdAt: "2025-09-01T09:40:00.000Z",
  },
  {
    id: "teacher_003",
    userId: null, // no portal login seeded for this teacher yet
    firstName: "Ngozi",
    lastName: "Okonkwo",
    email: "ngozi.okonkwo@laurelacademy.edu",
    phone: "+234 803 456 7890",
    subjects: ["subj_eng", "subj_verbal", "subj_quant"],
    classIds: ["class_pri1a"],
    department: "Lower Primary",
    qualification: "NCE, B.Ed. English Education",
    status: "active",
    createdAt: "2025-09-01T09:45:00.000Z",
  },
  {
    id: "teacher_004",
    userId: null, // no portal login seeded for this teacher yet
    firstName: "Amara",
    lastName: "Bello",
    email: "amara.bello@laurelacademy.edu",
    phone: "+234 804 567 8901",
    subjects: ["subj_arts", "subj_phe"],
    classIds: ["class_rec", "class_pri1a", "class_pri3a"],
    department: "Early Years",
    qualification: "B.Ed. Early Childhood Education",
    status: "active",
    createdAt: "2025-09-01T09:50:00.000Z",
  },
  {
    id: "teacher_005",
    userId: "user_010",
    firstName: "Grace",
    lastName: "Nwachukwu",
    email: "nwachukwu@laurelacademy.edu",
    phone: "+234 805 678 9012",
    subjects: ["subj_comp", "subj_arts"],
    classIds: ["class_nur2", "class_rec"],
    department: "Early Years",
    qualification: "B.Sc. Computer Science, PGDE",
    status: "active",
    createdAt: "2025-09-01T09:55:00.000Z",
  },
];

export default teachers;
