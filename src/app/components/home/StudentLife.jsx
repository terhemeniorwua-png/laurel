import Image from "next/image";
import SectionHeading from "@/app/components/public/SectionHeading";
import { studentLifeImages } from "@/data/public/homeData";

export default function StudentLife() {
  return (
    <section className="hp-student-life reveal-section">
      <div className="section-container">
        <SectionHeading
          eyebrow="STUDENT LIFE"
          title="Learning, Growing, Thriving"
          subtitle="Life at Laurel is rich, vibrant, and full of possibility — inside and outside the classroom."
          centered
        />
        <div className="hp-life-grid">
          {studentLifeImages.map((img) => (
            <div key={img.src} className="hp-life-card">
              <div className="hp-life-card__img-wrap">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="hp-life-card__overlay" aria-hidden="true">
                <span className="hp-life-card__label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
