/**
 * Laurel Children Academy — Demo announcement seed data.
 *
 * 7 announcements covering the most common school communication types.
 * Authors are either the admin (user_001) or the principal (user_002).
 *
 * Priority levels:  normal | high | urgent
 * Audience values:  all | parents | students | teachers | staff
 *
 * Dates are set relative to the 2026/2027 First Term academic calendar
 * (term begins early September 2026, ends mid-December 2026).
 */

/** @type {import("../../lib/storage/storage").Announcement[]} */
const demoAnnouncements = [
  {
    id: "announcement_001",
    title: "Welcome Back to the 2026/2027 Academic Session!",
    content:
      "We are delighted to welcome all our students, parents, and staff back to Laurel Children Academy for a brand-new academic session. " +
      "This term promises to be filled with exciting learning opportunities, enriching activities, and memorable experiences for every child. " +
      "Please ensure all school fees are settled and that your child arrives on time each morning ready to learn.",
    authorId: "user_002",
    audience: "all",
    priority: "normal",
    publishedAt: "2026-09-08T07:00:00.000Z",
    createdAt: "2026-09-07T18:00:00.000Z",
  },
  {
    id: "announcement_002",
    title: "First Term Examination Schedule — 2026/2027",
    content:
      "The First Term examinations will commence on Monday, 23rd November 2026 and conclude on Friday, 4th December 2026. " +
      "Students are advised to begin revision early and to consult their class teachers for study guides and past questions. " +
      "A detailed timetable per class has been shared with all class teachers and is available on the school notice board.",
    authorId: "user_002",
    audience: "all",
    priority: "high",
    publishedAt: "2026-10-20T09:00:00.000Z",
    createdAt: "2026-10-19T16:30:00.000Z",
  },
  {
    id: "announcement_003",
    title: "Inter-House Sports Day — Save the Date!",
    content:
      "Laurel Children Academy's Annual Inter-House Sports Day is scheduled for Thursday, 22nd October 2026 at the school sports field. " +
      "Students are encouraged to participate actively and proudly represent their houses in all events. " +
      "Parents are warmly invited to cheer on their children; entry is free and refreshments will be available.",
    authorId: "user_001",
    audience: "all",
    priority: "normal",
    publishedAt: "2026-10-01T08:00:00.000Z",
    createdAt: "2026-09-30T14:00:00.000Z",
  },
  {
    id: "announcement_004",
    title: "Urgent: First Term School Fee Payment Reminder",
    content:
      "This is a reminder to all parents and guardians that First Term school fees for the 2026/2027 session are now due. " +
      "All outstanding balances must be settled on or before Friday, 17th October 2026 to avoid disruption to your child's learning. " +
      "Please visit the school bursary or make payment via the parent portal and retain your receipt for confirmation.",
    authorId: "user_001",
    audience: "parents",
    priority: "urgent",
    publishedAt: "2026-10-06T08:00:00.000Z",
    createdAt: "2026-10-05T17:00:00.000Z",
  },
  {
    id: "announcement_005",
    title: "New Books Available in the School Library",
    content:
      "We are pleased to announce that Laurel Children Academy's library has been stocked with over 200 new titles across Science, Mathematics, Fiction, and Arts. " +
      "Students are encouraged to visit the library during break periods and free periods to borrow books and broaden their knowledge. " +
      "Library membership cards are available from the school secretary at no extra charge.",
    authorId: "user_002",
    audience: "students",
    priority: "normal",
    publishedAt: "2026-09-22T10:00:00.000Z",
    createdAt: "2026-09-21T15:00:00.000Z",
  },
  {
    id: "announcement_006",
    title: "Parent-Teacher Association (PTA) Meeting — October 2026",
    content:
      "The First Term PTA meeting is scheduled for Saturday, 10th October 2026 at 10:00 AM in the school hall. " +
      "Agenda items include academic performance updates, the Sports Day logistics, and the upcoming school improvement fundraiser. " +
      "All parents and guardians are strongly encouraged to attend; kindly confirm your attendance via the parent portal or by contacting the school secretary.",
    authorId: "user_001",
    audience: "parents",
    priority: "high",
    publishedAt: "2026-09-29T09:00:00.000Z",
    createdAt: "2026-09-28T11:00:00.000Z",
  },
  {
    id: "announcement_007",
    title: "School Uniform Policy — Reminder and Update",
    content:
      "All students are reminded to wear the complete Laurel Children Academy uniform every school day, including properly polished black shoes and the school ID badge. " +
      "Effective from Monday, 5th October 2026, students found repeatedly out of uniform will be referred to the school secretary for a formal parent notification. " +
      "Parents requiring replacement uniform items may contact the school store on Mondays and Wednesdays between 8:00 AM and 12:00 noon.",
    authorId: "user_002",
    audience: "all",
    priority: "normal",
    publishedAt: "2026-10-02T07:30:00.000Z",
    createdAt: "2026-10-01T16:00:00.000Z",
  },
];

export default demoAnnouncements;
