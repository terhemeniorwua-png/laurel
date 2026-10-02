/**
 * Laurel Children Academy — Demo school events seed data.
 *
 * 8 events covering the First Term (Sept – Dec 2026) calendar.
 * Dates match the announcement seed data where events are cross-referenced.
 *
 * Category values: academic | sports | cultural | social | administrative
 *
 * Reading Week spans multiple days (Oct 13–17); a single event record is
 * used with date set to the opening day and endTime set to the closing time
 * of the final day.  Consumer UI may choose to render it as a range.
 */

/** @type {import("../../lib/storage/storage").SchoolEvent[]} */
const demoEvents = [
  {
    id: "event_001",
    title: "Parent-Teacher Association (PTA) Meeting",
    description:
      "The First Term PTA meeting brings together parents, guardians, and teaching staff to review academic progress, " +
      "discuss school improvement initiatives, and plan upcoming term activities. " +
      "Light refreshments will be served in the school hall after the formal session.",
    date: "2026-10-10",
    startTime: "10:00",
    endTime: "13:00",
    location: "School Hall",
    category: "administrative",
    createdAt: "2026-09-28T11:00:00.000Z",
  },
  {
    id: "event_002",
    title: "Reading Week — Open to All Classes",
    description:
      "Laurel Children Academy's annual Reading Week encourages every student to discover the joy of books. " +
      "Each day features themed reading sessions, author story-times, book quizzes, and a classroom reading challenge. " +
      "Students are invited to bring in their favourite book from home to share with classmates.",
    date: "2026-10-13",
    startTime: "08:00",
    endTime: "15:00",
    location: "Classrooms & Library",
    category: "academic",
    createdAt: "2026-09-20T09:00:00.000Z",
  },
  {
    id: "event_003",
    title: "School Open Day",
    description:
      "Open Day is an opportunity for prospective parents and families to tour the Laurel Children Academy campus, " +
      "meet teachers, observe ongoing lessons, and learn about our admissions process. " +
      "Guided tours run every 30 minutes from 9:00 AM; registration is available on the school website.",
    date: "2026-10-15",
    startTime: "09:00",
    endTime: "14:00",
    location: "Entire School Campus",
    category: "administrative",
    createdAt: "2026-09-15T10:00:00.000Z",
  },
  {
    id: "event_004",
    title: "Inter-House Sports Day",
    description:
      "The highlight of the First Term sporting calendar, Inter-House Sports Day pits the four school houses against one another " +
      "in track and field events, relay races, team games, and novelty competitions. " +
      "Trophies and medals will be awarded at the closing ceremony; parents are warmly invited to attend.",
    date: "2026-10-22",
    startTime: "08:30",
    endTime: "16:00",
    location: "School Sports Field",
    category: "sports",
    createdAt: "2026-09-30T14:00:00.000Z",
  },
  {
    id: "event_005",
    title: "Cultural Day Celebration",
    description:
      "Cultural Day is a vibrant celebration of Nigeria's rich ethnic diversity where students come dressed in traditional attire " +
      "representing their heritage and perform dances, songs, poetry, and short plays from across the country. " +
      "Food stalls featuring regional cuisine will be available, and parents are encouraged to participate in the cultural showcase.",
    date: "2026-11-05",
    startTime: "09:00",
    endTime: "15:00",
    location: "School Hall & Grounds",
    category: "cultural",
    createdAt: "2026-10-01T10:00:00.000Z",
  },
  {
    id: "event_006",
    title: "Career Awareness Day",
    description:
      "Career Awareness Day invites professionals from diverse fields — medicine, engineering, law, the arts, technology, and more — " +
      "to speak to Upper Primary students about their careers and inspire early ambition. " +
      "Interactive booth sessions give students hands-on exposure to different professional tools and workplace environments.",
    date: "2026-11-12",
    startTime: "09:30",
    endTime: "14:30",
    location: "Assembly Hall",
    category: "academic",
    createdAt: "2026-10-05T12:00:00.000Z",
  },
  {
    id: "event_007",
    title: "End of Term Music & Arts Concert",
    description:
      "The First Term Concert showcases the musical and artistic talent of Laurel Children Academy students across all classes. " +
      "Performances include choir, solo singing, instrumental pieces, drama, spoken word, and a visual art exhibition. " +
      "All parents and guardians are invited to this celebratory event marking the close of a successful term.",
    date: "2026-11-28",
    startTime: "10:00",
    endTime: "14:00",
    location: "School Hall",
    category: "cultural",
    createdAt: "2026-10-10T09:00:00.000Z",
  },
  {
    id: "event_008",
    title: "Christmas Celebration & End of Term Party",
    description:
      "The end of term Christmas Party is a joyful send-off celebration for students before the holiday break. " +
      "Activities include a Secret Santa gift exchange, festive games, carol singing, and a special lunch prepared by the school kitchen. " +
      "Students are encouraged to wear something festive; parents are welcome to join the fun from 12:00 noon.",
    date: "2026-12-05",
    startTime: "09:00",
    endTime: "14:00",
    location: "School Hall & Classrooms",
    category: "social",
    createdAt: "2026-10-15T11:00:00.000Z",
  },
];

export default demoEvents;
