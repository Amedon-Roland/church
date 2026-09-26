import { getSettings, nextService } from "@/lib/settings";

// Fichier .ics : les cultes hebdomadaires s'ajoutent en un geste à l'agenda du téléphone.
export const revalidate = 3600;

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

export async function GET() {
  const settings = await getSettings();
  const now = new Date();
  const events = settings.services.map((service, i) => {
    const start = nextService([service], now)!.at;
    const end = new Date(start.getTime() + 2 * 3600_000);
    return [
      "BEGIN:VEVENT",
      `UID:tdv-${i}-${service.weekday}-${service.time.replace(":", "")}@terre-de-victoire`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${DAYS[service.weekday]}`,
      `SUMMARY:${esc(`${service.title} — Terre de Victoire`)}`,
      `LOCATION:${esc(settings.address)}`,
      `DESCRIPTION:${esc(service.note ?? "")}`,
      "END:VEVENT",
    ].join("\r\n");
  });
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Terre de Victoire//Cultes//FR", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR"].join("\r\n");
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cultes-terre-de-victoire.ics"',
    },
  });
}
