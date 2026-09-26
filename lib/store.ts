import "server-only";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

// Petit stockage clé → JSON.
// - En production : Upstash Redis (ou Vercel KV) via son API REST, sans dépendance.
//   Variables : UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
//   (ou KV_REST_API_URL + KV_REST_API_TOKEN).
// - Sinon : fichiers JSON dans ./.data (développement, serveur classique / VPS).

const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const DATA_DIR = path.join(process.cwd(), ".data");

export const storeKind: "redis" | "file" = REST_URL && REST_TOKEN ? "redis" : "file";

/** Vrai quand les écritures risquent d'être perdues (fichiers sur un hébergement serverless). */
export const storeIsEphemeral = storeKind === "file" && Boolean(process.env.VERCEL);

async function redis<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(REST_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Stockage indisponible (${res.status})`);
  const data = (await res.json()) as { result: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

function fileFor(key: string) {
  return path.join(DATA_DIR, key.replace(/[^a-z0-9_-]/gi, "_") + ".json");
}

export async function getJSON<T>(key: string): Promise<T | null> {
  try {
    const raw =
      storeKind === "redis"
        ? await redis<string | null>(["GET", key])
        : await readFile(fileFor(key), "utf8");
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    console.error(`[store] lecture « ${key} » impossible :`, err);
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  const raw = JSON.stringify(value);
  if (storeKind === "redis") {
    await redis(["SET", key, raw]);
    return;
  }
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(fileFor(key), raw, "utf8");
}

export async function del(key: string): Promise<void> {
  if (storeKind === "redis") {
    await redis(["DEL", key]);
    return;
  }
  await rm(fileFor(key), { force: true });
}
