import Image from "next/image";
import {
  GraduationCap, Brain, Lightbulb,
  Calculator, BookOpen, FlaskConical, Globe2, Monitor,
  Scale, Palette, Dumbbell, Church, Languages,
  Sparkles, Mic2, MessageSquare, Users2, Shield,
} from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";

export const metadata = {
  title: "Academics",
  description:
    "Explore the Laurel Children Academy curriculum — from Early Years to Primary 6. A rigorous, inspiring academic programme that nurtures every child's potential.",
};

const levels = [
  { num: "01", name: "Early Years",  age: "Ages 3–5",  desc: "A play-based foundation that ignites curiosity, builds language, and develops fine and gross motor skills through structured exploration." },
  { num: "02", name: "Primary 1",   age: "Age 6",     desc: "Children begin formal literacy and numeracy, establishing strong reading foundations and number sense through engaging, hands-on lessons." },
  { num: "03", name: "Primary 2",   age: "Age 7",     desc: "Expanding on core skills, pupils begin writing longer texts, solving multi-step problems, and exploring the natural and social world around them." },
  { num: "04", name: "Primary 3",   age: "Age 8",     desc: "A pivotal year for independent thinking. Pupils tackle more complex mathematics, begin research projects, and develop their unique writing voice." },
  { num: "05", name: "Primary 4",   age: "Age 9",     desc: "Pupils engage deeply with science, begin studying French, and take on leadership roles in class activities and collaborative projects." },
  { num: "06", name: "Primary 5",   age: "Age 10",    desc: "Critical thinking and analytical skills take centre stage as pupils prepare for transition exams, deepen subject knowledge, and lead school life." },
  { num: "07", name: "Primary 6",   age: "Age 11",    desc: "The capstone year. Pupils consolidate all learning, prepare for secondary school entrance, and graduate as confident, well-rounded young learners." },
];

const subjects = [
  { icon: Calculator,   name: "Mathematics" },
  { icon: BookOpen,     name: "English Language" },
  { icon: FlaskConical, name: "Basic Science" },
  { icon: Globe2,       name: "Social Studies" },
  { icon: Monitor,      name: "Computer Studies" },
  { icon: Scale,        name: "Civic Education" },
  { icon: Palette,      name: "Creative Arts" },
  { icon: Dumbbell,     name: "Physical & Health Education" },
  { icon: Church,       name: "Religious Studies" },
  { icon: Languages,    name: "French" },
];

const pillars = [
  { icon: Sparkles,      name: "Creativity",      desc: "Every subject is taught through creative lenses." },
  { icon: GraduationCap, name: "Confidence",       desc: "Children present, lead, and express freely." },
  { icon: Mic2,          name: "Communication",    desc: "Strong oral and written skills developed daily." },
  { icon: Users2,        name: "Collaboration",    desc: "Peer projects and group work are core practice." },
  { icon: Shield,        name: "Character",        desc: "Values education runs through everything we do." },
];

export default function AcademicsPage() {
  return (
    <main className="academics-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="Our Academic Programme"
        subtitle="A rigorous, well-rounded curriculum designed to nurture each child's unique potential."
        breadcrumb="Academics"
        imageSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=85&fit=crop"
        imageAlt="Students engaged in a science and creative activity"
      />

      {/* ── Learning Philosophy ───────────────────────────────── */}
      <section className="acad-philosophy section-container reveal-section">
        <div className="acad-philosophy__inner">
          <div className="acad-philosophy__text">
            <SectionHeading
              eyebrow="OUR APPROACH"
              title="Learning That Inspires"
              subtitle="We believe learning happens best when children feel safe, valued, and genuinely curious."
            />
            <div className="acad-philosophy__points">
              <div className="acad-philosophy__point">
                <div className="acad-philosophy__point-icon" aria-hidden="true">
                  <GraduationCap size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="acad-philosophy__point-title">Child-Led Discovery</h3>
                  <p className="acad-philosophy__point-desc">
                    Our teachers act as facilitators, guiding children toward their own discoveries
                    rather than simply delivering information. Every lesson is designed to provoke
                    questions, not just supply answers.
                  </p>
                </div>
              </div>
              <div className="acad-philosophy__point">
                <div className="acad-philosophy__point-icon" aria-hidden="true">
                  <Brain size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="acad-philosophy__point-title">Mastery Before Pace</h3>
                  <p className="acad-philosophy__point-desc">
                    We never rush a child who is still building understanding. Our curriculum
                    is structured to ensure deep mastery at each stage before progression,
                    so no learner is left with gaps in foundational knowledge.
                  </p>
                </div>
              </div>
              <div className="acad-philosophy__point">
                <div className="acad-philosophy__point-icon" aria-hidden="true">
                  <Lightbulb size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="acad-philosophy__point-title">Real-World Relevance</h3>
                  <p className="acad-philosophy__point-desc">
                    Subjects are connected to the real world throughout. From market mathematics
                    to science experiments to local history, learning at Laurel makes sense
                    to children because it relates to their actual lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="acad-philosophy__image">
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fit=crop"
              alt="Students in science activity"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* ── Academic Levels ───────────────────────────────────── */}
      <section className="acad-levels reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="ACADEMIC LEVELS"
            title="From Early Years to Primary 6"
            subtitle="Seven carefully designed stages, each building on the last."
            centered
          />
          <div className="acad-levels__grid">
            {levels.map((lvl) => (
              <div key={lvl.num} className="acad-level-card">
                <span className="acad-level-card__num" aria-hidden="true">{lvl.num}</span>
                <div className="acad-level-card__body">
                  <h3 className="acad-level-card__name">{lvl.name}</h3>
                  <span className="acad-level-card__age">{lvl.age}</span>
                  <p className="acad-level-card__desc">{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ──────────────────────────────────────────── */}
      <section className="acad-subjects section-container reveal-section">
        <SectionHeading
          eyebrow="CURRICULUM"
          title="10 Core Subjects"
          subtitle="A broad, balanced curriculum that gives every child the knowledge and skills they need."
          centered
        />
        <div className="acad-subjects__grid">
          {subjects.map(({ icon: Icon, name }) => (
            <div key={name} className="acad-subject-card">
              <div className="acad-subject-card__icon" aria-hidden="true">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span className="acad-subject-card__name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Holistic Development ──────────────────────────────── */}
      <section className="acad-holistic reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="BEYOND ACADEMICS"
            title="Education for the Whole Child"
            subtitle="Academic achievement is just one dimension of what we nurture at Laurel."
            centered
            light
          />
          <div className="acad-holistic__grid">
            {pillars.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="acad-pillar">
                <div className="acad-pillar__icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="acad-pillar__name">{name}</h3>
                <p className="acad-pillar__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="peach"
        title="Discover What Your Child Can Achieve"
        subtitle="Join a school that takes every child's potential seriously."
        primaryLabel="Apply Now"
        primaryHref="/admissions"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      />
    </main>
  );
}
