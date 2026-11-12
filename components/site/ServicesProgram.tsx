import { hour } from "@/lib/format";
import type { ServiceTime } from "@/lib/site";
import { CalendarPlus } from "lucide-react";

/** Les rendez-vous de la semaine : le jour et l'heure d'abord, lisibles de loin. */
export function ServicesProgram({ services }: { services: ServiceTime[] }) {
  return (
    <div>
      <ol data-reveal-group className="border-t border-line">
        {services.map((s) => (
          <li key={s.day + s.time} className="group grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[11rem_1fr] sm:items-baseline lg:grid-cols-[16rem_1fr] lg:py-9">
            <p className="flex items-baseline gap-3 sm:block">
              <span className="block text-sm font-bold uppercase tracking-[0.16em] text-gold-ink">{s.day}</span>
              <span className="font-display text-5xl font-semibold tracking-[-0.05em] text-ink transition-colors duration-300 group-hover:text-accent lg:text-7xl">{hour(s.time)}</span>
            </p>
            <div>
              <h3 className="t-3 text-ink">{s.title}</h3>
              {s.note && <p className="mt-2 max-w-xl text-ink-soft">{s.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-mute">Heure de Lomé. Venez un quart d&apos;heure avant : on aura le temps de se dire bonjour.</p>
        <a href="/api/agenda" className="btn btn-line !min-h-11 text-sm text-ink">
          <CalendarPlus aria-hidden className="h-4 w-4" /> Ajouter à mon agenda
        </a>
      </div>
    </div>
  );
}
