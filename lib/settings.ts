import "server-only";
import { cache } from "react";
import { DEFAULT_SETTINGS, type Settings } from "./site";
import { getJSON, setJSON } from "./store";

export const getSettings = cache(async (): Promise<Settings> => {
  const saved = await getJSON<Partial<Settings>>("settings");
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    socials: { ...DEFAULT_SETTINGS.socials, ...saved?.socials },
  };
});

export async function saveSettings(settings: Settings) {
  await setJSON("settings", settings);
}

/** Prochain culte à partir de maintenant (heure de Lomé = UTC, sans heure d'été). */
export function nextService(services: Settings["services"], now = new Date()) {
  let best: { service: Settings["services"][number]; at: Date } | null = null;
  for (const service of services) {
    const [h, m] = service.time.split(":").map(Number);
    const at = new Date(now);
    at.setUTCHours(h || 0, m || 0, 0, 0);
    let diff = (service.weekday - now.getUTCDay() + 7) % 7;
    // Le culte d'aujourd'hui compte encore pendant 2 h après son début.
    if (diff === 0 && now.getTime() > at.getTime() + 2 * 3600_000) diff = 7;
    at.setUTCDate(at.getUTCDate() + diff);
    if (!best || at < best.at) best = { service, at };
  }
  return best;
}
