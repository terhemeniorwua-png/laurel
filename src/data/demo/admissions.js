/**
 * Laurel Children Academy — Demo seed data: Admission Applications.
 *
 * 7 applications for the 2027/2028 academic session.
 *
 * Status distribution:
 *   pending       — 2  (adm_001, adm_002)
 *   under_review  — 2  (adm_003, adm_004)
 *   approved      — 2  (adm_005, adm_006)
 *   rejected      — 1  (adm_007)
 *
 * Fields:
 *   id                — unique string ID (adm_001 … adm_007)
 *   applicantName     — full name of parent / guardian submitting
 *   applicantEmail    — parent / guardian email address
 *   applicantPhone    — Nigerian mobile number (e.g. 080X-XXX-XXXX)
 *   childFirstName    — child's first name
 *   childLastName     — child's last name (family name)
 *   childDateOfBirth  — ISO 8601 date string (YYYY-MM-DD)
 *   childGender       — "Male" | "Female"
 *   desiredClass      — class the child is applying for
 *   previousSchool    — name of previous school, or null if none
 *   status            — "pending" | "under_review" | "approved" | "rejected"
 *   notes             — admin notes / comments
 *   submittedAt       — ISO 8601 datetime when application was submitted
 *   updatedAt         — ISO 8601 datetime of last status change
 *   createdAt         — same as submittedAt (for consistency with other collections)
 */

export const demoAdmissions = [
  // ── PENDING (2) ──────────────────────────────────────────────────────────

  {
    id: "adm_001",
    applicantName: "Mrs. Ngozi Adeyemi",
    applicantEmail: "ngozi.adeyemi@gmail.com",
    applicantPhone: "08034512763",
    childFirstName: "Tomiwa",
    childLastName: "Adeyemi",
    childDateOfBirth: "2021-03-14",
    childGender: "Male",
    desiredClass: "Primary 1",
    previousSchool: "Sunbeam Nursery & Primary School, Ikeja",
    status: "pending",
    notes: "",
    submittedAt: "2026-09-30T14:00:00.000Z",
    updatedAt: "2026-09-30T14:00:00.000Z",
    createdAt: "2026-09-30T14:00:00.000Z",
  },
  {
    id: "adm_002",
    applicantName: "Mrs. Chioma Nwosu",
    applicantEmail: "chioma.nwosu@yahoo.com",
    applicantPhone: "08121034987",
    childFirstName: "Obinna",
    childLastName: "Nwosu",
    childDateOfBirth: "2022-07-22",
    childGender: "Male",
    desiredClass: "Nursery 2",
    previousSchool: null,
    status: "pending",
    notes: "",
    submittedAt: "2026-10-02T11:30:00.000Z",
    updatedAt: "2026-10-02T11:30:00.000Z",
    createdAt: "2026-10-02T11:30:00.000Z",
  },

  // ── UNDER REVIEW (2) ─────────────────────────────────────────────────────

  {
    id: "adm_003",
    applicantName: "Mr. Biodun Ogunleye",
    applicantEmail: "biodun.ogunleye@gmail.com",
    applicantPhone: "08056789201",
    childFirstName: "Simi",
    childLastName: "Ogunleye",
    childDateOfBirth: "2018-11-05",
    childGender: "Female",
    desiredClass: "Primary 3",
    previousSchool: "Little Stars Academy, Surulere",
    status: "under_review",
    notes:
      "Application documents received and verified. Assessment interview scheduled for 10 October 2026 at 10:00 AM.",
    submittedAt: "2026-10-01T10:45:00.000Z",
    updatedAt: "2026-10-02T09:00:00.000Z",
    createdAt: "2026-10-01T10:45:00.000Z",
  },
  {
    id: "adm_004",
    applicantName: "Dr. Abubakar Sani",
    applicantEmail: "abubakar.sani@outlook.com",
    applicantPhone: "08097643120",
    childFirstName: "Halima",
    childLastName: "Sani",
    childDateOfBirth: "2019-04-18",
    childGender: "Female",
    desiredClass: "Primary 2",
    previousSchool: "Bright Futures School, Wuse, Abuja",
    status: "under_review",
    notes:
      "Transfer application from Abuja. Previous school report card received. Academic performance appears strong. Awaiting results of entry assessment on 11 October 2026.",
    submittedAt: "2026-09-27T16:20:00.000Z",
    updatedAt: "2026-10-01T08:00:00.000Z",
    createdAt: "2026-09-27T16:20:00.000Z",
  },

  // ── APPROVED (2) ─────────────────────────────────────────────────────────

  {
    id: "adm_005",
    applicantName: "Mrs. Amaka Eze",
    applicantEmail: "amaka.eze@gmail.com",
    applicantPhone: "08073920145",
    childFirstName: "Chizaram",
    childLastName: "Eze",
    childDateOfBirth: "2020-01-30",
    childGender: "Female",
    desiredClass: "Primary 1",
    previousSchool: "Golden Gate Nursery School, Enugu",
    status: "approved",
    notes:
      "Application approved. Excellent assessment results. Admission letter issued on 22 September 2026. Enrollment paperwork and first-term fee payment expected before 15 October 2026.",
    submittedAt: "2026-09-10T09:00:00.000Z",
    updatedAt: "2026-09-22T11:30:00.000Z",
    createdAt: "2026-09-10T09:00:00.000Z",
  },
  {
    id: "adm_006",
    applicantName: "Mr. Oluwaseun Adeleke",
    applicantEmail: "seun.adeleke@live.com",
    applicantPhone: "08064812390",
    childFirstName: "Ireoluwa",
    childLastName: "Adeleke",
    childDateOfBirth: "2017-08-12",
    childGender: "Male",
    desiredClass: "Primary 4",
    previousSchool: "Heritage International School, Ibadan",
    status: "approved",
    notes:
      "Approved following a successful entry assessment and parent interview on 18 September 2026. Transfer documents from previous school verified. Student is expected to resume in January 2027 for the second term.",
    submittedAt: "2026-09-05T15:00:00.000Z",
    updatedAt: "2026-09-20T14:00:00.000Z",
    createdAt: "2026-09-05T15:00:00.000Z",
  },

  // ── REJECTED (1) ─────────────────────────────────────────────────────────

  {
    id: "adm_007",
    applicantName: "Mr. Emeka Obi",
    applicantEmail: "emeka.obi67@gmail.com",
    applicantPhone: "08031456789",
    childFirstName: "Kelechi",
    childLastName: "Obi",
    childDateOfBirth: "2015-06-09",
    childGender: "Male",
    desiredClass: "Primary 6",
    previousSchool: "Faith Academy, Onitsha",
    status: "rejected",
    notes:
      "Application reviewed. Unfortunately, we are unable to offer a place for the 2027/2028 session as all Primary 6 positions have been filled. The family has been advised to reapply for Primary 6 in the following session or explore available openings in lower classes. Rejection letter sent on 29 September 2026.",
    submittedAt: "2026-09-15T12:00:00.000Z",
    updatedAt: "2026-09-29T10:00:00.000Z",
    createdAt: "2026-09-15T12:00:00.000Z",
  },
];

export default demoAdmissions;
