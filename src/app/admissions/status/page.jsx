"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";
import AdmissionStatusChecker from "@/app/components/public/AdmissionStatusChecker";

function StatusContent() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  return <AdmissionStatusChecker prefillId={id} />;
}

export default function AdmissionStatusPage() {
  return (
    <main className="adm-status-page">
      <PageHero
        title="Application Status"
        subtitle="Enter your Application ID to check the current status of your admissions application."
        breadcrumb="Admissions / Status"
        imageSrc="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85&fit=crop"
        imageAlt="Students at Laurel Children Academy"
      />

      <section className="section-container adm-status-body reveal-section">
        <SectionHeading
          eyebrow="TRACK YOUR APPLICATION"
          title="Check Your Status"
          subtitle="Your Application ID was shown on the confirmation screen after you submitted your application."
          centered
        />
        <Suspense fallback={<div className="adm-status-loading">Loading…</div>}>
          <StatusContent />
        </Suspense>
      </section>

      <CTABanner
        variant="peach"
        title="Haven't Applied Yet?"
        subtitle="Applications are open for the 2027/2028 academic session."
        primaryLabel="Start Application"
        primaryHref="/admissions"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </main>
  );
}
