/**
 * Hero carousel slide data for Laurel Children Academy.
 *
 * Images are sourced from Unsplash (free, high-quality school photography).
 * Each image is served via images.unsplash.com and optimised by next/image.
 *
 * Slide 1 is the primary / default slide and loads first.
 */

const heroSlides = [
  {
    id: 1,
    // Children arriving at school / walking together — warm morning light
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80&fit=crop&auto=format",
    alt: "Laurel Children Academy students arriving at school together in the morning",
    // Override focal point for mobile if needed
    mobilePosition: "center",
  },
  {
    id: 2,
    // Children learning inside a bright, modern classroom
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80&fit=crop&auto=format",
    alt: "Students engaged in classroom learning at Laurel Children Academy",
    mobilePosition: "center top",
  },
  {
    id: 3,
    // Children participating in science / creative activity
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80&fit=crop&auto=format",
    alt: "Laurel Academy students participating in a science and creative activity",
    mobilePosition: "center",
  },
  {
    id: 4,
    // Children playing outdoor sports / physical activity
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1920&q=80&fit=crop&auto=format",
    alt: "Students enjoying outdoor sports and physical activities at Laurel Academy",
    mobilePosition: "center",
  },
  {
    id: 5,
    // Children collaborating / reading together
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80&fit=crop&auto=format",
    alt: "Laurel Academy students collaborating and reading together",
    mobilePosition: "center",
  },
];

export default heroSlides;
