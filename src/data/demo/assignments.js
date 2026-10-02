/**
 * Demo seed data — Assignments
 * Laurel Children Academy
 *
 * 12 assignments spread across Mathematics, English, Science, Computer Studies,
 * and Social Studies for Primary 5A and Primary 6A.
 *
 * Teacher: Sarah Johnson (teacher_001)
 * Classes:  class_pri5a (mostly), class_pri6a (some)
 * Subjects: subj_math | subj_eng | subj_sci | subj_comp | subj_soc
 * Statuses: published | draft | closed
 */

const assignments = [
  // ── Mathematics ────────────────────────────────────────────────────────────
  {
    id: "asgn_001",
    title: "Fractions Homework",
    description:
      "Practice identifying, comparing, and simplifying fractions using real-world examples.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_math",
    dueDate: "2026-09-19",
    status: "closed",
    instructions:
      "Complete exercises 1–20 in your Mathematics workbook (page 45). Show all working clearly. Simplify all answers to their lowest terms. Submit your workbook during Friday's class.",
    createdAt: "2026-09-15T08:00:00.000Z",
  },
  {
    id: "asgn_002",
    title: "Decimal Numbers and Place Value",
    description:
      "Extend understanding of place value to include tenths, hundredths, and thousandths.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_math",
    dueDate: "2026-09-26",
    status: "closed",
    instructions:
      "Answer all questions on the provided worksheet. Write numbers in both digit and word form. Draw a place-value chart for at least five numbers. Show all working.",
    createdAt: "2026-09-22T08:00:00.000Z",
  },
  {
    id: "asgn_003",
    title: "Word Problems — Multiplication and Division",
    description:
      "Apply multiplication and division skills to solve multi-step word problems.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_math",
    dueDate: "2026-10-09",
    status: "published",
    instructions:
      "Solve all 15 word problems on pages 58–60 of your workbook. Clearly identify what is given, what is asked, and show your method step by step. Check your answers by working backwards where possible.",
    createdAt: "2026-10-01T08:00:00.000Z",
  },

  // ── English Language ────────────────────────────────────────────────────────
  {
    id: "asgn_004",
    title: "Essay Writing — My Favourite Season",
    description:
      "Write a well-structured personal essay describing your favourite season of the year.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    dueDate: "2026-09-22",
    status: "closed",
    instructions:
      "Write an essay of 150–200 words. Include an introduction, two body paragraphs, and a conclusion. Use descriptive language and give at least two reasons why the season is your favourite. Write neatly in your English exercise book.",
    createdAt: "2026-09-17T08:30:00.000Z",
  },
  {
    id: "asgn_005",
    title: "Grammar Exercise — Nouns and Pronouns",
    description:
      "Identify and correctly use common nouns, proper nouns, and pronouns in sentences.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    dueDate: "2026-09-29",
    status: "closed",
    instructions:
      "Complete Parts A, B, and C of the grammar worksheet. Part A: Underline all nouns. Part B: Circle the correct pronoun in each sentence. Part C: Write five original sentences using a mix of common nouns, proper nouns, and pronouns.",
    createdAt: "2026-09-24T08:30:00.000Z",
  },
  {
    id: "asgn_006",
    title: "Reading Comprehension — The Clever Tortoise",
    description:
      "Read the story passage and answer comprehension questions to test understanding.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_eng",
    dueDate: "2026-10-07",
    status: "published",
    instructions:
      "Read the passage on page 34 of your English reader carefully. Answer all 10 comprehension questions in full sentences. For question 8, write your own short opinion paragraph (3–4 sentences).",
    createdAt: "2026-10-01T09:00:00.000Z",
  },

  // ── Basic Science ───────────────────────────────────────────────────────────
  {
    id: "asgn_007",
    title: "Science Experiment Report — Dissolving Sugar",
    description:
      "Write a formal experiment report on the dissolving of sugar in water at different temperatures.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_sci",
    dueDate: "2026-09-24",
    status: "closed",
    instructions:
      "Write your report using the standard format: Aim, Materials, Method, Observations, Results (table), and Conclusion. Include a bar chart of your results. Minimum length: one full page. Submit in your Science exercise book.",
    createdAt: "2026-09-18T10:00:00.000Z",
  },
  {
    id: "asgn_008",
    title: "Parts of a Flowering Plant — Labelled Diagram",
    description:
      "Draw and label the major parts of a flowering plant and state the function of each part.",
    teacherId: "teacher_001",
    classId: "class_pri6a",
    subjectId: "subj_sci",
    dueDate: "2026-09-30",
    status: "closed",
    instructions:
      "Draw a large, clear diagram of a flowering plant on an A4 sheet. Label at least eight parts (root, stem, leaf, flower, seed, petal, stamen, pistil). Next to each label, write one sentence describing the function of that part. Colour your diagram neatly.",
    createdAt: "2026-09-23T10:00:00.000Z",
  },
  {
    id: "asgn_009",
    title: "The Human Digestive System",
    description:
      "Describe the journey of food through the human digestive system.",
    teacherId: "teacher_001",
    classId: "class_pri6a",
    subjectId: "subj_sci",
    dueDate: "2026-10-12",
    status: "published",
    instructions:
      "Write a detailed note on the organs of the digestive system (mouth, oesophagus, stomach, small intestine, large intestine). Include a labelled diagram. State the role of each organ. Minimum: three paragraphs. Submit in your Science exercise book.",
    createdAt: "2026-10-02T10:00:00.000Z",
  },

  // ── Computer Studies ────────────────────────────────────────────────────────
  {
    id: "asgn_010",
    title: "Computer Lab Task — Microsoft Word Formatting",
    description:
      "Practise essential word-processing skills: formatting text, inserting tables, and using headers.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_comp",
    dueDate: "2026-09-25",
    status: "closed",
    instructions:
      "Log in to your assigned computer in the lab. Open Microsoft Word and type the paragraph provided on the whiteboard. Apply: (1) a bold heading, (2) font size 12 for body text, (3) a 3×3 table with sample data, (4) page number in the footer. Save as 'YourName_WordTask.docx' in the Class5A folder.",
    createdAt: "2026-09-20T11:00:00.000Z",
  },
  {
    id: "asgn_011",
    title: "Introduction to Spreadsheets — Microsoft Excel",
    description:
      "Learn to enter data, use basic formulas (SUM, AVERAGE), and format a simple spreadsheet.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_comp",
    dueDate: "2026-10-08",
    status: "published",
    instructions:
      "Open Microsoft Excel. Create a spreadsheet of class test scores for five imaginary students across three subjects. Use SUM to calculate each student's total and AVERAGE to calculate the class average per subject. Apply basic formatting: bold headers, borders, and alternating row colours. Save as 'YourName_Excel.xlsx'.",
    createdAt: "2026-10-01T11:00:00.000Z",
  },

  // ── Social Studies ──────────────────────────────────────────────────────────
  {
    id: "asgn_012",
    title: "Social Studies Project — Our Local Government",
    description:
      "Research and present information about the structure and functions of local government.",
    teacherId: "teacher_001",
    classId: "class_pri5a",
    subjectId: "subj_soc",
    dueDate: "2026-10-14",
    status: "draft",
    instructions:
      "Choose your local government area. Write a two-page project covering: (1) Name and location, (2) Structure (chairman, councillors), (3) Three key functions of the local government, (4) One recent project or service provided. Include a map or sketch of the area. Neatly present in your Social Studies project book.",
    createdAt: "2026-10-02T09:00:00.000Z",
  },
];

export default assignments;
