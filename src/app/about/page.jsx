import Image from "next/image";
import {
  Star, BookOpen, Palette, Monitor,
  MessageSquare, Shield, Users, Heart, CheckCircle,
} from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Laurel Children Academy — our story, mission, values, and the warm learning environment where every child is seen, supported, and inspired.",
};

const coreValues = [
  { icon: Star,          name: "Academic Excellence",    desc: "We hold high expectations for every learner and celebrate intellectual curiosity." },
  { icon: Shield,        name: "Character Development",  desc: "Integrity, empathy, and responsibility are woven into every school day." },
  { icon: Palette,       name: "Creativity",             desc: "We nurture imagination across arts, science, writing, and problem-solving." },
  { icon: Monitor,       name: "Digital Literacy",       desc: "Children graduate ready for a technology-driven world, not just today's one." },
  { icon: MessageSquare, name: "Communication",          desc: "Strong spoken and written expression is developed at every stage." },
  { icon: BookOpen,      name: "Confidence",             desc: "We build the self-belief every child needs to take on any challenge." },
  { icon: Users,         name: "Collaboration",          desc: "Teamwork and peer learning are core skills we practise daily." },
  { icon: Heart,         name: "Holistic Development",   desc: "Academic success is meaningful only when the whole child is thriving." },
];

const whyFeatures = [
  "Low teacher-to-pupil ratio for individual attention",
  "Experienced, qualified, and passionate educators",
  "Modern, well-equipped classrooms and facilities",
  "Safe, inclusive, and welcoming school environment",
  "Rich curriculum blending national standards and global best practice",
  "Strong parent-school partnership through the portal",
  "Digital learning embedded from Early Years",
  "Extracurricular clubs: sports, arts, computing, and more",
  "Structured character education programme",
];

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="About Laurel Children Academy"
        subtitle="Where every child is seen, supported, and inspired to reach their full potential."
        breadcrumb="About"
        imageSrc="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85&fit=crop"
        imageAlt="Students learning together at Laurel Children Academy"
      />

      {/* ── Our Story ─────────────────────────────────────────── */}
      <section className="about-story section-container reveal-section">
        <div className="about-story__inner">
          <div className="about-story__text">
            <SectionHeading
              eyebrow="OUR STORY"
              title="A School Built on Purpose"
              subtitle="More than a decade of educating the next generation of Nigeria's leaders."
            />
            <p className="body-text">
              Laurel Children Academy was founded in 2010 in the heart of Lagos, Nigeria, with a
              single compelling vision: to create a primary school where every child is genuinely
              known, valued, and challenged to grow. Our founders, a group of educators and parents
              frustrated by one-size-fits-all schooling, set out to build something different — a
              school that combines academic rigour with warmth, structure with creativity, and
              high expectations with deep care.
            </p>
            <p className="body-text">
              Over the past fifteen years, Laurel Children Academy has grown from a small founding
              cohort of forty pupils to a thriving community serving hundreds of families across
              Lagos. Through every year of growth, we have held fast to our founding belief that
              the quality of a child's primary education shapes the entire trajectory of their life.
            </p>
            <p className="body-text">
              Our approach to education is holistic and deliberate. We do not simply teach
              subjects — we develop thinkers, communicators, creators, and leaders. Every
              lesson, every interaction, every school event is an intentional investment in the
              child standing before us.
            </p>
          </div>

          <div className="about-story__image">
            <Image
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&fit=crop"
              alt="Students engaged in classroom activity"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────── */}
      <section className="about-mission reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="MISSION & VISION"
            title="Why We Exist and Where We Are Going"
            centered
          />
          <div className="about-mission__grid">
            <div className="about-mission-card about-mission-card--brown">
              <span className="about-mission-card__label">Our Mission</span>
              <h3 className="about-mission-card__title">What We Do, Every Day</h3>
              <p className="about-mission-card__text">
                To provide a nurturing, stimulating, and inclusive educational environment in which
                every child can discover their strengths, develop their character, and achieve
                academic excellence — supported by expert teachers, engaged parents, and a community
                that believes in their potential.
              </p>
            </div>
            <div className="about-mission-card about-mission-card--peach">
              <span className="about-mission-card__label">Our Vision</span>
              <h3 className="about-mission-card__title">The Future We Are Building</h3>
              <p className="about-mission-card__text">
                To become Nigeria's model primary school — an institution recognised not only for
                outstanding academic results, but for the confident, compassionate, and capable
                young people it sends out into the world. A school where every family is proud
                to belong and every child is proud to attend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────── */}
      <section className="about-values section-container reveal-section">
        <SectionHeading
          eyebrow="OUR VALUES"
          title="Principles That Guide Everything We Do"
          centered
        />
        <div className="about-values__grid">
          {coreValues.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="about-value-card">
              <div className="about-value-card__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="about-value-card__name">{name}</h3>
              <p className="about-value-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Laurel ────────────────────────────────────────── */}
      <section className="about-why reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="WHY CHOOSE US"
            title="An Education That Goes Beyond the Classroom"
            centered
            light
          />
          <div className="about-why__grid">
            {whyFeatures.map((feat) => (
              <div key={feat} className="about-why__item">
                <CheckCircle
                  className="about-why__item-icon"
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="about-why__item-text">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="peach"
        title="Ready to Join the Laurel Family?"
        subtitle="Applications are open for the 2027/2028 academic session. Take the first step today."
        primaryLabel="Start Application"
        primaryHref="/admissions"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </main>
  );
}
