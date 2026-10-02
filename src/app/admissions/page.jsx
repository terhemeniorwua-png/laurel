import { CheckCircle, FileText } from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";

export const metadata = {
  title: "Admissions",
  description:
    "Apply to Laurel Children Academy. We accept children from Nursery through Primary 6. Rolling admissions — apply today for the 2027/2028 academic session.",
};

const steps = [
  { n: "01", title: "Submit Application",      desc: "Complete our online or paper application form with your child's information and supporting documents." },
  { n: "02", title: "Application Review",      desc: "Our admissions team reviews every application thoroughly within 1–2 working weeks." },
  { n: "03", title: "Assessment & Interview",  desc: "Selected applicants are invited for a brief, child-friendly assessment and a parent meet-and-greet." },
  { n: "04", title: "Admission Decision",      desc: "Families receive a formal decision letter by email and postal address." },
  { n: "05", title: "Enrolment",               desc: "Successful applicants complete enrolment formalities, pay initial fees, and receive a welcome pack." },
];

const documents = [
  "Birth certificate (original + photocopy)",
  "Immunisation / vaccination record",
  "Two recent passport photographs",
  "Previous school report card (if applicable)",
  "Parent / guardian ID",
  "Completed Laurel application form",
];

const ageReqs = [
  { level: "Nursery 1",   age: "2 – 3 years" },
  { level: "Nursery 2",   age: "3 – 4 years" },
  { level: "Reception",   age: "4 – 5 years" },
  { level: "Primary 1",   age: "5 – 6 years" },
  { level: "Primary 2",   age: "6 – 7 years" },
  { level: "Primary 3",   age: "7 – 8 years" },
  { level: "Primary 4",   age: "8 – 9 years" },
  { level: "Primary 5",   age: "9 – 10 years" },
  { level: "Primary 6",   age: "10 – 11 years" },
];

export default function AdmissionsPage() {
  return (
    <main className="admissions-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="Admissions"
        subtitle="Join a community where every child is seen, supported, and inspired."
        breadcrumb="Admissions"
        imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=85&fit=crop"
        imageAlt="Students collaborating and reading at Laurel Children Academy"
      />

      {/* ── Overview + Steps ──────────────────────────────────── */}
      <section className="admissions-overview section-container reveal-section">
        <div className="admissions-overview__inner">
          <div className="admissions-overview__text">
            <SectionHeading
              eyebrow="JOIN US"
              title="How to Apply"
              subtitle="Our admissions process is straightforward, transparent, and designed with families in mind."
            />
            <p className="body-text">
              Laurel Children Academy welcomes applications for all year groups from Nursery 1
              through Primary 6. We practise rolling admissions and accept applications
              throughout the year, subject to available spaces in each class. Our inclusive
              approach means we consider every child on their individual merits.
            </p>
            <p className="body-text">
              We encourage prospective families to attend our regular Open Day events to
              meet our staff, tour the campus, and experience our school environment
              before submitting an application.
            </p>
          </div>

          <div className="admissions-process">
            {steps.map((step) => (
              <div key={step.n} className="admissions-step">
                <div className="admissions-step__number" aria-hidden="true">{step.n}</div>
                <div className="admissions-step__content">
                  <h3 className="admissions-step__title">{step.title}</h3>
                  <p className="admissions-step__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ──────────────────────────────────────── */}
      <section className="admissions-reqs reveal-section">
        <div className="section-container">
          <SectionHeading
            eyebrow="REQUIREMENTS"
            title="What You Will Need"
            centered
          />
          <div className="admissions-reqs__grid">
            <div className="admissions-req-card">
              <h3 className="admissions-req-card__title">
                <FileText size={20} aria-hidden="true" />
                Documents Required
              </h3>
              <ul className="admissions-req-card__list">
                {documents.map((doc) => (
                  <li key={doc} className="admissions-req-card__item">
                    <CheckCircle size={16} aria-hidden="true" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="admissions-req-card">
              <h3 className="admissions-req-card__title">
                <CheckCircle size={20} aria-hidden="true" />
                Age Requirements
              </h3>
              <table className="admissions-age-table" aria-label="Age requirements by class level">
                <thead>
                  <tr>
                    <th>Class Level</th>
                    <th>Age Range</th>
                  </tr>
                </thead>
                <tbody>
                  {ageReqs.map((row) => (
                    <tr key={row.level}>
                      <td>{row.level}</td>
                      <td>{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fees overview ─────────────────────────────────────── */}
      <section className="admissions-fees section-container reveal-section">
        <SectionHeading
          eyebrow="SCHOOL FEES"
          title="Transparent and Fair Pricing"
          subtitle="We believe every family deserves to understand what they are investing in."
          centered
        />
        <div className="admissions-fees__content">
          <p className="body-text admissions-fees__note">
            School fees at Laurel Children Academy are charged on a term-by-term basis.
            The fee structure covers tuition, learning materials, and a school activities levy.
            Additional optional fees apply for transport, extended day, and extracurricular clubs.
          </p>
          <p className="body-text admissions-fees__note">
            Detailed fee schedules are included in the admissions information pack, which is
            available on request from our admissions office. We offer a sibling discount for
            families with more than one child enrolled.
          </p>
          <a
            href="mailto:admissions@laurelacademy.edu.ng?subject=Fee%20Structure%20Request"
            className="admissions-fees__request-btn"
          >
            Request Fee Structure
          </a>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="brown"
        title="Begin Your Child's Journey Today"
        subtitle="Applications are open for the 2027/2028 academic session. Limited spaces available."
        primaryLabel="Apply Now"
        primaryHref="mailto:admissions@laurelacademy.edu.ng?subject=Admissions%20Application"
        secondaryLabel="Contact Admissions"
        secondaryHref="/contact"
      />
    </main>
  );
}
