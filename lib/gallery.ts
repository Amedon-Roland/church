import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { getJSON, setJSON } from "./store";

export type Photo = {
  id: string;
  src: string;
  /** Description lue par les lecteurs d'écran : ce que l'on voit sur la photo. */
  alt: string;
  caption?: string;
  w?: number;
  h?: number;
};

const STATIC_DIR = path.join(process.cwd(), "public", "images", "galerie");

/** Photos déposées directement dans public/images/galerie (pratique pour un premier lot). */
async function staticPhotos(): Promise<Photo[]> {
  try {
    const files = (await readdir(STATIC_DIR)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
    return files.map((f) => ({ id: `fichier-${f}`, src: `/images/galerie/${f}`, alt: "La vie de l'église Terre de Victoire" }));
  } catch {
    return [];
  }
}

/** La galerie : d'abord les photos gérées dans l'administration, sinon celles du dossier. */
export const getGallery = cache(async (): Promise<Photo[]> => {
  const saved = await getJSON<Photo[]>("gallery");
  if (saved?.length) return saved;
  return staticPhotos();
});

export async function saveGallery(photos: Photo[]) {
  await setJSON("gallery", photos);
}
