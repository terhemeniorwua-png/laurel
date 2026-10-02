import Image from "next/image";
import SectionHeading from "@/app/components/public/SectionHeading";
import { studentLifeImages } from "@/data/public/homeData";

// Use the student life images in a masonry-style grid
export default function Gallery() {
  return (
    <section className="hp-gallery section-container reveal-section">
      <SectionHeading
        eyebrow="CAMPUS GALLERY"
        title="A Glimpse Into Our World"
        centered
      />
      <div className="hp-gallery__grid">
        {studentLifeImages.map((img, i) => (
          <div
            key={img.src}
            className={`hp-gallery__item hp-gallery__item--${i}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hp-gallery__overlay" aria-hidden="true">
              <span>{img.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
