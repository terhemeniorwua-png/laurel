"use client";

import { useEffect } from "react";
import { initializeDemoData } from "@/lib/seed";

/**
 * StorageInitializer
 *
 * A zero-render client component that calls initializeDemoData() exactly
 * once after the browser has mounted (useEffect).
 *
 * Why a component instead of a top-level module call?
 *  - Next.js App Router runs layout.jsx on the server first.
 *  - localStorage does not exist on the server.
 *  - useEffect only fires in the browser, never during SSR or build.
 *  - This avoids any "window is not defined" errors.
 *
 * How it works:
 *  - Renders nothing (returns null).
 *  - On first mount, runs initializeDemoData().
 *  - initializeDemoData() is idempotent — calling it on every refresh
 *    is safe; it exits immediately if data is already present.
 *
 * Placement: inside <body> in the root layout, before {children}.
 */
export default function StorageInitializer() {
  useEffect(() => {
    initializeDemoData();
  }, []); // empty deps — runs once per browser session mount

  return null;
}
