import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

/**
 * PortalComingSoon — shared placeholder for portal modules not yet built.
 * Props: title, description, backHref
 */
export default function PortalComingSoon({ title = "Coming Soon", description = "This module will be available in an upcoming phase.", backHref = "/portal/dashboard" }) {
  return (
    <div className="portal-coming-soon">
      <div className="portal-coming-soon__icon" aria-hidden="true"><Clock size={40} strokeWidth={1.5} /></div>
      <h1 className="portal-coming-soon__title">{title}</h1>
      <p className="portal-coming-soon__desc">{description}</p>
      <Link href={backHref} className="portal-coming-soon__back">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Dashboard
      </Link>
    </div>
  );
}
