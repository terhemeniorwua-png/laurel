import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import { academicLevels } from "@/data/public/homeData";

export default function AcademicPreview() {
  return (
    <section className="hp-academics reveal-section">
      <div className="section-container">
        <div className="hp-academics__header">
          <SectionHeading
            eyebrow="ACADEMIC PROGRAMMES"
            title="From Early Years to Primary 6"
            subtitle="A carefully structured curriculum that meets every child where they are."
          />
          <Link href="/academics" className="hp-academics__see-all">
            Explore Academics <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="hp-academics__grid">
          {academicLevels.map((level, i) => (
            <div key={level.name} className="hp-academic-card">
              <div className="hp-academic-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>
              <GraduationCap
                className="hp-academic-card__icon"
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="hp-academic-card__name">{level.name}</h3>
              <span className="hp-academic-card__ages">{level.ages}</span>
              <p className="hp-academic-card__desc">{level.desc}</p>
            </div>
          ))}
        </div>

        <div className="hp-academics__cta">
          <Link href="/academics" className="hp-cta-btn hp-cta-btn--primary">
            Explore Full Curriculum
          </Link>
        </div>
      </div>
    </section>
  );
}
