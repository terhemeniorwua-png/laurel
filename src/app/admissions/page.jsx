"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, BookOpen, Palette, Monitor, MessageSquare, Shield, Users, Heart,
  FileText, CheckCircle, ChevronDown, ChevronUp, GraduationCap,
  ClipboardList, UserCheck, Scroll, BadgeCheck,
} from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";
import AdmissionForm from "@/app/components/public/AdmissionForm";
import {
  ADMISSION_CLASSES,
  ADMISSION_STEPS,
  ADMISSION_FAQS,
  REQUIRED_DOCUMENTS,
} from "@/data/public/admissionsData";

// ── Why Laurel cards ──────────────────────────────────────────────────────────
const WHY_CARDS = [
  { icon: Star,          label: "Academic Excellence",    desc: "High expectations and outstanding academic outcomes from Early Years through Primary 6." },
  { icon: Shield,        label: "Character Development",  desc: "We build integrity, empathy, and responsibility alongside academic achievement." },
  { icon: Palette,       label: "Creativity",             desc: "Arts, science, and project-based learning spark imagination and innovation every day." },
  { icon: Monitor,       label: "Digital Literacy",       desc: "Modern computer labs and coding education prepare children for tomorrow's world." },
  { icon: MessageSquare, label: "Communication",          desc: "Strong oral and written communication skills developed across every subject." },
  { icon: BookOpen,      label: "Confidence",             desc: "We celebrate every win and build the self-belief children need to thrive." },
  { icon: Users,         label: "Collaboration",          desc: "Teamwork, peer learning, and leadership are embedded in our daily school life." },
  { icon: Heart,         label: "Holistic Development",   desc: "Social, emotional, physical, and academic growth — the whole child matters here." },
];

// Step icons
const STEP_ICONS = [ClipboardList, FileText, UserCheck, Scroll, BadgeCheck];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="adm-faq__list">
      {ADMISSION_FAQS.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? " faq-item--open" : ""}`}>
          <button
            className="faq-item__question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`adm-faq-${i}`}
          >
            <span>{item.q}</span>
            {open === i ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
          </button>
          <div id={`adm-faq-${i}`} className="faq-item__answer">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdmissionsPage() {
  function scrollToForm(e) {
    e.preventDefault();
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="admissions-page">
      {/* 1. Hero */}
      <section className="adm-hero">
        <div className="adm-hero__bg">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85&fit=crop"
            alt="Laurel Children Academy students"
            fill priority quality={85}
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="adm-hero__overlay" aria-hidden="true" />
        <div className="adm-hero__content section-container">
          <p className="adm-hero__eyebrow">ADMISSIONS 2027/2028</p>
          <h1 className="adm-hero__title">Give Your Child<br />a Strong Start</h1>
          <p className="adm-hero__subtitle">
            Begin your child's journey at Laurel Children Academy. Our admissions process
            is simple, transparent, and welcoming for every family.
          </p>
          <div className="adm-hero__ctas">
            <a href="#application-form" className="adm-hero__btn adm-hero__btn--primary" onClick={scrollToForm}>
              Start Application
            </a>
            <a href="#admission-process" className="adm-hero__btn adm-hero__btn--secondary">
              View Process
            </a>
          </div>
        </div>
      </section>

      {/* 2. Why Laurel */}
      <section className="adm-why section-container reveal-section">
        <SectionHeading
          eyebrow="WHY LAUREL"
          title="More Than a School"
          subtitle="Thousands of Lagos families trust Laurel Children Academy with their children's most important years."
          centered
        />
        <div className="adm-why__grid">
          {WHY_CARDS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="adm-why-card">
              <div className="adm-why-card__icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="adm-why-card__label">{label}</h3>
              <p className="adm-why-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Admission Process */}
      <section className="adm-process reveal-section" id="admission-process">
        <div className="section-container">
          <SectionHeading
            eyebrow="THE PROCESS"
            title="Simple, Transparent, Welcoming"
            subtitle="From application to enrolment — here is what to expect."
            centered
            light
          />
          <div className="adm-process__steps">
            {ADMISSION_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={step.n} className="adm-process-step">
                  <div className="adm-process-step__num" aria-hidden="true">{step.n}</div>
                  <div className="adm-process-step__icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="adm-process-step__title">{step.title}</h3>
                  <p className="adm-process-step__desc">{step.desc}</p>
                  {i < ADMISSION_STEPS.length - 1 && <div className="adm-process-step__connector" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Available Classes */}
      <section className="adm-classes section-container reveal-section">
        <SectionHeading
          eyebrow="AVAILABLE CLASSES"
          title="Find the Right Level for Your Child"
          centered
        />
        <div className="adm-classes__grid">
          {ADMISSION_CLASSES.map((cls) => (
            <div key={cls.value} className="adm-class-card">
              <div className="adm-class-card__icon" aria-hidden="true">
                <GraduationCap size={24} strokeWidth={1.5} />
              </div>
              <h3 className="adm-class-card__name">{cls.label}</h3>
              <span className="adm-class-card__age">{cls.ageRange}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Requirements */}
      <section className="adm-reqs reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="REQUIREMENTS"
            title="What You Will Need"
            subtitle="Gather these items before you begin your application."
            centered
          />
          <div className="adm-reqs__grid">
            <div className="adm-reqs__col">
              <h3 className="adm-reqs__col-title">
                <FileText size={18} aria-hidden="true" /> Required Documents
              </h3>
              <ul className="adm-reqs__list">
                {REQUIRED_DOCUMENTS.map((doc) => (
                  <li key={doc.id} className="adm-reqs__item">
                    <CheckCircle size={16} aria-hidden="true" />
                    {doc.label}
                    {doc.required && <span className="adm-reqs__required">Required</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="adm-reqs__col">
              <h3 className="adm-reqs__col-title">
                <CheckCircle size={18} aria-hidden="true" /> Age Requirements
              </h3>
              <table className="admissions-age-table" aria-label="Age requirements by class level">
                <thead>
                  <tr><th>Class Level</th><th>Age Range</th></tr>
                </thead>
                <tbody>
                  {ADMISSION_CLASSES.map((c) => (
                    <tr key={c.value}><td>{c.label}</td><td>{c.ageRange}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Application Form */}
      <section className="adm-form-section section-container reveal-section">
        <SectionHeading
          eyebrow="APPLY NOW"
          title="Start Your Application"
          subtitle="Complete the form below. It takes about 10 minutes."
          centered
        />
        <AdmissionForm />
      </section>

      {/* 7. Status checker CTA */}
      <section className="adm-status-cta section-container reveal-section">
        <div className="adm-status-cta__inner">
          <div>
            <h2 className="adm-status-cta__title">Already Applied?</h2>
            <p className="adm-status-cta__desc">Use your Application ID to check the status of your application at any time.</p>
          </div>
          <Link href="/admissions/status" className="adm-status-cta__btn">
            Check Application Status
          </Link>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="adm-faq section-container reveal-section">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions"
          centered
        />
        <FaqAccordion />
      </section>

      {/* 9. CTA */}
      <CTABanner
        variant="brown"
        title="Ready to Begin?"
        subtitle="Spaces for the 2027/2028 session are limited. Apply today."
        primaryLabel="Start Application"
        primaryHref="#application-form"
        secondaryLabel="Contact Admissions"
        secondaryHref="/contact"
      />
    </main>
  );
}
