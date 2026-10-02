/**
 * Laurel Children Academy — Demo seed data: Subjects.
 *
 * 10 subjects offered across the school's academic programmes.
 * IDs are stable and used as foreign keys in assignments, results,
 * and teacher subject assignments throughout the application.
 *
 * code — short uppercase abbreviation used on report cards and timetables.
 */

const subjects = [
  {
    id: "subj_eng",
    name: "English Language",
    code: "ENG",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_math",
    name: "Mathematics",
    code: "MATH",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_sci",
    name: "Basic Science",
    code: "SCI",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_soc",
    name: "Social Studies",
    code: "SOC",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_comp",
    name: "Computer Studies",
    code: "COMP",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_arts",
    name: "Creative Arts",
    code: "ARTS",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_phe",
    name: "Physical & Health Education",
    code: "PHE",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_civic",
    name: "Civic Education",
    code: "CIVIC",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_verbal",
    name: "Verbal Reasoning",
    code: "VRE",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
  {
    id: "subj_quant",
    name: "Quantitative Reasoning",
    code: "QRE",
    createdAt: "2025-09-01T09:30:00.000Z",
  },
];

export default subjects;
