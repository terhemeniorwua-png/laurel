"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Notifications are accessible via /portal/announcements for now
// This page redirects there to avoid duplicate routes
export default function NotificationsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/portal/announcements"); }, [router]);
  return null;
}
