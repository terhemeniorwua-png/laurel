Laurel Children Academy
A modern digital school experience for students, parents, teachers, and school administrators.

Laurel Children Academy is a modern primary school website and school management portal designed to demonstrate how a contemporary private school can manage its academic, administrative, financial, and communication activities through one unified digital platform.

This project is currently frontend-only and uses localStorage to simulate authentication, database persistence, user interactions, school records, notifications, assignments, attendance, results, payments, and other school operations.

✨ Overview
Laurel Children Academy combines a polished public-facing school website with a role-based school portal.

The public website allows prospective parents and visitors to:

Learn about the school
Explore academic programmes
View school activities
Learn about admissions
View news and announcements
Explore upcoming events
Contact the school
Submit an admission application
The authenticated portal provides different experiences for:

Administrators
Principals / Head Teachers
Teachers
Students
Parents / Guardians
Bursars / Finance Officers
School Secretaries
The goal is to make the application feel like a real production school platform, even though the current version does not use a backend.

🎨 Design Direction
The interface follows a design language called:

Warm Academic Minimalism

The design combines:

Modern SaaS dashboards
Premium private-school branding
Clean typography
Warm colors
Soft rounded components
Spacious layouts
Data visualization
Friendly educational imagery
Subtle animations
The official Laurel Children Academy uniform colors form the foundation of the visual identity.

Brand Colors
Color	Hex	Usage
Laurel Brown	#532306	Primary brand, navigation, buttons
Laurel Peach	#FFCBAB	Highlights, active states, accents
Warm Background	#FAFAF9	Main application background
White	#FFFFFF	Cards and surfaces
Primary Text	#211A17	Main typography
Muted Text	#78716C	Secondary information
Border	#E7E0DC	Dividers and borders
Peach Tint	#FFF0E8	Badges and subtle backgrounds
Brown Tint	#F3E8E2	Secondary surfaces
The official colors are used as accents rather than covering the entire interface, keeping the platform modern and professional.

🔤 Typography
Primary Font — Plus Jakarta Sans
Used for:

Navigation
Dashboard UI
Tables
Forms
Buttons
Labels
Body text
Statistics
Notifications
Why: Plus Jakarta Sans provides a clean, modern, highly readable interface suitable for a school management platform.

Display Font — DM Serif Display
Used sparingly for:

Homepage hero headings
Major marketing headings
Important section titles
Editorial content
Why: DM Serif Display adds warmth and personality to the public school website without compromising the modern dashboard experience.

Typography hierarchy
Hero Heading
DM Serif Display
Large / expressive

Page Heading
Plus Jakarta Sans
Bold / strong

Section Heading
Plus Jakarta Sans
Semibold

Body
Plus Jakarta Sans
Regular

Labels
Plus Jakarta Sans
Medium

Statistics
Plus Jakarta Sans
Bold
🏫 School Identity
Laurel Children Academy
Tagline
Growing Curious Minds. Building Confident Futures.

Alternative messaging
Where Every Child Is Seen, Supported, and Inspired.

School positioning
Laurel Children Academy is presented as a modern primary school focused on:

Academic excellence
Character development
Creativity
Digital literacy
Communication
Confidence
Collaboration
Holistic child development
🌐 Public Website
The public website includes:

Home
A welcoming introduction to Laurel Children Academy.

Sections include:

Hero section
School introduction
Key statistics
Why Laurel
Academic programmes
Student life
Extracurricular activities
Upcoming events
Latest announcements
Parent testimonials
Campus gallery
Admissions CTA
Footer
Hero Content
Growing Curious Minds. Building Confident Futures.

Supporting text:

At Laurel Children Academy, we create a nurturing environment where children are encouraged to explore, discover, create, and develop the confidence they need for tomorrow.

Primary CTA:

Explore Our School

Secondary CTA:

Apply for Admission

📚 Academics
The academics section showcases the school's learning programmes.

Example levels:

Early Years
Primary 1
Primary 2
Primary 3
Primary 4
Primary 5
Primary 6
Example subjects:

Mathematics
English Language
Basic Science
Social Studies
Computer Studies
Civic Education
Creative Arts
Physical & Health Education
Religious Studies
French
🎓 Admissions
Parents can explore the admissions process.

Admission Process
1. Submit Application
        ↓
2. Application Review
        ↓
3. Assessment / Interview
        ↓
4. Admission Decision
        ↓
5. Enrollment
The frontend simulates the complete application process.

Parents can submit:

Child information
Parent/guardian information
Previous school
Preferred class
Contact information
Required documents
Administrators can review applications from the portal.

📅 Events & Calendar
The school calendar displays:

Academic sessions
PTA meetings
Sports Day
Cultural Day
Examinations
Open Day
School trips
Holidays
Parent-teacher meetings
School activities
📰 News & Announcements
The public website displays school updates such as:

Welcome Back to a New Academic Session

We are excited to welcome our students back to Laurel Children Academy for another year of learning, discovery, and growth.

Other announcements can include:

School resumption
Examination dates
Holiday notices
PTA announcements
Sports activities
School events
🔐 School Portal
The portal uses simulated authentication with role-based access.

Supported Roles
Super Admin
Principal
Teacher
Student
Parent / Guardian
Bursar
Secretary
Each role has its own dashboard and available functionality.

👨‍💼 Administrator Portal
Administrators can manage:

Students
Teachers
Classes
Admissions
Attendance
Assignments
Results
Fees
Payments
Announcements
Events
Messages
Reports
School settings
Admin Dashboard
The dashboard provides an overview of:

Total students
Total teachers
Attendance rate
Outstanding fees
New admissions
Academic performance
Recent activities
Upcoming events
Notifications
👩‍🏫 Teacher Portal
Teachers can:

View assigned classes
View students
Take attendance
Create assignments
Review submissions
Enter grades
Add teacher comments
View timetable
Communicate with parents
View announcements
Manage classroom activities
Teacher Dashboard
Example:

Good morning, Mrs. Williams 👋

Today's Classes        4
My Students          128
Attendance            94%
Pending Work           7

Today's Schedule
08:00  Mathematics
09:00  English
10:30  Basic Science
👨‍👩‍👧 Parent Portal
Parents can:

View their children
Monitor attendance
View assignments
View results
View teacher comments
View school timetable
View announcements
View school events
View fees
View payment history
Receive notifications
Communicate with teachers
Parents with multiple children can switch between student profiles.

🧑‍🎓 Student Portal
Students can:

View classes
View assignments
Submit assignments
View results
View attendance
View timetable
View announcements
View messages
View school events
Student Dashboard
Example:

Good morning, Aisha 👋

Attendance       96%
Average Grade    88.8%
Assignments      14/16

Today's Classes

Mathematics
English
Basic Science
Computer Studies
💰 Finance / Bursar Portal
The finance section allows the school to simulate:

Fee structures
Student invoices
Payments
Outstanding balances
Payment history
Receipts
Financial summaries
Example:

School Fees

2026/2027 First Term

Total Fees       ₦185,000
Paid             ₦120,000
Outstanding       ₦65,000

65% Paid
Payments are simulated and stored locally.

📝 Attendance
Teachers can record attendance for each class.

Statuses include:

Present
Absent
Late
Excused
Attendance data updates the relevant:

Student dashboard
Parent dashboard
Teacher dashboard
Admin analytics
📖 Assignments
Teachers can create assignments containing:

Title
Subject
Description
Class
Due date
Attachments
Instructions
Students can:

View assignments
Submit work
Track submission status
Teachers can see:

32 Students

Submitted      27
Pending         4
Late            1
📊 Results & Report Cards
Teachers can enter academic results.

Subjects include:

Mathematics
English
Science
Social Studies
Computer Studies
Creative Arts
Physical Education
The system calculates:

Total score
Average
Grade
Class position
Performance summary
Students and parents can view digital report cards.

🔔 Notifications
The portal includes a centralized notification system.

Examples:

New Assignment
Mathematics homework has been published.

Payment Received
Your school fee payment has been recorded.

New Announcement
Sports Day has been scheduled for October 15.

Result Published
Your First Term results are now available.
Notifications are stored in localStorage.

💬 Messaging
The demo includes simulated communication between:

Teachers
Parents
Students
Administrators
Example:

Mrs. Williams — Primary 5A

Good afternoon. Aisha has shown excellent progress in Mathematics this week.

🔎 Global Search
The portal includes a global search / command interface.

Users can quickly find:

Students
Teachers
Classes
Assignments
Results
Announcements
Events
Payments
Keyboard shortcut:

Ctrl + K
🗂️ LocalStorage Architecture
Because this is a frontend-only demonstration, application data is persisted using browser localStorage.

Example storage keys:

lca_users
lca_students
lca_teachers
lca_parents
lca_classes
lca_attendance
lca_assignments
lca_submissions
lca_results
lca_fees
lca_payments
lca_announcements
lca_events
lca_notifications
lca_messages
lca_admissions
lca_settings
The application should use a dedicated storage/data layer rather than accessing localStorage directly throughout the UI.

This makes it possible to replace localStorage with an API later without rewriting the entire interface.

👤 Demo Accounts
The project includes seeded demo accounts for testing different experiences.

Role	Email	Password
Admin	admin@laurelacademy.edu	admin123
Principal	principal@laurelacademy.edu	admin123
Teacher	teacher@laurelacademy.edu	teacher123
Parent	parent@laurelacademy.edu	parent123
Student	student@laurelacademy.edu	student123
Bursar	bursar@laurelacademy.edu	bursar123
The login interface can also provide quick demo buttons for switching between roles.

🧩 Core User Flow
The application is designed around interconnected workflows rather than isolated pages.

Example:

Teacher
   ↓
Creates Assignment
   ↓
Student receives Notification
   ↓
Student views Assignment
   ↓
Student submits work
   ↓
Teacher receives Notification
   ↓
Teacher grades submission
   ↓
Student Result updates
   ↓
Parent receives Notification
Another workflow:

Parent
   ↓
Submits Admission Application
   ↓
Admin Reviews Application
   ↓
Admin Approves
   ↓
Student Record Created
   ↓
Student appears in Class
Another:

Parent
   ↓
Makes Demo Payment
   ↓
Payment Recorded
   ↓
Outstanding Balance Updated
   ↓
Receipt Generated
   ↓
Notification Created
These interconnected workflows are a major part of the demonstration.

🛠️ Technology Stack
Frontend
Next.js
React
JavaScript
Tailwind CSS
UI
Lucide React
Recharts
Responsive layouts
Modal dialogs
Toast notifications
Skeleton loading states
Command palette
Data
Browser localStorage
Seeded demo data
Future Backend
The architecture is designed to eventually support:

Next.js
    ↓
Express.js API
    ↓
PostgreSQL
Authentication can later be migrated from simulated localStorage authentication to:

JWT
+
Role-Based Access Control
📱 Responsive Design
The platform is designed for:

Desktop
Laptop
Tablet
Mobile
The parent experience is particularly optimized for mobile devices because parents may primarily access the portal from their phones.

🎯 Project Goals
The project demonstrates practical frontend engineering through:

Component architecture
Role-based interfaces
State management
Local persistence
CRUD workflows
Form handling
Data visualization
Responsive design
Dashboard design
Authentication simulation
Notifications
Search
Filtering
Sorting
Modal workflows
Reusable components
Empty states
Loading states
Error states
Realistic application workflows
🚀 Future Backend Integration
The frontend is intentionally designed so that the backend can be added later.

Potential future architecture:

                    Next.js
                       │
                       ▼
                 Express API
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
      PostgreSQL                 Redis
          │                         │
          │                    Notifications
          │                    Background Jobs
          │
          ▼
     School Database
Future backend features could include:

JWT authentication
PostgreSQL
Sequelize
Role-based authorization
File uploads
Email notifications
Payment integration
Real-time notifications with Socket.IO
Automated report generation
School analytics
Audit logs
📁 Suggested Project Structure
laurel-children-academy/
│
├── app/
│   ├── page.js
│   ├── about/
│   ├── academics/
│   ├── admissions/
│   ├── contact/
│   ├── news/
│   ├── events/
│   │
│   └── portal/
│       ├── dashboard/
│       ├── students/
│       ├── teachers/
│       ├── attendance/
│       ├── assignments/
│       ├── results/
│       ├── fees/
│       ├── messages/
│       ├── announcements/
│       ├── calendar/
│       └── settings/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── students/
│   ├── teachers/
│   ├── assignments/
│   ├── attendance/
│   └── finance/
│
├── lib/
│   ├── storage/
│   ├── auth/
│   ├── seed/
│   └── utils/
│
├── data/
│   └── demo/
│
├── public/
│   ├── images/
│   └── icons/
│
└── README.md
🌱 Future Vision
Laurel Children Academy can eventually evolve from a frontend demonstration into a complete school management platform.

The long-term platform could connect:

Parents
    │
Students
    │
Teachers
    │
Administrators
    │
Finance
    │
School Management
    │
    ▼
Laurel Children Academy Platform
The objective is to create a digital environment where the school can manage its daily operations while parents and students have a simple, transparent way to stay connected to the school.

Built With
Next.js · React · JavaScript · Tailwind CSS · localStorage

Laurel Children Academy
Growing Curious Minds. Building Confident Futures.
