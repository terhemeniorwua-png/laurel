import SectionHeading from "@/app/components/public/SectionHeading";
import { testimonials } from "@/data/public/homeData";

export default function Testimonials() {
  return (
    <section className="hp-testimonials reveal-section">
      <div className="section-container">
        <SectionHeading
          eyebrow="PARENT VOICES"
          title="What Families Say About Laurel"
          subtitle="Hundreds of families have trusted us with their children's education. Here are some of their stories."
          centered
        />
        <div className="hp-testimonials__grid">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="hp-testimonial-card">
              <div className="hp-testimonial-card__quote" aria-hidden="true">"</div>
              <p className="hp-testimonial-card__text">{t.text}</p>
              <footer className="hp-testimonial-card__footer">
                <div className="hp-testimonial-card__avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <cite className="hp-testimonial-card__name">{t.name}</cite>
                  <span className="hp-testimonial-card__role">{t.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="hp-testimonials__disclaimer">
          * These testimonials are representative of the Laurel parent community and are used for illustrative purposes.
        </p>
      </div>
    </section>
  );
}
