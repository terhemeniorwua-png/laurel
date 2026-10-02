"use client";

import { useState } from "react";
import { MapPin, Clock, Tag, CalendarDays } from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";
import eventsPublic from "@/data/public/eventsPublic";

const CATEGORIES = ["All", "Academic", "Sports", "Cultural", "Social", "Administrative"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseDate(dateStr) {
  return new Date(dateStr + "T00:00:00");
}

function formatDisplayDate(dateStr) {
  const d = parseDate(dateStr);
  return {
    day:   d.getDate().toString().padStart(2, "0"),
    month: MONTHS[d.getMonth()],
    year:  d.getFullYear(),
    full:  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}

const categoryColors = {
  Academic:       "event-cat--academic",
  Sports:         "event-cat--sports",
  Cultural:       "event-cat--cultural",
  Social:         "event-cat--social",
  Administrative: "event-cat--admin",
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filtered = eventsPublic.filter((ev) => {
    const matchCat    = activeCategory === "All" || ev.category === activeCategory;
    const matchStatus = ev.status === activeTab;
    return matchCat && matchStatus;
  });

  // Sort upcoming ascending, past descending
  const sorted = [...filtered].sort((a, b) => {
    const diff = parseDate(a.date) - parseDate(b.date);
    return activeTab === "upcoming" ? diff : -diff;
  });

  return (
    <main className="events-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="School Events"
        subtitle="From Open Day to Sports Day — there's always something exciting happening at Laurel."
        breadcrumb="Events"
        imageSrc="https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600&q=85&fit=crop"
        imageAlt="Students participating in school events"
      />

      <div className="section-container events-page__body">
        {/* ── Upcoming / Past toggle ─────────────────────────── */}
        <div className="events-tabs reveal-section" role="tablist" aria-label="Filter events by status">
          {["upcoming", "past"].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={["events-tab", activeTab === tab ? "events-tab--active" : ""].filter(Boolean).join(" ")}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "upcoming" ? "Upcoming Events" : "Past Events"}
            </button>
          ))}
        </div>

        {/* ── Category filter ───────────────────────────────────── */}
        <div className="events-filter reveal-section" role="group" aria-label="Filter events by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={["events-filter__btn", activeCategory === cat ? "events-filter__btn--active" : ""].filter(Boolean).join(" ")}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Event cards ─────────────────────────────────────── */}
        {sorted.length > 0 ? (
          <section className="events-list reveal-section" aria-label="School events">
            {sorted.map((ev) => {
              const d = formatDisplayDate(ev.date);
              return (
                <article key={ev.id} className="event-card">
                  {/* Date box */}
                  <div className="event-card__date-box" aria-label={d.full}>
                    <span className="event-card__day">{d.day}</span>
                    <span className="event-card__month">{d.month}</span>
                    <span className="event-card__year">{d.year}</span>
                  </div>

                  {/* Body */}
                  <div className="event-card__body">
                    <div className="event-card__top">
                      <span className={`event-cat-badge ${categoryColors[ev.category] ?? ""}`}>
                        {ev.category}
                      </span>
                      {ev.status === "upcoming" && (
                        <span className="event-status-badge event-status-badge--upcoming">
                          <CalendarDays size={12} aria-hidden="true" />
                          Upcoming
                        </span>
                      )}
                    </div>
                    <h3 className="event-card__title">{ev.title}</h3>
                    <p className="event-card__desc">{ev.description}</p>
                    <div className="event-card__meta">
                      <span className="event-meta-item">
                        <Clock size={14} aria-hidden="true" />
                        {ev.startTime} – {ev.endTime}
                      </span>
                      <span className="event-meta-item">
                        <MapPin size={14} aria-hidden="true" />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className="events-empty reveal-section">
            <CalendarDays size={40} aria-hidden="true" />
            <p>No {activeTab} events found{activeCategory !== "All" ? ` in the ${activeCategory} category` : ""}.</p>
            <button className="events-filter__btn events-filter__btn--active" onClick={() => { setActiveCategory("All"); setActiveTab("upcoming"); }}>
              View all upcoming events
            </button>
          </div>
        )}

        {/* ── Calendar note ─────────────────────────────────────── */}
        <div className="events-calendar-note reveal-section">
          <Tag size={18} aria-hidden="true" />
          <p>
            The full school academic calendar is available in the{" "}
            <a href="/portal" className="events-portal-link">School Portal</a>.
            Parents can also download the term schedule from the Admissions pack.
          </p>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="brown"
        title="Be Part of Our School Community"
        subtitle="Join thousands of families who are already part of the Laurel journey."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Apply for Admission"
        secondaryHref="/admissions"
      />
    </main>
  );
}
