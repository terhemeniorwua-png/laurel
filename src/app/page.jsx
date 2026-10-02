import HeroCarousel from "./components/public/HeroCarousel";
import SchoolIntro from "./components/home/SchoolIntro";
import StatsSection from "./components/home/StatsSection";
import WhyLaurel from "./components/home/WhyLaurel";
import AcademicPreview from "./components/home/AcademicPreview";
import StudentLife from "./components/home/StudentLife";
import ActivitiesSection from "./components/home/ActivitiesSection";
import EventsPreview from "./components/home/EventsPreview";
import NewsPreview from "./components/home/NewsPreview";
import Testimonials from "./components/home/Testimonials";
import Gallery from "./components/home/Gallery";
import AdmissionsCTA from "./components/home/AdmissionsCTA";

export const metadata = {
  title: "Laurel Children Academy — Growing Curious Minds",
  description:
    "Laurel Children Academy is a modern primary school in Lagos focused on academic excellence, character development, and holistic child growth.",
};

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero — full-width image carousel */}
      <HeroCarousel />

      {/* 2. School Introduction */}
      <SchoolIntro />

      {/* 3. Key Statistics */}
      <StatsSection />

      {/* 4. Why Laurel */}
      <WhyLaurel />

      {/* 5. Academic Programmes */}
      <AcademicPreview />

      {/* 6. Student Life */}
      <StudentLife />

      {/* 7. Extracurricular Activities */}
      <ActivitiesSection />

      {/* 8. Upcoming Events */}
      <EventsPreview />

      {/* 9. Latest News */}
      <NewsPreview />

      {/* 10. Parent Testimonials */}
      <Testimonials />

      {/* 11. Campus Gallery */}
      <Gallery />

      {/* 12. Admissions CTA */}
      <AdmissionsCTA />
    </main>
  );
}
