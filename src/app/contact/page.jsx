"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";

const FAQS = [
  {
    q: "What are the admission requirements?",
    a: "Children must meet the age criteria for their desired class (e.g. Primary 1 requires ages 5–6). Required documents include a birth certificate, immunisation record, passport photograph, previous school report (if applicable), and a completed application form.",
  },
  {
    q: "What is the school calendar?",
    a: "Laurel Children Academy operates a three-term academic year running from September to July. The First Term runs September to December, Second Term from January to April, and Third Term from April to July, with half-term breaks within each.",
  },
  {
    q: "How are school fees structured?",
    a: "School fees are charged on a term-by-term basis and include tuition, books, and a school activity levy. Additional optional fees cover transport, uniform packages, and extracurricular club memberships. A detailed fee schedule is provided in the admissions pack.",
  },
  {
    q: "Is school transport available?",
    a: "Yes, Laurel Children Academy operates a school bus service covering multiple routes across Lagos including Lekki, Victoria Island, Ikoyi, Ajah, and Sangotedo. Routes and pick-up times are confirmed during the enrolment process.",
  },
  {
    q: "What extracurricular activities are offered?",
    a: "We offer a wide range of activities including football, basketball, table tennis, swimming, drama club, choir, painting and arts, robotics and coding club, debate society, and environmental awareness club. Activities run after school on designated days.",
  },
  {
    q: "How can parents communicate with teachers?",
    a: "Parents can communicate directly with class teachers through the Laurel School Portal messaging system, which is available 24/7. We also hold regular Parent-Teacher Association (PTA) meetings each term and maintain open office hours every Friday morning.",
  },
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

export default function ContactPage() {
  // Form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setFormStatus("loading");
    // Simulate async submission
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  }

  return (
    <main className="contact-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out and our team will respond within 24–48 hours."
        breadcrumb="Contact"
        imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85&fit=crop"
        imageAlt="Laurel Children Academy school entrance"
      />

      {/* ── Contact layout ────────────────────────────────────── */}
      <section className="section-container contact-body reveal-section">
        {/* LEFT — Info */}
        <div className="contact-info">
          <h2 className="contact-info__title">Get in Touch</h2>
          <p className="contact-info__intro">
            Our admissions team and school administration are always happy to answer
            your questions. Visit us, call us, or drop us a message below.
          </p>

          <ul className="contact-details" aria-label="Contact details">
            <li className="contact-detail-item">
              <div className="contact-detail-item__icon" aria-hidden="true"><MapPin size={20} strokeWidth={1.5} /></div>
              <div>
                <span className="contact-detail-item__label">Address</span>
                <span className="contact-detail-item__value">14 Greenfield Close, Lekki Phase 1, Lagos, Nigeria</span>
              </div>
            </li>
            <li className="contact-detail-item">
              <div className="contact-detail-item__icon" aria-hidden="true"><Phone size={20} strokeWidth={1.5} /></div>
              <div>
                <span className="contact-detail-item__label">Phone</span>
                <a href="tel:+2348123456789" className="contact-detail-item__value contact-detail-item__link">+234 812 345 6789</a>
              </div>
            </li>
            <li className="contact-detail-item">
              <div className="contact-detail-item__icon" aria-hidden="true"><Mail size={20} strokeWidth={1.5} /></div>
              <div>
                <span className="contact-detail-item__label">Email</span>
                <a href="mailto:info@laurelacademy.edu.ng" className="contact-detail-item__value contact-detail-item__link">info@laurelacademy.edu.ng</a>
              </div>
            </li>
            <li className="contact-detail-item">
              <div className="contact-detail-item__icon" aria-hidden="true"><Clock size={20} strokeWidth={1.5} /></div>
              <div>
                <span className="contact-detail-item__label">Office Hours</span>
                <span className="contact-detail-item__value">Monday – Friday, 7:30 AM – 4:30 PM</span>
              </div>
            </li>
          </ul>

          {/* Map placeholder */}
          <div className="contact-map-placeholder" role="img" aria-label="School location map placeholder">
            <MapPin size={32} aria-hidden="true" />
            <span>14 Greenfield Close, Lekki Phase 1</span>
            <span className="contact-map-placeholder__sub">Lagos, Nigeria</span>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="contact-form-wrapper">
          {formStatus === "success" ? (
            <div className="contact-success" role="alert">
              <CheckCircle size={48} className="contact-success__icon" aria-hidden="true" />
              <h3 className="contact-success__title">Message Received!</h3>
              <p className="contact-success__body">
                Thank you for reaching out to Laurel Children Academy. We will review your
                message and respond within 24–48 working hours.
              </p>
              <button className="contact-success__reset" onClick={() => { setForm({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" }); setFormStatus("idle"); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <h2 className="contact-form__heading">Send a Message</h2>

              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="cf-name">Full Name <span aria-hidden="true">*</span></label>
                <input id="cf-name" name="name" type="text" className={`contact-form__input${errors.name ? " contact-form__input--error" : ""}`} value={form.name} onChange={handleChange} autoComplete="name" aria-required="true" aria-describedby={errors.name ? "cf-name-err" : undefined} />
                {errors.name && <span id="cf-name-err" className="contact-form__error" role="alert">{errors.name}</span>}
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="cf-email">Email Address <span aria-hidden="true">*</span></label>
                  <input id="cf-email" name="email" type="email" className={`contact-form__input${errors.email ? " contact-form__input--error" : ""}`} value={form.email} onChange={handleChange} autoComplete="email" aria-required="true" aria-describedby={errors.email ? "cf-email-err" : undefined} />
                  {errors.email && <span id="cf-email-err" className="contact-form__error" role="alert">{errors.email}</span>}
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label" htmlFor="cf-phone">Phone (optional)</label>
                  <input id="cf-phone" name="phone" type="tel" className="contact-form__input" value={form.phone} onChange={handleChange} autoComplete="tel" />
                </div>
              </div>

              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="cf-subject">Subject</label>
                <select id="cf-subject" name="subject" className="contact-form__select" value={form.subject} onChange={handleChange}>
                  <option>General Enquiry</option>
                  <option>Admissions</option>
                  <option>Academic</option>
                  <option>Events</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="cf-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="cf-message" name="message" className={`contact-form__textarea${errors.message ? " contact-form__input--error" : ""}`} rows={5} value={form.message} onChange={handleChange} aria-required="true" aria-describedby={errors.message ? "cf-msg-err" : undefined} />
                {errors.message && <span id="cf-msg-err" className="contact-form__error" role="alert">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-form__submit" disabled={formStatus === "loading"} aria-busy={formStatus === "loading"}>
                {formStatus === "loading" ? (
                  <><span className="contact-form__spinner" aria-hidden="true" /> Sending…</>
                ) : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="contact-faq section-container reveal-section">
        <SectionHeading
          eyebrow="FAQ"
          title="Common Questions"
          subtitle="Quick answers to the questions we hear most often."
          centered
        />
        <div className="faq-list" role="list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${openFaq === i ? " faq-item--open" : ""}`} role="listitem">
              <button
                className="faq-item__question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{item.q}</span>
                {openFaq === i ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
              </button>
              <div id={`faq-answer-${i}`} className="faq-item__answer" role="region" aria-hidden={openFaq !== i}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="peach"
        title="Ready to Enrol Your Child?"
        subtitle="Applications are open for the 2027/2028 academic session."
        primaryLabel="Start Application"
        primaryHref="/admissions"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      />
    </main>
  );
}
