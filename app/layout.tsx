import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Titres : Bricolage Grotesque — une grotesque chaleureuse, un peu artisanale.
const bricolage = localFont({
  variable: "--font-bricolage",
  display: "swap",
  src: [{ path: "./fonts/bricolage-grotesque-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  fallback: ["Avenir Next", "system-ui", "sans-serif"],
});

// Écriture et mots mis en valeur : Newsreader, la serif du texte biblique.
const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  src: [
    { path: "./fonts/newsreader-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const figtree = localFont({
  variable: "--font-figtree",
  display: "swap",
  src: [{ path: "./fonts/figtree-latin-wght-normal.woff2", weight: "300 900", style: "normal" }],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terre de Victoire — une église, une famille à Lomé",
    template: "%s · Terre de Victoire",
  },
  description:
    "Terre de Victoire, c'est une église et une famille à Lomé (Togo). Cultes en direct et à revoir, Bible en ligne, photos de la vie de l'église et plan pour venir nous voir. Venez comme vous êtes.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Terre de Victoire",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

// Exécuté avant le premier affichage : applique le thème choisi (ou celui du
// téléphone) sans éclair blanc, et n'active les animations que si la personne
// ne les a pas réduites dans ses réglages d'accessibilité.
const BOOT = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem("tdv:theme")}catch(e){}
if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
d.dataset.theme=t;d.classList.add("js");
var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0e1030":"#f5f2eb");
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("motion");setTimeout(function(){if(!d.classList.contains("motion-ready"))d.classList.add("motion-failed")},4000)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${bricolage.variable} ${newsreader.variable} ${figtree.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        {children}
      </body>
    </html>
  );
}
