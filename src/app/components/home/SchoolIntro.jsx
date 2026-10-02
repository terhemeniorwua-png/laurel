import Image from "next/image";
import Link from "next/link";

export default function SchoolIntro() {
  return (
    <section className="hp-intro section-container reveal-section">
      <div className="hp-intro__inner">
        <div className="hp-intro__text">
          <span className="hp-intro__eyebrow">ABOUT LAUREL CHILDREN ACADEMY</span>
          <h2 className="hp-intro__heading">
            Where Every Child Is Seen, Supported, and Inspired.
          </h2>
          <p className="hp-intro__body">
            At Laurel Children Academy, we believe every child carries unique gifts
            waiting to be discovered. Our warm, structured learning environment
            nurtures curiosity, encourages creativity, and builds the academic
            confidence each child needs to flourish — today and for life.
          </p>
          <p className="hp-intro__body">
            Since 2010, thousands of Lagos families have trusted us with their
            children's most formative years. We are proud of every pupil who has
            walked through our doors and grown into a confident, capable young person.
          </p>
          <div className="hp-intro__links">
            <Link href="/about" className="hp-link hp-link--primary">
              Our Story
            </Link>
            <Link href="/academics" className="hp-link hp-link--secondary">
              Our Curriculum
            </Link>
          </div>
        </div>

        <div className="hp-intro__image-stack">
          <div className="hp-intro__img hp-intro__img--main">
            <Image
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80&fit=crop"
              alt="Students learning together in a Laurel classroom"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="hp-intro__img hp-intro__img--accent">
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80&fit=crop"
              alt="Students in a science activity"
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="hp-intro__badge" aria-hidden="true">
            <span className="hp-intro__badge-num">10+</span>
            <span className="hp-intro__badge-text">Years of Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
