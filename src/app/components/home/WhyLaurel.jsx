import {
  GraduationCap, Shield, Palette,
  Monitor, MessageSquare, Users,
} from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import { whyFeatures } from "@/data/public/homeData";

const ICON_MAP = { GraduationCap, Shield, Palette, Monitor, MessageSquare, Users };

export default function WhyLaurel() {
  return (
    <section className="hp-why reveal-section">
      <div className="section-container">
        <SectionHeading
          eyebrow="WHY LAUREL"
          title="An Education That Goes Beyond the Classroom"
          subtitle="Six reasons thousands of Lagos families choose Laurel Children Academy for their children."
          centered
        />
        <div className="hp-why__grid">
          {whyFeatures.map(({ icon, title, desc }) => {
            const Icon = ICON_MAP[icon];
            return (
              <div key={title} className="hp-why-card">
                <div className="hp-why-card__icon" aria-hidden="true">
                  {Icon && <Icon size={24} strokeWidth={1.5} />}
                </div>
                <h3 className="hp-why-card__title">{title}</h3>
                <p className="hp-why-card__desc">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
