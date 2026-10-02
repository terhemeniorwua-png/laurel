const eventsPublic = [
  {
    id: 'open-day-2026',
    title: 'Open Day 2026',
    description:
      'Prospective and current families are warmly invited to visit Laurel Children Academy and experience our school first-hand. Tour our facilities, meet our teachers, and discover why so many families choose Laurel for their children\'s education.',
    date: '2026-10-15',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    location: 'Laurel Children Academy Main Campus',
    category: 'Administrative',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80&fit=crop',
  },
  {
    id: 'inter-house-sports-day-2026',
    title: 'Inter-House Sports Day 2026',
    description:
      'Join us for a thrilling day of athletic competition as Eagles, Lions, Panthers, and Falcons houses battle for the Inter-House Sports Day championship. Students from Nursery through Primary 6 will compete in track, field, and team events in front of cheering families.',
    date: '2026-10-22',
    startTime: '08:00 AM',
    endTime: '03:00 PM',
    location: 'Laurel Children Academy Sports Field',
    category: 'Sports',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80&fit=crop',
  },
  {
    id: 'pta-meeting-first-term-2026',
    title: 'PTA Meeting — First Term 2026/2027',
    description:
      'Parents and guardians are invited to the first PTA meeting of the 2026/2027 academic session. Key agenda items include term updates, school improvement projects, fee schedules, and open discussion with school leadership.',
    date: '2026-10-10',
    startTime: '10:00 AM',
    endTime: '12:30 PM',
    location: 'School Hall, Laurel Children Academy',
    category: 'Administrative',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1544717297-fa8303588de5?w=800&q=80&fit=crop',
  },
  {
    id: 'reading-week-kickoff-2026',
    title: 'Reading Week Kickoff',
    description:
      'Laurel Children Academy launches its annual Reading Week celebration with a special assembly, book fair, and the announcement of this year\'s reading challenge. Students, parents, and guest readers are all part of the week-long literacy festival.',
    date: '2026-10-13',
    startTime: '08:30 AM',
    endTime: '10:00 AM',
    location: 'School Assembly Hall & Library',
    category: 'Academic',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&fit=crop',
  },
  {
    id: 'cultural-day-celebration-2026',
    title: 'Cultural Day Celebration 2026',
    description:
      'Students, staff, and families come together to celebrate Nigeria\'s rich and diverse cultural heritage through traditional dress, music, dance, drama performances, and a vibrant food fair. This is one of the most joyful events in the Laurel Academy calendar.',
    date: '2026-11-05',
    startTime: '09:00 AM',
    endTime: '03:00 PM',
    location: 'Laurel Children Academy School Grounds',
    category: 'Cultural',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop',
  },
  {
    id: 'career-day-2026',
    title: 'Career Day 2026',
    description:
      'Primary 4, 5, and 6 students will hear from professionals across a range of exciting careers including medicine, engineering, law, technology, creative arts, and entrepreneurship. Career Day inspires students to dream big and connect learning to their future aspirations.',
    date: '2026-11-12',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    location: 'School Hall & Classrooms, Laurel Children Academy',
    category: 'Academic',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop',
  },
  {
    id: 'end-of-term-concert-2026',
    title: 'End-of-Term Concert',
    description:
      'The First Term End-of-Term Concert is a beloved tradition where every class showcases their talents through music, drama, poetry, and dance. Families are warmly encouraged to attend and celebrate their children\'s creativity and hard work.',
    date: '2026-11-28',
    startTime: '04:00 PM',
    endTime: '07:00 PM',
    location: 'School Hall, Laurel Children Academy',
    category: 'Social',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&fit=crop',
  },
  {
    id: 'christmas-holiday-party-2026',
    title: 'Christmas Holiday Party',
    description:
      'Students and staff come together for a festive end-of-term celebration featuring games, performances, holiday treats, and the much-anticipated Secret Santa gift exchange. A joyful send-off before the Christmas and New Year holiday break.',
    date: '2026-12-05',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    location: 'Laurel Children Academy School Grounds',
    category: 'Social',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80&fit=crop',
  },
  {
    id: 'first-term-examinations-2026',
    title: 'First Term Examinations',
    description:
      'The First Term Examinations will take place across five days for all classes from Primary 1 to Primary 6. Parents are advised to support their children with revision and ensure punctual arrival each morning. Full timetables are available on the school portal.',
    date: '2026-11-17',
    startTime: '08:00 AM',
    endTime: '12:00 PM',
    location: 'Respective Classrooms, Laurel Children Academy',
    category: 'Academic',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1544717297-fa8303588de5?w=800&q=80&fit=crop',
  },
  {
    id: 'prize-giving-day-2026',
    title: 'Prize-Giving Day 2026',
    description:
      'Prize-Giving Day is our annual celebration of academic excellence, good character, and outstanding contribution to school life. Students are recognised for their achievements across all subjects and extra-curricular areas in a formal ceremony attended by families, dignitaries, and the entire school community.',
    date: '2026-12-12',
    startTime: '10:00 AM',
    endTime: '01:30 PM',
    location: 'School Hall, Laurel Children Academy',
    category: 'Social',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80&fit=crop',
  },
];

export default eventsPublic;
