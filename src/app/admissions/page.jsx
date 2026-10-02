"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap, Star, BookOpen, Palette, Monitor,
  MessageSquare, Shield, Users, Heart, FileText,
  CheckCircle, ChevronDown, ChevronUp, ChevronRight,
  ChevronLeft, Upload, X, Loader2, AlertCircle,
  ClipboardList, UserCheck, Scroll, BadgeCheck, ArrowRight,
} from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import RevealObserver from "@/app/components/providers/RevealObserver";
import { createAdmission } from "@/lib/storage/admissions";
import {
  ADMISSION_CLASSES,
  ADMISSION_STEPS,
  ADMISSION_FAQS,
  REQUIRED_DOCUMENTS,
  HEAR_ABOUT_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from "@/data/public/admissionsData";

// ─────────────────────────────────────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────────────────────────────────────

const WHY_CARDS = [
  { icon: Star,          title: "Academic Excellence",   desc: "High expectations and outstanding academic outcomes across every year group." },
  { icon: Shield,        title: "Character Development", desc: "Integrity, empathy, and responsibility woven into every school day." },
  { icon: Palette,       title: "Creativity",            desc: "Arts, science, and project-based learning that spark imagination and innovation." },
  { icon: Monitor,       title: "Digital Literacy",      desc: "Modern labs and coding education that prepare children for tomorrow's world." },
  { icon: MessageSquare, title: "Communication",         desc: "Strong oral and written skills developed across every subject, every day." },
  { icon: Users,         title: "Collaboration",         desc: "Teamwork and peer learning embedded in daily school activities." },
  { icon: BookOpen,      title: "Confidence",            desc: "We celebrate every win and build the self-belief children need to thrive." },
  { icon: Heart,         title: "Holistic Development",  desc: "Social, emotional, physical, and academic growth — the whole child matters." },
];

const STEP_ICONS = [ClipboardList, FileText, UserCheck, Scroll, BadgeCheck];

const FORM_STEPS = [
  "Child Information",
  "Parent / Guardian",
  "Previous School",
  "Additional Info",
  "Documents",
  "Review & Submit",
];

const INITIAL_FORM = {
  child:          { firstName: "", lastName: "", dateOfBirth: "", gender: "", preferredClass: "" },
  guardian:       { name: "", relationship: "", email: "", phone: "", address: "" },
  previousSchool: { name: "", previousClass: "", yearsAttended: "", reasonForLeaving: "" },
  additional:     { medicalNotes: "", additionalInfo: "", hearAbout: "" },
  documents:      {},
};

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

function validate(step, data) {
  const e = {};
  if (step === 0) {
    if (!data.child.firstName.trim())  e["child.firstName"]    = "First name is required.";
    if (!data.child.lastName.trim())   e["child.lastName"]     = "Last name is required.";
    if (!data.child.dateOfBirth)       e["child.dateOfBirth"]  = "Date of birth is required.";
    if (!data.child.gender)            e["child.gender"]       = "Please select a gender.";
    if (!data.child.preferredClass)    e["child.preferredClass"] = "Please select a preferred class.";
  }
  if (step === 1) {
    if (!data.guardian.name.trim())    e["guardian.name"]       = "Full name is required.";
    if (!data.guardian.relationship)   e["guardian.relationship"] = "Please select a relationship.";
    if (!data.guardian.email.trim()) {
      e["guardian.email"] = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guardian.email)) {
      e["guardian.email"] = "Please enter a valid email address.";
    }
    if (!data.guardian.phone.trim())   e["guardian.phone"]      = "Phone number is required.";
    if (!data.guardian.address.trim()) e["guardian.address"]    = "Address is required.";
  }
  return e;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared form primitives
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, required, error, children }) {
  return (
    <div className="af-field">
      <label className="af-label">
        {label}{required && <span className="af-required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span className="af-error" role="alert">
          <AlertCircle size={13} aria-hidden="true" /> {error}
        </span>
      )}
    </div>
  );
}

const Inp = ({ error, ...p }) => (
  <input className={`af-input${error ? " af-input--error" : ""}`} {...p} />
);

const Sel = ({ error, children, ...p }) => (
  <select className={`af-select${error ? " af-input--error" : ""}`} {...p}>{children}</select>
);

const Txt = (p) => <textarea className="af-textarea" {...p} />;

// ─────────────────────────────────────────────────────────────────────────────
// Form steps
// ─────────────────────────────────────────────────────────────────────────────

function StepChild({ data, errors, onChange }) {
  const set = (f) => (e) => onChange("child", f, e.target.value);
  return (
    <div className="af-step-body">
      <div className="af-row">
        <Field label="First Name" required error={errors["child.firstName"]}>
          <Inp value={data.firstName} onChange={set("firstName")} error={errors["child.firstName"]} placeholder="e.g. Aisha" autoComplete="given-name" />
        </Field>
        <Field label="Last Name" required error={errors["child.lastName"]}>
          <Inp value={data.lastName} onChange={set("lastName")} error={errors["child.lastName"]} placeholder="e.g. Ibrahim" autoComplete="family-name" />
        </Field>
      </div>
      <div className="af-row">
        <Field label="Date of Birth" required error={errors["child.dateOfBirth"]}>
          <Inp type="date" value={data.dateOfBirth} onChange={set("dateOfBirth")} error={errors["child.dateOfBirth"]} max={new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="Gender" required error={errors["child.gender"]}>
          <Sel value={data.gender} onChange={set("gender")} error={errors["child.gender"]}>
            <option value="">Select gender</option>
            <option>Male</option><option>Female</option>
          </Sel>
        </Field>
      </div>
      <Field label="Preferred Class" required error={errors["child.preferredClass"]}>
        <Sel value={data.preferredClass} onChange={set("preferredClass")} error={errors["child.preferredClass"]}>
          <option value="">Select a class</option>
          {ADMISSION_CLASSES.map((c) => <option key={c.value} value={c.value}>{c.label} — {c.ageRange}</option>)}
        </Sel>
      </Field>
    </div>
  );
}

function StepGuardian({ data, errors, onChange }) {
  const set = (f) => (e) => onChange("guardian", f, e.target.value);
  return (
    <div className="af-step-body">
      <div className="af-row">
        <Field label="Full Name" required error={errors["guardian.name"]}>
          <Inp value={data.name} onChange={set("name")} error={errors["guardian.name"]} placeholder="e.g. Fatima Ibrahim" autoComplete="name" />
        </Field>
        <Field label="Relationship to Child" required error={errors["guardian.relationship"]}>
          <Sel value={data.relationship} onChange={set("relationship")} error={errors["guardian.relationship"]}>
            <option value="">Select relationship</option>
            {RELATIONSHIP_OPTIONS.map((r) => <option key={r}>{r}</option>)}
          </Sel>
        </Field>
      </div>
      <div className="af-row">
        <Field label="Email Address" required error={errors["guardian.email"]}>
          <Inp type="email" value={data.email} onChange={set("email")} error={errors["guardian.email"]} placeholder="e.g. fatima@email.com" autoComplete="email" />
        </Field>
        <Field label="Phone Number" required error={errors["guardian.phone"]}>
          <Inp type="tel" value={data.phone} onChange={set("phone")} error={errors["guardian.phone"]} placeholder="+234 812 345 6789" autoComplete="tel" />
        </Field>
      </div>
      <Field label="Home Address" required error={errors["guardian.address"]}>
        <Txt value={data.address} onChange={set("address")} rows={3} placeholder="e.g. 14 Greenfield Close, Lekki Phase 1, Lagos" autoComplete="street-address" />
      </Field>
    </div>
  );
}

function StepPrevSchool({ data, onChange }) {
  const set = (f) => (e) => onChange("previousSchool", f, e.target.value);
  return (
    <div className="af-step-body">
      <p className="af-step-note">This section is optional for children applying to Early Years.</p>
      <Field label="Previous School Name">
        <Inp value={data.name} onChange={set("name")} placeholder="e.g. Sunshine Nursery School" />
      </Field>
      <div className="af-row">
        <Field label="Previous Class / Level">
          <Inp value={data.previousClass} onChange={set("previousClass")} placeholder="e.g. Nursery 2" />
        </Field>
        <Field label="Years Attended">
          <Inp value={data.yearsAttended} onChange={set("yearsAttended")} placeholder="e.g. 2023 – 2026" />
        </Field>
      </div>
      <Field label="Reason for Leaving">
        <Txt value={data.reasonForLeaving} onChange={set("reasonForLeaving")} rows={3} placeholder="e.g. Seeking a stronger academic programme" />
      </Field>
    </div>
  );
}

function StepAdditional({ data, onChange }) {
  const set = (f) => (e) => onChange("additional", f, e.target.value);
  return (
    <div className="af-step-body">
      <Field label="Medical / Special Learning Notes">
        <Txt value={data.medicalNotes} onChange={set("medicalNotes")} rows={3} placeholder="Any allergies, conditions, or learning needs we should know about (optional)" />
      </Field>
      <Field label="Additional Information">
        <Txt value={data.additionalInfo} onChange={set("additionalInfo")} rows={3} placeholder="Anything else you'd like us to know about your child (optional)" />
      </Field>
      <Field label="How did you hear about us?">
        <Sel value={data.hearAbout} onChange={set("hearAbout")}>
          <option value="">Select an option</option>
          {HEAR_ABOUT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </Sel>
      </Field>
    </div>
  );
}

function StepDocuments({ documents, onAdd, onRemove }) {
  function handleFile(docId, e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5 MB.");
      return;
    }
    onAdd(docId, { name: file.name, size: file.size, type: file.type, simulatedAt: new Date().toISOString() });
    e.target.value = "";
  }
  return (
    <div className="af-step-body">
      <p className="af-step-note">Upload documents as PDF, JPG, or PNG. Max 5 MB per file. <span className="af-required">*</span> indicates a required document.</p>
      <div className="af-docs__list">
        {REQUIRED_DOCUMENTS.map((doc) => {
          const uploaded = documents[doc.id];
          return (
            <div key={doc.id} className={`af-doc-item${uploaded ? " af-doc-item--uploaded" : ""}`}>
              <div className="af-doc-item__info">
                <FileText size={18} aria-hidden="true" />
                <span className="af-doc-item__label">{doc.label}{doc.required && <span className="af-required" aria-hidden="true"> *</span>}</span>
              </div>
              {uploaded ? (
                <div className="af-doc-item__uploaded">
                  <span className="af-doc-item__filename"><CheckCircle size={13} aria-hidden="true" /> {uploaded.name}</span>
                  <button type="button" className="af-doc-item__remove" onClick={() => onRemove(doc.id)} aria-label={`Remove ${doc.label}`}><X size={13} /></button>
                </div>
              ) : (
                <label className="af-doc-item__upload-btn">
                  <Upload size={13} aria-hidden="true" /> Choose File
                  <input type="file" accept={doc.accept} className="af-doc-item__file-input" onChange={(e) => handleFile(doc.id, e)} aria-label={`Upload ${doc.label}`} />
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="af-review-row">
      <span className="af-review-row__label">{label}</span>
      <span className="af-review-row__value">{value}</span>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="af-review-section">
      <div className="af-review-section__header">
        <h3 className="af-review-section__title">{title}</h3>
        <button type="button" className="af-review-section__edit" onClick={onEdit}>Edit</button>
      </div>
      <div className="af-review-section__body">{children}</div>
    </div>
  );
}

function StepReview({ formData, onGoTo }) {
  const { child, guardian, previousSchool, additional, documents } = formData;
  const docs = Object.entries(documents).filter(([, v]) => v);
  return (
    <div className="af-step-body af-review">
      <p className="af-step-note">Please review your application before submitting. Use the Edit buttons to make changes.</p>
      <ReviewSection title="Child Information" onEdit={() => onGoTo(0)}>
        <ReviewRow label="Name"           value={`${child.firstName} ${child.lastName}`} />
        <ReviewRow label="Date of Birth"  value={child.dateOfBirth} />
        <ReviewRow label="Gender"         value={child.gender} />
        <ReviewRow label="Preferred Class" value={child.preferredClass} />
      </ReviewSection>
      <ReviewSection title="Parent / Guardian" onEdit={() => onGoTo(1)}>
        <ReviewRow label="Name"         value={guardian.name} />
        <ReviewRow label="Relationship" value={guardian.relationship} />
        <ReviewRow label="Email"        value={guardian.email} />
        <ReviewRow label="Phone"        value={guardian.phone} />
        <ReviewRow label="Address"      value={guardian.address} />
      </ReviewSection>
      <ReviewSection title="Previous School" onEdit={() => onGoTo(2)}>
        {previousSchool.name
          ? <><ReviewRow label="School" value={previousSchool.name} /><ReviewRow label="Class" value={previousSchool.previousClass} /></>
          : <p className="af-review-empty">Not provided</p>}
      </ReviewSection>
      <ReviewSection title="Additional Information" onEdit={() => onGoTo(3)}>
        <ReviewRow label="Medical Notes" value={additional.medicalNotes || "None"} />
        <ReviewRow label="Heard via"     value={additional.hearAbout || "Not specified"} />
      </ReviewSection>
      <ReviewSection title="Documents" onEdit={() => onGoTo(4)}>
        {docs.length > 0
          ? docs.map(([id, d]) => <div key={id} className="af-review-row"><CheckCircle size={13} style={{ color: "#16a34a", flexShrink: 0, marginTop: 2 }} /><span className="af-review-row__value">{d.name}</span></div>)
          : <p className="af-review-empty">No documents uploaded.</p>}
      </ReviewSection>
    </div>
  );
}

function Confirmation({ application }) {
  const d = new Date(application.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="af-confirmation" role="alert" aria-live="polite">
      <div className="af-confirmation__icon"><CheckCircle size={52} strokeWidth={1.5} /></div>
      <h2 className="af-confirmation__heading">Application Submitted!</h2>
      <p className="af-confirmation__message">Thank you for applying to Laurel Children Academy. Our admissions team will review your application and contact you with the next steps within 1–2 working weeks.</p>
      <div className="af-confirmation__card">
        {[
          ["Application ID", <strong className="af-confirmation__appid">{application.applicationId}</strong>],
          ["Child", <strong>{application.child?.firstName} {application.child?.lastName}</strong>],
          ["Preferred Class", <strong>{application.child?.preferredClass}</strong>],
          ["Submitted", <strong>{d}</strong>],
          ["Status", <span className="af-status-badge af-status-badge--submitted">Submitted</span>],
        ].map(([label, val]) => (
          <div key={label} className="af-confirmation__row">
            <span>{label}</span>{val}
          </div>
        ))}
      </div>
      <p className="af-confirmation__id-note">Save your Application ID: <strong>{application.applicationId}</strong>. Use it to check your status anytime.</p>
      <div className="af-confirmation__actions">
        <Link href="/admissions/status" className="af-btn af-btn--primary">Check Application Status</Link>
        <Link href="/" className="af-btn af-btn--secondary">Return to Home</Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationForm orchestrator
// ─────────────────────────────────────────────────────────────────────────────

function ApplicationForm() {
  const [step, setStep]         = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [busy, setBusy]         = useState(false);
  const [submitErr, setSubmitErr] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const topRef = useRef(null);

  const scrollTop = useCallback(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);

  function handleChange(section, field, value) {
    setFormData((p) => ({ ...p, [section]: { ...p[section], [field]: value } }));
    const key = `${section}.${field}`;
    if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  }

  function addDoc(id, meta)  { setFormData((p) => ({ ...p, documents: { ...p.documents, [id]: meta } })); }
  function removeDoc(id)     { setFormData((p) => { const d = { ...p.documents }; delete d[id]; return { ...p, documents: d }; }); }

  function next() {
    const errs = validate(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); scrollTop(); return; }
    setErrors({});
    setStep((s) => s + 1);
    scrollTop();
  }

  function back() { setErrors({}); setStep((s) => s - 1); scrollTop(); }
  function goTo(n) { setErrors({}); setStep(n); scrollTop(); }

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setSubmitErr(null);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      const saved = createAdmission({ child: formData.child, guardian: formData.guardian, previousSchool: formData.previousSchool, additional: formData.additional, documents: formData.documents });
      setSubmitted(saved);
      scrollTop();
    } catch {
      setSubmitErr("Something went wrong. Please try again.");
    } finally { setBusy(false); }
  }

  const progress = Math.round((step / FORM_STEPS.length) * 100);

  if (submitted) return <Confirmation application={submitted} />;

  return (
    <div className="af-wrapper" ref={topRef} id="application-form">
      {/* Progress */}
      <div className="af-stepper">
        <div className="af-progress-bar">
          <div className="af-progress-bar__fill" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <div className="af-steps-row">
          {FORM_STEPS.map((title, i) => (
            <div key={i} className={["af-step-indicator", i < step ? "af-step-indicator--done" : "", i === step ? "af-step-indicator--active" : ""].filter(Boolean).join(" ")}>
              <div className="af-step-indicator__circle" aria-hidden="true">
                {i < step ? <CheckCircle size={15} /> : <span>{i + 1}</span>}
              </div>
              <span className="af-step-indicator__label">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step heading */}
      <div className="af-step-header">
        <h2 className="af-step-heading">{FORM_STEPS[step]}</h2>
        <span className="af-step-counter">Step {step + 1} of {FORM_STEPS.length}</span>
      </div>

      <form onSubmit={submit} noValidate>
        {step === 0 && <StepChild      data={formData.child}          errors={errors} onChange={handleChange} />}
        {step === 1 && <StepGuardian   data={formData.guardian}       errors={errors} onChange={handleChange} />}
        {step === 2 && <StepPrevSchool data={formData.previousSchool} onChange={handleChange} />}
        {step === 3 && <StepAdditional data={formData.additional}     onChange={handleChange} />}
        {step === 4 && <StepDocuments  documents={formData.documents} onAdd={addDoc} onRemove={removeDoc} />}
        {step === 5 && <StepReview     formData={formData}            onGoTo={goTo} />}

        {submitErr && (
          <div className="af-submit-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" /> {submitErr}
          </div>
        )}

        <div className="af-nav">
          {step > 0 && (
            <button type="button" className="af-btn af-btn--back" onClick={back}>
              <ChevronLeft size={17} aria-hidden="true" /> Back
            </button>
          )}
          <div className="af-nav__spacer" />
          {step < FORM_STEPS.length - 1 ? (
            <button type="button" className="af-btn af-btn--next" onClick={next}>
              Continue <ChevronRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" className="af-btn af-btn--submit" disabled={busy}>
              {busy ? <><Loader2 size={17} className="af-spinner" aria-hidden="true" /> Submitting…</> : <>Submit Application <ChevronRight size={17} /></>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Accordion
// ─────────────────────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="adm-faq__list">
      {ADMISSION_FAQS.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? " faq-item--open" : ""}`}>
          <button className="faq-item__question" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`adm-faq-${i}`}>
            <span>{item.q}</span>
            {open === i ? <ChevronUp size={17} aria-hidden="true" /> : <ChevronDown size={17} aria-hidden="true" />}
          </button>
          <div id={`adm-faq-${i}`} className="faq-item__answer"><p>{item.a}</p></div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdmissionsPage() {
  function scrollToForm(e) {
    e.preventDefault();
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="admissions-page">
      {/* Install scroll-reveal observer (this page doesn't use PageHero) */}
      <RevealObserver />

      {/* ── 1. Hero ──────────────────────────────────────────── */}
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
          <h1 className="adm-hero__title">Give Your Child<br />a Strong Start.</h1>
          <p className="adm-hero__subtitle">
            Discover a nurturing learning environment where children are encouraged to explore,
            grow, create, and build the confidence they need for tomorrow.
          </p>
          <div className="adm-hero__ctas">
            <a href="#application-form" className="adm-hero__btn adm-hero__btn--primary" onClick={scrollToForm}>
              Start an Application
            </a>
            <Link href="/about" className="adm-hero__btn adm-hero__btn--secondary">
              Learn About Laurel
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Why Laurel ────────────────────────────────────── */}
      <section className="adm-why section-container reveal-section">
        <SectionHeading
          eyebrow="WHY LAUREL"
          title="A Learning Environment Designed Around Every Child"
          subtitle="Eight values that shape everything we do at Laurel Children Academy."
          centered
        />
        <div className="adm-why__grid">
          {WHY_CARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="adm-why-card">
              <div className="adm-why-card__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></div>
              <h3 className="adm-why-card__label">{title}</h3>
              <p className="adm-why-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Admission Process ─────────────────────────────── */}
      <section className="adm-process reveal-section" id="admission-process">
        <div className="section-container">
          <SectionHeading
            eyebrow="THE PROCESS"
            title="Our Admissions Process"
            subtitle="Simple, transparent, and designed with families in mind."
            centered light
          />
          <div className="adm-process__steps">
            {ADMISSION_STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={s.n} className="adm-process-step">
                  <div className="adm-process-step__num" aria-hidden="true">{s.n}</div>
                  <div className="adm-process-step__icon" aria-hidden="true">
                    {Icon && <Icon size={28} strokeWidth={1.5} />}
                  </div>
                  <h3 className="adm-process-step__title">{s.title}</h3>
                  <p className="adm-process-step__desc">{s.desc}</p>
                  {i < ADMISSION_STEPS.length - 1 && <div className="adm-process-step__connector" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Available Classes ─────────────────────────────── */}
      <section className="adm-classes section-container reveal-section">
        <SectionHeading eyebrow="AVAILABLE CLASSES" title="Find the Right Level for Your Child" centered />
        <div className="adm-classes__grid">
          {ADMISSION_CLASSES.map((cls) => (
            <div key={cls.value} className="adm-class-card">
              <div className="adm-class-card__icon" aria-hidden="true"><GraduationCap size={24} strokeWidth={1.5} /></div>
              <h3 className="adm-class-card__name">{cls.label}</h3>
              <span className="adm-class-card__age">{cls.ageRange}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Requirements ──────────────────────────────────── */}
      <section className="adm-reqs reveal-section">
        <div className="section-container">
          <SectionHeading eyebrow="REQUIREMENTS" title="What You'll Need" subtitle="Gather these items before you begin your application." centered />
          <div className="adm-reqs__grid">
            <div className="adm-reqs__col">
              <h3 className="adm-reqs__col-title"><FileText size={18} aria-hidden="true" /> Required Documents</h3>
              <ul className="adm-reqs__list">
                {REQUIRED_DOCUMENTS.map((doc) => (
                  <li key={doc.id} className="adm-reqs__item">
                    <CheckCircle size={15} aria-hidden="true" />
                    {doc.label}
                    {doc.required && <span className="adm-reqs__required">Required</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="adm-reqs__col">
              <h3 className="adm-reqs__col-title"><CheckCircle size={18} aria-hidden="true" /> Age Requirements</h3>
              <table className="admissions-age-table" aria-label="Age requirements by class level">
                <thead><tr><th>Class Level</th><th>Age Range</th></tr></thead>
                <tbody>
                  {ADMISSION_CLASSES.map((c) => <tr key={c.value}><td>{c.label}</td><td>{c.ageRange}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Application Form ──────────────────────────────── */}
      <section className="adm-form-section section-container reveal-section">
        <SectionHeading eyebrow="APPLY NOW" title="Start Your Application" subtitle="Complete the form below. It takes about 10 minutes." centered />
        <ApplicationForm />
      </section>

      {/* ── 7. Status CTA ────────────────────────────────────── */}
      <section className="adm-status-cta section-container reveal-section">
        <div className="adm-status-cta__inner">
          <div>
            <h2 className="adm-status-cta__title">Already Applied?</h2>
            <p className="adm-status-cta__desc">Use your Application ID to check the status of your application at any time.</p>
          </div>
          <Link href="/admissions/status" className="adm-status-cta__btn">
            Check Application Status <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────── */}
      <section className="adm-faq section-container reveal-section">
        <SectionHeading eyebrow="FAQ" title="Common Questions" centered />
        <FaqAccordion />
      </section>

      {/* ── 9. Final CTA ─────────────────────────────────────── */}
      <section className="adm-final-cta reveal-section">
        <div className="adm-final-cta__inner section-container">
          <p className="adm-final-cta__eyebrow">GET STARTED</p>
          <h2 className="adm-final-cta__title">Ready to Begin Your Child's Journey?</h2>
          <p className="adm-final-cta__subtitle">Take the first step toward a nurturing learning experience at Laurel Children Academy.</p>
          <div className="adm-final-cta__btns">
            <a href="#application-form" className="adm-hero__btn adm-hero__btn--primary" onClick={scrollToForm}>
              Start Your Application
            </a>
            <Link href="/about" className="adm-hero__btn adm-hero__btn--secondary">
              Explore Our School
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
