import { hour } from "@/lib/format";
import type { ServiceTime } from "@/lib/site";
import { CalendarPlus } from "lucide-react";

/** Les rendez-vous de la semaine, présentés comme un programme imprimé. */
export function ServicesProgram({ services }: { services: ServiceTime[] }) {
  return (
    <div className="card overflow-hidden">
      <ol className="divide-y divide-line">
        {services.map((s, i) => (
          <li key={s.day + s.time} className="reveal grid grid-cols-[4.5rem_1fr] gap-4 p-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-6" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
            <div className="text-center">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">{s.day}</p>
              <p className="font-serif text-3xl leading-tight text-royal sm:text-4xl">{hour(s.time)}</p>
            </div>
            <div className="border-l border-line pl-4 sm:pl-6">
              <h3 className="text-[1.45rem] text-ink">{s.title}</h3>
              {s.note && <p className="mt-1 text-[0.95rem] text-ink-soft">{s.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-linen/60 px-5 py-4 sm:px-6">
        <p className="text-sm text-ink-soft">Heure de Lomé (GMT). Arrivez 15 minutes avant : il y a toujours du monde !</p>
        <a href="/api/agenda" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline">
          <CalendarPlus className="h-4 w-4" /> Ajouter à mon agenda
        </a>
      </div>
    </div>
  );
}
