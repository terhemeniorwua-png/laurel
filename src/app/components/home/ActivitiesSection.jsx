import { Dumbbell, Palette, Music2, Monitor, Globe2, BookOpen } from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import { activities } from "@/data/public/homeData";

const ICON_MAP = { Dumbbell, Palette, Music2, Monitor, Globe2, BookOpen };

export default function ActivitiesSection() {
  return (
    <section className="hp-activities reveal-section">
      <div className="section-container">
        <SectionHeading
          eyebrow="EXTRACURRICULAR"
          title="Activities That Bring Out the Best"
          subtitle="Beyond the classroom, Laurel offers a rich programme of clubs, sports, and creative pursuits."
          centered
          light
        />
        <div className="hp-activities__grid">
          {activities.map(({ icon, label, desc }) => {
            const Icon = ICON_MAP[icon];
            return (
              <div key={label} className="hp-activity-card">
                <div className="hp-activity-card__icon" aria-hidden="true">
                  {Icon && <Icon size={26} strokeWidth={1.5} />}
                </div>
                <h3 className="hp-activity-card__label">{label}</h3>
                <p className="hp-activity-card__desc">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
