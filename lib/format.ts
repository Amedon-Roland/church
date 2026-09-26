const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lome" });
const shortFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "Africa/Lome" });
const fullFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lome" });

export const formatDate = (iso: string) => dateFmt.format(new Date(iso));
export const formatShort = (iso: string) => shortFmt.format(new Date(iso));
export const formatFull = (iso: string) => {
  const s = fullFmt.format(new Date(iso)).replace(":00", "h").replace(":", "h");
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const hour = (time: string) => time.replace(":00", "h").replace(":", "h");

export function formatViews(n?: number) {
  if (n === undefined) return "";
  if (n < 1000) return `${n} vue${n > 1 ? "s" : ""}`;
  return `${(n / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} k vues`;
}
