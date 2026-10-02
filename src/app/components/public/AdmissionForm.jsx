"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, ChevronLeft, CheckCircle, Upload, X, FileText, Loader2, AlertCircle } from "lucide-react";
import { createAdmission } from "@/lib/storage/admissions";
import {
  ADMISSION_CLASSES,
  REQUIRED_DOCUMENTS,
  HEAR_ABOUT_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from "@/data/public/admissionsData";

// ── Validation ────────────────────────────────────────────────────────────────

function validateStep(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.child.firstName.trim())    errors["child.firstName"]    = "Please enter your child's first name.";
    if (!data.child.lastName.trim())     errors["child.lastName"]     = "Please enter your child's last name.";
    if (!data.child.dateOfBirth)         errors["child.dateOfBirth"]  = "Please enter your child's date of birth.";
    if (!data.child.gender)              errors["child.gender"]       = "Please select your child's gender.";
    if (!data.child.preferredClass)      errors["child.preferredClass"] = "Please select a preferred class.";
  }
  if (step === 1) {
    if (!data.guardian.name.trim())      errors["guardian.name"]      = "Please enter the guardian's full name.";
    if (!data.guardian.relationship)     errors["guardian.relationship"] = "Please select a relationship.";
    if (!data.guardian.email.trim()) {
      errors["guardian.email"] = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guardian.email)) {
      errors["guardian.email"] = "Please enter a valid email address.";
    }
    if (!data.guardian.phone.trim())     errors["guardian.phone"]     = "Please enter a phone number.";
    if (!data.guardian.address.trim())   errors["guardian.address"]   = "Please enter a home address.";
  }
  // Step 2 (previous school) and step 3 (additional) are optional
  return errors;
}

// ── Initial form state ────────────────────────────────────────────────────────

const INITIAL = {
  child: { firstName: "", lastName: "", dateOfBirth: "", gender: "", preferredClass: "" },
  guardian: { name: "", relationship: "", email: "", phone: "", address: "" },
  previousSchool: { name: "", previousClass: "", reasonForLeaving: "", yearsAttended: "" },
  additional: { medicalNotes: "", additionalInfo: "", hearAbout: "" },
  documents: {},
};

const STEP_TITLES = [
  "Child Information",
  "Parent / Guardian",
  "Previous School",
  "Additional Information",
  "Review & Submit",
];

// ── Field component ───────────────────────────────────────────────────────────

function Field({ label, required, error, children }) {
  return (
    <div className="af-field">
      <label className="af-label">
        {label}
        {required && <span className="af-required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span className="af-error" role="alert">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}

function Input({ value, onChange, error, ...props }) {
  return (
    <input
      className={`af-input${error ? " af-input--error" : ""}`}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

function Select({ value, onChange, error, children, ...props }) {
  return (
    <select
      className={`af-select${error ? " af-input--error" : ""}`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
}

function Textarea({ value, onChange, ...props }) {
  return <textarea className="af-textarea" value={value} onChange={onChange} {...props} />;
}

// ── Steps ─────────────────────────────────────────────────────────────────────

function StepChild({ data, errors, onChange }) {
  const set = (field) => (e) => onChange("child", field, e.target.value);
  return (
    <div className="af-step-body">
      <div className="af-row">
        <Field label="First Name" required error={errors["child.firstName"]}>
          <Input value={data.firstName} onChange={set("firstName")} error={errors["child.firstName"]} placeholder="e.g. Aisha" autoComplete="given-name" />
        </Field>
        <Field label="Last Name" required error={errors["child.lastName"]}>
          <Input value={data.lastName} onChange={set("lastName")} error={errors["child.lastName"]} placeholder="e.g. Ibrahim" autoComplete="family-name" />
        </Field>
      </div>
      <div className="af-row">
        <Field label="Date of Birth" required error={errors["child.dateOfBirth"]}>
          <Input type="date" value={data.dateOfBirth} onChange={set("dateOfBirth")} error={errors["child.dateOfBirth"]} max={new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="Gender" required error={errors["child.gender"]}>
          <Select value={data.gender} onChange={set("gender")} error={errors["child.gender"]}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </Select>
        </Field>
      </div>
      <Field label="Preferred Class" required error={errors["child.preferredClass"]}>
        <Select value={data.preferredClass} onChange={set("preferredClass")} error={errors["child.preferredClass"]}>
          <option value="">Select a class</option>
          {ADMISSION_CLASSES.map((c) => (
            <option key={c.value} value={c.value}>{c.label} — {c.ageRange}</option>
          ))}
        </Select>
      </Field>
    </div>
  );
}

function StepGuardian({ data, errors, onChange }) {
  const set = (field) => (e) => onChange("guardian", field, e.target.value);
  return (
    <div className="af-step-body">
      <div className="af-row">
        <Field label="Full Name" required error={errors["guardian.name"]}>
          <Input value={data.name} onChange={set("name")} error={errors["guardian.name"]} placeholder="e.g. Fatima Ibrahim" autoComplete="name" />
        </Field>
        <Field label="Relationship to Child" required error={errors["guardian.relationship"]}>
          <Select value={data.relationship} onChange={set("relationship")} error={errors["guardian.relationship"]}>
            <option value="">Select relationship</option>
            {RELATIONSHIP_OPTIONS.map((r) => <option key={r}>{r}</option>)}
          </Select>
        </Field>
      </div>
      <div className="af-row">
        <Field label="Email Address" required error={errors["guardian.email"]}>
          <Input type="email" value={data.email} onChange={set("email")} error={errors["guardian.email"]} placeholder="e.g. fatima@email.com" autoComplete="email" />
        </Field>
        <Field label="Phone Number" required error={errors["guardian.phone"]}>
          <Input type="tel" value={data.phone} onChange={set("phone")} error={errors["guardian.phone"]} placeholder="+234 812 345 6789" autoComplete="tel" />
        </Field>
      </div>
      <Field label="Home Address" required error={errors["guardian.address"]}>
        <Textarea value={data.address} onChange={set("address")} rows={3} placeholder="e.g. 14 Greenfield Close, Lekki Phase 1, Lagos" autoComplete="street-address" />
      </Field>
    </div>
  );
}

function StepPrevSchool({ data, onChange }) {
  const set = (field) => (e) => onChange("previousSchool", field, e.target.value);
  return (
    <div className="af-step-body">
      <p className="af-step-note">This section is optional for children applying to Early Years.</p>
      <Field label="Previous School Name">
        <Input value={data.name} onChange={set("name")} placeholder="e.g. Sunshine Nursery School" />
      </Field>
      <div className="af-row">
        <Field label="Previous Class / Year">
          <Input value={data.previousClass} onChange={set("previousClass")} placeholder="e.g. Nursery 2" />
        </Field>
        <Field label="Years Attended">
          <Input value={data.yearsAttended} onChange={set("yearsAttended")} placeholder="e.g. 2023 – 2026" />
        </Field>
      </div>
      <Field label="Reason for Leaving">
        <Textarea value={data.reasonForLeaving} onChange={set("reasonForLeaving")} rows={3} placeholder="e.g. Seeking a school with stronger academic programme" />
      </Field>
    </div>
  );
}

function StepAdditional({ data, onChange, documents, onDocumentAdd, onDocumentRemove }) {
  const set = (field) => (e) => onChange("additional", field, e.target.value);

  function handleFileChange(docId, e) {
    const file = e.target.files[0];
    if (!file) return;
    const MAX = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX) { alert("File must be under 5 MB."); return; }
    onDocumentAdd(docId, { name: file.name, size: file.size, type: file.type, simulatedAt: new Date().toISOString() });
    e.target.value = "";
  }

  return (
    <div className="af-step-body">
      <Field label="Medical / Special Learning Notes">
        <Textarea value={data.medicalNotes} onChange={set("medicalNotes")} rows={3} placeholder="Any allergies, conditions, or learning support needs we should know about (optional)" />
      </Field>
      <Field label="Additional Information">
        <Textarea value={data.additionalInfo} onChange={set("additionalInfo")} rows={3} placeholder="Anything else you'd like us to know about your child (optional)" />
      </Field>
      <Field label="How did you hear about Laurel Children Academy?">
        <Select value={data.hearAbout} onChange={set("hearAbout")}>
          <option value="">Select an option</option>
          {HEAR_ABOUT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </Select>
      </Field>

      {/* Document upload */}
      <div className="af-docs">
        <h3 className="af-docs__title">Supporting Documents</h3>
        <p className="af-docs__note">Upload documents as PDF, JPG, or PNG. Max 5 MB each. Documents marked <span className="af-required">*</span> are required.</p>
        <div className="af-docs__list">
          {REQUIRED_DOCUMENTS.map((doc) => {
            const uploaded = documents[doc.id];
            return (
              <div key={doc.id} className={`af-doc-item${uploaded ? " af-doc-item--uploaded" : ""}`}>
                <div className="af-doc-item__info">
                  <FileText size={18} aria-hidden="true" />
                  <span className="af-doc-item__label">
                    {doc.label}
                    {doc.required && <span className="af-required" aria-hidden="true"> *</span>}
                  </span>
                </div>
                {uploaded ? (
                  <div className="af-doc-item__uploaded">
                    <span className="af-doc-item__filename">
                      <CheckCircle size={14} aria-hidden="true" />
                      {uploaded.name}
                    </span>
                    <button type="button" className="af-doc-item__remove" onClick={() => onDocumentRemove(doc.id)} aria-label={`Remove ${doc.label}`}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="af-doc-item__upload-btn">
                    <Upload size={14} aria-hidden="true" />
                    Choose File
                    <input type="file" accept={doc.accept} className="af-doc-item__file-input" onChange={(e) => handleFileChange(doc.id, e)} aria-label={`Upload ${doc.label}`} />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
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

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="af-review-row">
      <span className="af-review-row__label">{label}</span>
      <span className="af-review-row__value">{value}</span>
    </div>
  );
}

function StepReview({ formData, onGoToStep }) {
  const { child, guardian, previousSchool, additional, documents } = formData;
  const uploadedDocs = Object.entries(documents).filter(([, v]) => v);

  return (
    <div className="af-step-body af-review">
      <p className="af-step-note">Please review your application carefully before submitting. You can edit any section below.</p>

      <ReviewSection title="Child Information" onEdit={() => onGoToStep(0)}>
        <ReviewRow label="Name" value={`${child.firstName} ${child.lastName}`} />
        <ReviewRow label="Date of Birth" value={child.dateOfBirth} />
        <ReviewRow label="Gender" value={child.gender} />
        <ReviewRow label="Preferred Class" value={child.preferredClass} />
      </ReviewSection>

      <ReviewSection title="Parent / Guardian" onEdit={() => onGoToStep(1)}>
        <ReviewRow label="Name" value={guardian.name} />
        <ReviewRow label="Relationship" value={guardian.relationship} />
        <ReviewRow label="Email" value={guardian.email} />
        <ReviewRow label="Phone" value={guardian.phone} />
        <ReviewRow label="Address" value={guardian.address} />
      </ReviewSection>

      <ReviewSection title="Previous School" onEdit={() => onGoToStep(2)}>
        {previousSchool.name ? (
          <>
            <ReviewRow label="School" value={previousSchool.name} />
            <ReviewRow label="Class" value={previousSchool.previousClass} />
            <ReviewRow label="Years" value={previousSchool.yearsAttended} />
            <ReviewRow label="Reason for Leaving" value={previousSchool.reasonForLeaving} />
          </>
        ) : (
          <p className="af-review-empty">Not provided</p>
        )}
      </ReviewSection>

      <ReviewSection title="Additional Information" onEdit={() => onGoToStep(3)}>
        <ReviewRow label="Medical Notes" value={additional.medicalNotes || "None"} />
        <ReviewRow label="Heard About Us" value={additional.hearAbout || "Not specified"} />
        {uploadedDocs.length > 0 ? (
          <div className="af-review-docs">
            <span className="af-review-row__label">Documents</span>
            <ul className="af-review-docs__list">
              {uploadedDocs.map(([id, doc]) => (
                <li key={id}><CheckCircle size={13} aria-hidden="true" /> {doc.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <ReviewRow label="Documents" value="No documents uploaded" />
        )}
      </ReviewSection>
    </div>
  );
}

// ── Confirmation screen ───────────────────────────────────────────────────────

function Confirmation({ application }) {
  const { applicationId, child, submittedAt } = application;
  const date = new Date(submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="af-confirmation" role="alert" aria-live="polite">
      <div className="af-confirmation__icon" aria-hidden="true">
        <CheckCircle size={52} strokeWidth={1.5} />
      </div>
      <h2 className="af-confirmation__heading">Application Submitted!</h2>
      <p className="af-confirmation__message">
        Thank you for applying to Laurel Children Academy. Our admissions team will review your
        application and contact you with the next steps within 1–2 working weeks.
      </p>

      <div className="af-confirmation__card">
        <div className="af-confirmation__row">
          <span>Application ID</span>
          <strong className="af-confirmation__appid">{applicationId}</strong>
        </div>
        <div className="af-confirmation__row">
          <span>Child</span>
          <strong>{child.firstName} {child.lastName}</strong>
        </div>
        <div className="af-confirmation__row">
          <span>Preferred Class</span>
          <strong>{child.preferredClass}</strong>
        </div>
        <div className="af-confirmation__row">
          <span>Submitted</span>
          <strong>{date}</strong>
        </div>
        <div className="af-confirmation__row">
          <span>Status</span>
          <span className="af-status-badge af-status-badge--submitted">Submitted</span>
        </div>
      </div>

      <p className="af-confirmation__id-note">
        Save your Application ID: <strong>{applicationId}</strong>. You can use it to check your application status at any time.
      </p>

      <div className="af-confirmation__actions">
        <a href="/admissions/status" className="af-btn af-btn--primary">
          Check Application Status
        </a>
        <a href="/" className="af-btn af-btn--secondary">
          Return to Home
        </a>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(null); // holds the saved application

  const formTopRef = useRef(null);

  const scrollToTop = useCallback(() => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Field change handler
  function handleChange(section, field, value) {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    const key = `${section}.${field}`;
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }

  // Document handlers
  function handleDocumentAdd(docId, meta) {
    setFormData((prev) => ({ ...prev, documents: { ...prev.documents, [docId]: meta } }));
  }
  function handleDocumentRemove(docId) {
    setFormData((prev) => {
      const docs = { ...prev.documents };
      delete docs[docId];
      return { ...prev, documents: docs };
    });
  }

  function handleNext() {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      scrollToTop();
      return;
    }
    setErrors({});
    setCurrentStep((s) => s + 1);
    scrollToTop();
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((s) => s - 1);
    scrollToTop();
  }

  function handleGoToStep(n) {
    setErrors({});
    setCurrentStep(n);
    scrollToTop();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Small delay for UX realism
      await new Promise((r) => setTimeout(r, 1200));
      const saved = createAdmission({
        child:          formData.child,
        guardian:       formData.guardian,
        previousSchool: formData.previousSchool,
        additional:     formData.additional,
        documents:      formData.documents,
      });
      setSubmitted(saved);
      scrollToTop();
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = Math.round(((currentStep) / STEP_TITLES.length) * 100);

  if (submitted) return <Confirmation application={submitted} />;

  return (
    <div className="af-wrapper" ref={formTopRef} id="application-form">
      {/* Step indicator */}
      <div className="af-stepper" aria-label="Application steps">
        <div className="af-progress-bar">
          <div className="af-progress-bar__fill" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <div className="af-steps-row">
          {STEP_TITLES.map((title, i) => (
            <div key={i} className={["af-step-indicator", i < currentStep ? "af-step-indicator--done" : "", i === currentStep ? "af-step-indicator--active" : ""].filter(Boolean).join(" ")}>
              <div className="af-step-indicator__circle" aria-hidden="true">
                {i < currentStep ? <CheckCircle size={16} /> : <span>{i + 1}</span>}
              </div>
              <span className="af-step-indicator__label">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step heading */}
      <div className="af-step-header">
        <h2 className="af-step-heading" tabIndex={-1}>{STEP_TITLES[currentStep]}</h2>
        <span className="af-step-counter">Step {currentStep + 1} of {STEP_TITLES.length}</span>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} noValidate>
        {currentStep === 0 && <StepChild data={formData.child} errors={errors} onChange={handleChange} />}
        {currentStep === 1 && <StepGuardian data={formData.guardian} errors={errors} onChange={handleChange} />}
        {currentStep === 2 && <StepPrevSchool data={formData.previousSchool} onChange={handleChange} />}
        {currentStep === 3 && (
          <StepAdditional
            data={formData.additional}
            onChange={handleChange}
            documents={formData.documents}
            onDocumentAdd={handleDocumentAdd}
            onDocumentRemove={handleDocumentRemove}
          />
        )}
        {currentStep === 4 && <StepReview formData={formData} onGoToStep={handleGoToStep} />}

        {submitError && (
          <div className="af-submit-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" />
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="af-nav">
          {currentStep > 0 && (
            <button type="button" className="af-btn af-btn--back" onClick={handleBack}>
              <ChevronLeft size={18} aria-hidden="true" /> Back
            </button>
          )}
          <div className="af-nav__spacer" />
          {currentStep < STEP_TITLES.length - 1 ? (
            <button type="button" className="af-btn af-btn--next" onClick={handleNext}>
              Continue <ChevronRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" className="af-btn af-btn--submit" disabled={submitting}>
              {submitting ? (
                <><Loader2 size={18} className="af-spinner" aria-hidden="true" /> Submitting…</>
              ) : (
                <>Submit Application <ChevronRight size={18} aria-hidden="true" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
