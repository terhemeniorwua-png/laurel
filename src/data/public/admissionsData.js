/**
 * Laurel Children Academy — Admissions static data.
 * Shared by the /admissions page, AdmissionForm, and AdmissionStatusChecker.
 */

export const ADMISSION_CLASSES = [
  { value: "Early Years",  label: "Early Years",  ageRange: "Ages 3–5" },
  { value: "Primary 1",    label: "Primary 1",    ageRange: "Age 6" },
  { value: "Primary 2",    label: "Primary 2",    ageRange: "Age 7" },
  { value: "Primary 3",    label: "Primary 3",    ageRange: "Age 8" },
  { value: "Primary 4",    label: "Primary 4",    ageRange: "Age 9" },
  { value: "Primary 5",    label: "Primary 5",    ageRange: "Age 10" },
  { value: "Primary 6",    label: "Primary 6",    ageRange: "Age 11" },
];

export const ADMISSION_STATUSES = [
  { key: "submitted",           label: "Application Submitted",    done: true },
  { key: "under_review",        label: "Application Under Review", done: false },
  { key: "assessment_scheduled",label: "Assessment Scheduled",     done: false },
  { key: "decision_pending",    label: "Admission Decision",       done: false },
  { key: "accepted",            label: "Enrolled",                 done: false },
];

export const ADMISSION_STEPS = [
  {
    n: "01",
    title: "Submit Application",
    desc: "Complete the online form with your child's details and upload supporting documents.",
  },
  {
    n: "02",
    title: "Application Review",
    desc: "Our admissions team reviews every application within 1–2 working weeks.",
  },
  {
    n: "03",
    title: "Assessment & Interview",
    desc: "Selected applicants are invited for a friendly assessment and parent meet-and-greet.",
  },
  {
    n: "04",
    title: "Admission Decision",
    desc: "Families receive a formal decision by email and postal address.",
  },
  {
    n: "05",
    title: "Enrolment",
    desc: "Successful applicants complete enrolment formalities and receive a welcome pack.",
  },
];

export const ADMISSION_FAQS = [
  {
    q: "What classes are available for application?",
    a: "We accept applications for Early Years through Primary 6. Each level has a specific age requirement — please see the age guide on this page.",
  },
  {
    q: "What documents are required?",
    a: "You will need your child's birth certificate, immunisation record, two passport photographs, a previous school report (if applicable), and a parent/guardian ID.",
  },
  {
    q: "How does the admissions process work?",
    a: "After submitting your application, our team reviews it within 1–2 weeks. Shortlisted families are invited for an assessment. A formal decision is then communicated and successful applicants complete enrolment.",
  },
  {
    q: "Can I apply for Early Years?",
    a: "Yes. We welcome children from age 3 into our Early Years programme. No previous formal schooling is required.",
  },
  {
    q: "How will I know the status of my application?",
    a: "After submitting you will receive an Application ID. You can check your status at any time on the Application Status page using that ID.",
  },
  {
    q: "Can I edit my application after submission?",
    a: "Applications cannot be edited once submitted. If you need to correct information, please contact our admissions office at admissions@laurelacademy.edu.ng.",
  },
  {
    q: "Is there a deadline for applications?",
    a: "We practise rolling admissions throughout the year. However, spaces are limited — we encourage families to apply early to avoid disappointment.",
  },
];

export const REQUIRED_DOCUMENTS = [
  { id: "birth_cert",     label: "Birth Certificate",          required: true,  accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "passport_photo", label: "Passport Photograph",        required: true,  accept: ".jpg,.jpeg,.png" },
  { id: "school_report",  label: "Previous School Report",     required: false, accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "immunisation",   label: "Immunisation Record",        required: true,  accept: ".pdf,.jpg,.jpeg,.png" },
  { id: "other",          label: "Other Supporting Document",  required: false, accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx" },
];

export const HEAR_ABOUT_OPTIONS = [
  "Word of mouth / Family / Friend",
  "Google Search",
  "Social Media (Facebook / Instagram)",
  "School Open Day",
  "Newspaper / Magazine",
  "Billboard / Signage",
  "Other",
];

export const RELATIONSHIP_OPTIONS = [
  "Mother",
  "Father",
  "Legal Guardian",
  "Grandparent",
  "Other",
];
