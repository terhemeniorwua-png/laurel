import HeroCarousel from "./components/public/HeroCarousel";

export const metadata = {
  title: "Laurel Children Academy — Growing Curious Minds",
  description:
    "Laurel Children Academy is a modern primary school focused on academic excellence, character development, and holistic child growth.",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero — full-width background image carousel */}
      <HeroCarousel />

      {/* Additional homepage sections will go here in later phases */}
    </main>
  );
}
