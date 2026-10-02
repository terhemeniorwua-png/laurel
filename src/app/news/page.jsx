"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import PageHero from "@/app/components/public/PageHero";
import SectionHeading from "@/app/components/public/SectionHeading";
import demoNews from "@/data/public/news";

const CATEGORIES = ["All", "School News", "Academics", "Community", "Sports", "Events", "Announcements"];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = demoNews.find((n) => n.featured);
  const rest = demoNews.filter((n) => !n.featured);
  const filtered = activeCategory === "All"
    ? rest
    : rest.filter((n) => n.category === activeCategory);

  return (
    <main className="news-page">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        title="News & Announcements"
        subtitle="Stay updated with the latest stories, events, and achievements from Laurel Children Academy."
        breadcrumb="News"
        imageSrc="https://images.unsplash.com/photo-1544717297-fa8303588de5?w=1600&q=85&fit=crop"
        imageAlt="School news and announcements"
      />

      <div className="section-container news-page__body">
        {/* ── Featured ──────────────────────────────────────────── */}
        {featured && (
          <section className="news-featured reveal-section" aria-label="Featured story">
            <div className="news-featured__image-wrap">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="news-featured__body">
              <span className="news-cat-badge">{featured.category}</span>
              <h2 className="news-featured__title">{featured.title}</h2>
              <p className="news-featured__excerpt">{featured.excerpt}</p>
              <div className="news-featured__meta">
                <span className="news-meta-item">
                  <Calendar size={14} aria-hidden="true" />
                  {formatDate(featured.publishedAt)}
                </span>
                <span className="news-meta-item">
                  <Clock size={14} aria-hidden="true" />
                  {featured.readTime}
                </span>
              </div>
              <Link href={`/news/${featured.id}`} className="news-read-link">
                Read Full Story <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* ── Category filter ───────────────────────────────────── */}
        <div className="news-filter reveal-section" role="group" aria-label="Filter news by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={["news-filter__btn", activeCategory === cat ? "news-filter__btn--active" : ""].filter(Boolean).join(" ")}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <section className="news-grid reveal-section" aria-label="News articles">
            {filtered.map((article) => (
              <article key={article.id} className="news-card">
                <Link href={`/news/${article.id}`} className="news-card__image-link" tabIndex={-1} aria-hidden="true">
                  <div className="news-card__image-wrap">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="news-card__body">
                  <span className="news-cat-badge">{article.category}</span>
                  <h3 className="news-card__title">
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="news-card__excerpt">{article.excerpt}</p>
                  <div className="news-card__meta">
                    <span className="news-meta-item">
                      <User size={13} aria-hidden="true" />
                      {article.author}
                    </span>
                    <span className="news-meta-item">
                      <Calendar size={13} aria-hidden="true" />
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <Link href={`/news/${article.id}`} className="news-card__link">
                    Read more <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="news-empty reveal-section">
            <p>No articles found in the <strong>{activeCategory}</strong> category yet.</p>
            <button className="news-filter__btn news-filter__btn--active" onClick={() => setActiveCategory("All")}>
              View all articles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
