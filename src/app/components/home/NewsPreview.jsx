import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import SectionHeading from "@/app/components/public/SectionHeading";
import demoNews from "@/data/public/news";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function NewsPreview() {
  const articles = demoNews.slice(0, 3);

  return (
    <section className="hp-news section-container reveal-section">
      <div className="hp-news__header">
        <SectionHeading
          eyebrow="LATEST NEWS"
          title="From Our School Community"
          subtitle="Achievements, events, and stories from Laurel Children Academy."
        />
        <Link href="/news" className="hp-news__see-all">
          View All News <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="hp-news__grid">
        {articles.map((article) => (
          <article key={article.id} className="hp-news-card">
            <Link href={`/news/${article.id}`} className="hp-news-card__img-link" tabIndex={-1} aria-hidden="true">
              <div className="hp-news-card__img-wrap">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="hp-news-card__body">
              <span className="news-cat-badge">{article.category}</span>
              <h3 className="hp-news-card__title">
                <Link href={`/news/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="hp-news-card__excerpt">{article.excerpt.slice(0, 120)}…</p>
              <div className="hp-news-card__meta">
                <Calendar size={13} aria-hidden="true" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
