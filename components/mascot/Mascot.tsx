"use client";

import { getLiveStatus } from "@/lib/live-client";
import { BookOpen, MapPin, MessageCircleHeart, Moon, Newspaper, PlayCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dove } from "./Dove";

// Ce que Shalom dit en arrivant sur chaque page.
const PAGE_LINES: [RegExp, string][] = [
  [/^\/$/, "Je m'appelle Shalom. Je vous fais visiter ? Touchez-moi quand vous voulez."],
  [/^\/eglise/, "Ici, vous découvrez qui nous sommes. Nos pasteurs ne mordent pas, promis !"],
  [/^\/direct/, "Les cultes passés restent ici. Installez-vous, la Parole n'a pas de date de péremption."],
  [/^\/bible\/[^/]+\/\d+/, "Touchez un verset pour le surligner, le copier ou l'envoyer à quelqu'un."],
  [/^\/bible/, "Tapez « Jean 3:16 » ou un mot comme « paix » : je trouve le passage."],
  [/^\/blog\/.+/, "Bonne lecture. Si ce texte vous parle, partagez-le à quelqu'un qui en a besoin."],
  [/^\/blog/, "Des nouvelles de la famille, des méditations et des témoignages."],
  [/^\/nous-trouver/, "Appuyez sur « Itinéraire » : votre téléphone vous guide jusqu'à nous."],
];

const REST_KEY = "shalom:repos";
const SEEN_KEY = "shalom:vu";

function readFlag(key: string, storage: "local" | "session" = "local") {
  try {
    return (storage === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}
function writeFlag(key: string, value: string | null, storage: "local" | "session" = "local") {
  try {
    const s = storage === "local" ? localStorage : sessionStorage;
    if (value === null) s.removeItem(key);
    else s.setItem(key, value);
  } catch {}
}

export function Mascot() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [resting, setResting] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [panel, setPanel] = useState(false);
  const [live, setLive] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);
  const spoken = useRef(new Set<string>());

  const say = useCallback((text: string, ms = 7000) => {
    setBubble(text);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setBubble(null), ms);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setResting(readFlag(REST_KEY) === "1");
      setReady(true);
    }, 1200);
    getLiveStatus().then((d) => setLive(d.live));
    return () => window.clearTimeout(t);
  }, []);

  // Message d'accueil de la page, puis commentaires section par section.
  useEffect(() => {
    if (!ready || resting) return;
    spoken.current.clear();
    const firstVisit = !readFlag(SEEN_KEY, "session");
    const hour = new Date().getHours();
    const hello = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
    const line = PAGE_LINES.find(([re]) => re.test(pathname))?.[1];
    const greet = () => {
      if (live && !pathname.startsWith("/direct")) say("Psst… nous sommes en direct en ce moment ! Touchez-moi pour rejoindre le culte.", 9000);
      else if (firstVisit) say(`${hello} et bienvenue à Terre de Victoire ! ${line ?? ""}`, 9000);
      else if (line) say(line);
      writeFlag(SEEN_KEY, "1", "session");
    };
    // Shalom attend que l'on commence à explorer (ou quelques secondes) pour ne rien masquer à l'arrivée.
    let greeted = false;
    const once = () => {
      if (greeted) return;
      greeted = true;
      window.removeEventListener("scroll", once);
      greet();
    };
    window.addEventListener("scroll", once, { passive: true });
    const t = window.setTimeout(once, firstVisit ? 6000 : 2500);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const text = (e.target as HTMLElement).dataset.guide;
          if (e.isIntersecting && text && !spoken.current.has(text)) {
            spoken.current.add(text);
            say(text);
          }
        }
      },
      { threshold: 0.45 },
    );
    const observe = () => document.querySelectorAll("[data-guide]").forEach((el) => io.observe(el));
    const t2 = window.setTimeout(observe, 2500);
    return () => {
      window.removeEventListener("scroll", once);
      window.clearTimeout(t);
      window.clearTimeout(t2);
      io.disconnect();
    };
  }, [pathname, ready, resting, live, say]);

  // Le menu se ferme avec Échap ou en touchant ailleurs.
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(false);
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setPanel(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [panel]);

  if (!ready) return null;

  if (resting) {
    return (
      <button
        type="button"
        onClick={() => {
          writeFlag(REST_KEY, null);
          setResting(false);
          say("Me revoilà ! Merci de m'avoir réveillée.");
        }}
        className="mascot fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-40 flex items-center gap-1 rounded-full border border-line bg-card py-1 pl-1 pr-3 text-sm text-ink-soft shadow-[var(--shadow-paper)] transition hover:text-ink sm:right-5"
        aria-label="Réveiller Shalom, la colombe guide"
      >
        <Dove mood="sleep" className="h-9 w-11" />
        Shalom
      </button>
    );
  }

  const links = [
    { href: "/direct", label: live ? "Rejoindre le direct" : "Voir les cultes", Icon: PlayCircle, hot: live },
    { href: "/bible", label: "Lire la Bible", Icon: BookOpen },
    { href: "/nous-trouver", label: "Venir à l'église", Icon: MapPin },
    { href: "/blog", label: "Lire le blog", Icon: Newspaper },
    { href: "/nous-trouver#ecrire", label: "Confier une prière", Icon: MessageCircleHeart },
  ];

  return (
    <div ref={root} className="mascot pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-2 z-40 flex flex-col items-end sm:right-5">
      {panel && (
        <div
          role="dialog"
          aria-label="Shalom vous guide"
          className="pointer-events-auto mb-2 w-[min(19rem,calc(100vw-1.5rem))] animate-rise rounded-2xl border border-line bg-card p-4 shadow-[var(--shadow-lift)]"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <p className="hand text-2xl text-royal">Où allons-nous ?</p>
            <button type="button" onClick={() => setPanel(false)} className="-mr-1 -mt-1 grid h-9 w-9 place-items-center rounded-full text-ink-mute hover:bg-linen hover:text-ink" aria-label="Fermer">
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-1">
            {links.map(({ href, label, Icon, hot }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setPanel(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${hot ? "bg-live/10 text-live" : "text-ink hover:bg-linen"}`}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {label}
                  {hot && <span className="ml-auto h-2 w-2 rounded-full bg-live animate-live" />}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              writeFlag(REST_KEY, "1");
              setPanel(false);
              setBubble(null);
              setResting(true);
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-2 text-sm text-ink-mute hover:text-ink"
          >
            <Moon className="h-4 w-4" /> Laisser Shalom se reposer
          </button>
        </div>
      )}

      {bubble && !panel && (
        <div className="pointer-events-auto relative mb-1 mr-8 max-w-[min(16rem,calc(100vw-5rem))] animate-rise rounded-2xl rounded-br-sm border border-line bg-card px-4 py-3 shadow-[var(--shadow-lift)]" role="status" aria-live="polite">
          <p className="hand text-[1.3rem] leading-[1.15] text-ink">{bubble}</p>
          <button
            type="button"
            onClick={() => setBubble(null)}
            className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-card text-ink-mute hover:text-ink"
            aria-label="Masquer le message"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setPanel((p) => !p);
          setBubble(null);
        }}
        className="pointer-events-auto relative -mr-1 transition-transform duration-300 hover:scale-105 active:scale-95"
        aria-expanded={panel}
        aria-label="Shalom, votre guide : ouvrir le menu d'aide"
      >
        <Dove mood={bubble ? "talk" : "idle"} className="h-16 w-20 drop-shadow-[0_10px_14px_rgb(23_25_58/0.25)] sm:h-[4.6rem] sm:w-[5.5rem]" />
        {live && <span className="absolute right-3 top-2 h-3 w-3 rounded-full border-2 border-paper bg-live animate-live" />}
      </button>
    </div>
  );
}
