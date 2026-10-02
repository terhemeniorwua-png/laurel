import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import eventsPublic from "@/data/public/eventsPublic";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}

const catColors = {
  Academic:       "event-cat--academic",
  Sports:         "event-cat--sports",
  Cultural:       "event-cat--cultural",
  Social:         "event-cat--social",
  Administrative: "event-cat--admin",
};

export default function EventsPreview() {
  const upcoming = eventsPublic
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  return (
    <section className="hp-events section-container reveal-section">
      <div className="hp-events__header">
        <SectionHeading
          eyebrow="UPCOMING EVENTS"
          title="What's On at Laurel"
          subtitle="Stay connected with school life — mark these dates in your calendar."
        />
        <Link href="/events" className="hp-events__see-all">
          View All Events <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="hp-events__grid">
        {upcoming.map((ev) => {
          const d = formatDate(ev.date);
          return (
            <article key={ev.id} className="hp-event-card">
              <div className="hp-event-card__date-box" aria-label={`${d.day} ${d.month} ${d.year}`}>
                <span className="hp-event-card__day">{d.day}</span>
                <span className="hp-event-card__month">{d.month}</span>
              </div>
              <div className="hp-event-card__body">
                <span className={`event-cat-badge ${catColors[ev.category] ?? ""}`}>
                  {ev.category}
                </span>
                <h3 className="hp-event-card__title">{ev.title}</h3>
                <p className="hp-event-card__desc">{ev.description.slice(0, 100)}…</p>
                <div className="hp-event-card__meta">
                  <span><Calendar size={13} aria-hidden="true" /> {ev.startTime}</span>
                  <span><MapPin size={13} aria-hidden="true" /> {ev.location.split(" ").slice(0, 4).join(" ")}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
