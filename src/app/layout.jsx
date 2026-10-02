import "./globals.css";
import Navbar from "./components/Navbar";
import FooterGuard from "./components/public/FooterGuard";
import StorageInitializer from "./components/providers/StorageInitializer";
import { AuthProvider } from "./components/providers/AuthProvider";

export const metadata = {
  title: {
    default: "Laurel Children Academy",
    template: "%s | Laurel Children Academy",
  },
  description:
    "Growing Curious Minds. Building Confident Futures. Laurel Children Academy — a modern primary school where every child is seen, supported, and inspired.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          <StorageInitializer />
          {/*
            Navbar and Footer hide themselves when pathname starts with
            /portal or equals /login — handled inside each component
            via usePathname().
          */}
          <Navbar />
          <div className="page-body">{children}</div>
          <FooterGuard />
        </AuthProvider>
      </body>
    </html>
  );
}
