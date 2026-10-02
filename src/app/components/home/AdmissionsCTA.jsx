import Image from "next/image";
import Link from "next/link";

export default function AdmissionsCTA() {
  return (
    <section className="hp-admissions-cta reveal-section" aria-label="Admissions call to action">
      <div className="hp-admissions-cta__bg">
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80&fit=crop"
          alt=""
          fill
          aria-hidden="true"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="hp-admissions-cta__overlay" aria-hidden="true" />
      <div className="hp-admissions-cta__content section-container">
        <p className="hp-admissions-cta__eyebrow">ADMISSIONS OPEN</p>
        <h2 className="hp-admissions-cta__title">
          Give Your Child a Strong Start.
        </h2>
        <p className="hp-admissions-cta__subtitle">
          Discover a learning environment where curiosity grows, confidence develops,
          and every child has room to thrive. Applications are open for 2027/2028.
        </p>
        <div className="hp-admissions-cta__btns">
          <Link href="/admissions" className="hp-admissions-cta__btn hp-admissions-cta__btn--primary">
            Apply for Admission
          </Link>
          <Link href="/about" className="hp-admissions-cta__btn hp-admissions-cta__btn--secondary">
            Explore Our School
          </Link>
        </div>
      </div>
    </section>
  );
}
