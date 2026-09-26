// Statut du direct, demandé une seule fois par visite et partagé entre composants.
export type LiveStatus = { live: boolean; upcoming?: { title: string; scheduledAt?: string } | null; title?: string };

let pending: Promise<LiveStatus> | null = null;

export function getLiveStatus() {
  pending ??= fetch("/api/live")
    .then((r) => (r.ok ? (r.json() as Promise<LiveStatus>) : { live: false }))
    .catch(() => ({ live: false }));
  return pending;
}
