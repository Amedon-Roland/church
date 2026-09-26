import "server-only";
import { getJSON, setJSON } from "./store";

// Images envoyées depuis l'administration. Elles sont redimensionnées dans le
// navigateur (WebP ≈ 100–250 Ko) puis stockées ici et servies par /media/[id].

type Media = { type: string; data: string };

export const MAX_MEDIA_BYTES = 900_000;

export async function saveMedia(dataUrl: string) {
  const match = /^data:(image\/(?:webp|jpeg|png));base64,([a-z0-9+/=]+)$/i.exec(dataUrl);
  if (!match) throw new Error("Format d'image non pris en charge");
  if (match[2].length * 0.75 > MAX_MEDIA_BYTES) throw new Error("Image trop lourde");
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  await setJSON(`media:${id}`, { type: match[1], data: match[2] } satisfies Media);
  return `/media/${id}`;
}

export async function getMedia(id: string) {
  if (!/^[a-f0-9]{16}$/.test(id)) return null;
  const media = await getJSON<Media>(`media:${id}`);
  return media ? { type: media.type, bytes: Buffer.from(media.data, "base64") } : null;
}
