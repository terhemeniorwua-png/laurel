"use client";

import { usePathname } from "next/navigation";
import Footer from "@/app/components/public/Footer";

/**
 * FooterGuard
 * Renders the Footer only on public-facing pages.
 * Portal and login pages have their own layout chrome.
 */
export default function FooterGuard() {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/portal") || pathname === "/login";
  if (isHidden) return null;
  return <Footer />;
}
