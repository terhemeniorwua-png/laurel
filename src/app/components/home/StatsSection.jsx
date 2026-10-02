"use client";

import { useEffect, useRef, useState } from "react";
import { homeStats } from "@/data/public/homeData";

function useCountUp(target, duration = 1800, startCounting) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [startCounting, target, duration]);
  return count;
}

function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 1600, visible);

  return (
    <div className="hp-stat-card" ref={ref}>
      <span className="hp-stat-card__num" aria-label={`${value}${suffix} ${label}`}>
        {count}{suffix}
      </span>
      <span className="hp-stat-card__label">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="hp-stats reveal-section" aria-label="School statistics">
      <div className="section-container">
        <div className="hp-stats__grid">
          {homeStats.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
