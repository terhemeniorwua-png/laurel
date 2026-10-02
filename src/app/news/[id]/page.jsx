import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import demoNews from "@/data/public/news";
import SectionHeading from "@/app/components/public/SectionHeading";
import CTABanner from "@/app/components/public/CTABanner";

export function generateStaticParams() {
  return demoNews.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = demoNews.find((n) => n.id === id);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const article = demoNews.find((n) => n.id === id);
  if (!article) notFound();

  const related = demoNews
    .filter((n) => n.id !== article.id && (n.category === article.category || n.featured))
    .slice(0, 3);

  // Split content into paragraphs
  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <main className="news-detail-page">
      {/* ── Article header ────────────────────────────────────── */}
      <div className="news-detail__header">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="news-detail__breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="news-detail__crumb">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/news" className="news-detail__crumb">News</Link>
            <span aria-hidden="true"> / </span>
            <span className="news-detail__crumb news-detail__crumb--current" aria-current="page">
              {article.title.length > 40 ? article.title.slice(0, 40) + "…" : article.title}
            </span>
          </nav>

          <div className="news-detail__meta">
            <span className="news-cat-badge">{article.category}</span>
            <span className="news-meta-item">
              <Calendar size={14} aria-hidden="true" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="news-meta-item">
              <Clock size={14} aria-hidden="true" />
              {article.readTime}
            </span>
            <span className="news-meta-item">
              <User size={14} aria-hidden="true" />
              {article.author}
            </span>
          </div>

          <h1 className="news-detail__title">{article.title}</h1>
          <p className="news-detail__excerpt">{article.excerpt}</p>
        </div>
      </div>

      {/* ── Hero image ────────────────────────────────────────── */}
      <div className="news-detail__hero-image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── Article body ──────────────────────────────────────── */}
      <div className="section-container">
        <div className="news-detail__layout">
          <article className="news-detail__article">
            <div className="article-body">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Back link */}
            <Link href="/news" className="news-back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to News
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="news-detail__sidebar" aria-label="Article sidebar">
            <div className="news-sidebar-card">
              <h2 className="news-sidebar-card__title">About the Author</h2>
              <div className="news-sidebar-author">
                <div className="news-sidebar-author__avatar" aria-hidden="true">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="news-sidebar-author__name">{article.author}</p>
                  <p className="news-sidebar-author__role">Laurel Children Academy</p>
                </div>
              </div>
            </div>
            <div className="news-sidebar-card">
              <h2 className="news-sidebar-card__title">Category</h2>
              <span className="news-cat-badge">{article.category}</span>
            </div>
            <div className="news-sidebar-card">
              <h2 className="news-sidebar-card__title">Share</h2>
              <p className="news-sidebar-card__share-note">
                Help spread the word about what's happening at Laurel Children Academy.
              </p>
            </div>
          </aside>
        </div>

        {/* ── Related stories ───────────────────────────────────── */}
        {related.length > 0 && (
          <section className="news-related" aria-label="Related stories">
            <SectionHeading eyebrow="MORE STORIES" title="Related Articles" />
            <div className="news-grid news-grid--related">
              {related.map((rel) => (
                <article key={rel.id} className="news-card">
                  <Link href={`/news/${rel.id}`} className="news-card__image-link" tabIndex={-1} aria-hidden="true">
                    <div className="news-card__image-wrap">
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="news-card__body">
                    <span className="news-cat-badge">{rel.category}</span>
                    <h3 className="news-card__title">
                      <Link href={`/news/${rel.id}`}>{rel.title}</Link>
                    </h3>
                    <p className="news-card__excerpt">{rel.excerpt}</p>
                    <Link href={`/news/${rel.id}`} className="news-card__link">
                      Read more <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABanner
        variant="warm"
        title="Stay Connected with Laurel"
        subtitle="Read the latest school news and never miss an update."
        primaryLabel="View All News"
        primaryHref="/news"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </main>
  );
}
