import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  src: [
    { path: "./fonts/newsreader-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  fallback: ["Times New Roman", "serif"],
  // Police de secours recalibrée sur une serif : pas de saut de texte au chargement.
  adjustFontFallback: "Times New Roman",
});

const figtree = localFont({
  variable: "--font-figtree",
  display: "swap",
  src: [{ path: "./fonts/figtree-latin-wght-normal.woff2", weight: "300 900", style: "normal" }],
  fallback: ["system-ui", "sans-serif"],
});

const caveat = localFont({
  variable: "--font-caveat",
  display: "swap",
  preload: false,
  src: [{ path: "./fonts/caveat-latin-600-normal.woff2", weight: "600", style: "normal" }],
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terre de Victoire — Victory Outreach Ministry International, Lomé",
    template: "%s · Terre de Victoire",
  },
  description:
    "Église Terre de Victoire à Lomé (Togo) : cultes en direct et rediffusions, Bible Louis Segond en ligne, blog et plan d'accès. Venez comme vous êtes.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Terre de Victoire",
  },
};

export const viewport: Viewport = {
  themeColor: "#17193a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${newsreader.variable} ${figtree.variable} ${caveat.variable}`}>
      <body>
        {/* Active les animations d'apparition seulement si le JS tourne. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
