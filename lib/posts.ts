import "server-only";
import { del, getJSON, setJSON } from "./store";

export type PostStatus = "draft" | "published";

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  author: string;
  status: PostStatus;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

export const CATEGORIES = ["Méditation", "Vie d'église", "Témoignage", "Enseignement", "Annonce", "Famille"];

const SEED: Post[] = [
  {
    id: "bienvenue",
    slug: "bienvenue-sur-notre-nouveau-site",
    title: "Bienvenue sur notre nouveau site",
    excerpt:
      "Des cultes à suivre en direct, une Bible à portée de main et un plan pour venir nous voir : voici ce qui change.",
    cover: "",
    category: "Annonce",
    author: "L'équipe de Terre de Victoire",
    status: "published",
    publishedAt: "2026-09-26T09:00:00.000Z",
    updatedAt: "2026-09-26T09:00:00.000Z",
    readingMinutes: 2,
    content: `Shalom à vous !

Ce site a été repensé pour une raison simple : que vous puissiez rester connectés à la famille, même quand vous ne pouvez pas être dans la salle le dimanche.

## Ce que vous y trouverez

- **Le direct** : quand un culte est diffusé sur notre chaîne YouTube, il apparaît automatiquement sur la page *Direct & replays*. Les cultes passés restent disponibles en rediffusion.
- **La Bible** : la version Louis Segond 1910, complète. Vous pouvez surligner un verset, le copier ou l'envoyer à quelqu'un qui en a besoin.
- **Le blog** : des nouvelles de l'église, des méditations et des témoignages.
- **Nous trouver** : une carte et un itinéraire depuis l'endroit où vous êtes.

Et puis il y a Shalom, notre petite colombe. Elle vous accompagne de page en page. Si elle vous dérange, dites-lui d'aller se reposer — elle ne le prendra pas mal.

> « Voici, qu'il est agréable, qu'il est doux pour des frères de demeurer ensemble ! » — Psaume 133:1

À dimanche !`,
  },
  {
    id: "suivre-le-direct",
    slug: "comment-suivre-nos-cultes-en-direct",
    title: "Comment suivre nos cultes en direct",
    excerpt: "Pas besoin de compte ni d'application : trois façons simples de vivre le culte avec nous depuis chez vous.",
    cover: "",
    category: "Vie d'église",
    author: "L'équipe de Terre de Victoire",
    status: "published",
    publishedAt: "2026-09-25T09:00:00.000Z",
    updatedAt: "2026-09-25T09:00:00.000Z",
    readingMinutes: 2,
    content: `Malade, en voyage, ou loin de Lomé ? Le culte vient à vous.

## 1. Sur ce site

Ouvrez la page **Direct & replays**. Quand nous sommes en direct, le lecteur se lance en haut de la page. Sinon, vous verrez un compte à rebours jusqu'au prochain culte.

## 2. Sur YouTube

Abonnez-vous à notre chaîne et activez la cloche 🔔 : YouTube vous préviendra dès que le direct commence.

## 3. En rediffusion

Vous avez manqué le culte ? Tous nos directs restent disponibles dans la liste des rediffusions. Idéal pour réécouter une prédication qui vous a touché, ou la partager à un proche.

*Une petite astuce : sur téléphone, si la connexion est faible, baissez la qualité de la vidéo dans les réglages du lecteur (roue dentée).*`,
  },
];

function toMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...meta } = post;
  return meta;
}

async function readIndex(): Promise<PostMeta[]> {
  return (await getJSON<PostMeta[]>("posts:index")) ?? SEED.map(toMeta);
}

export async function listPosts({ includeDrafts = false } = {}) {
  const index = await readIndex();
  return index
    .filter((p) => includeDrafts || p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostById(id: string): Promise<Post | null> {
  return (await getJSON<Post>(`post:${id}`)) ?? SEED.find((p) => p.id === id) ?? null;
}

export async function getPostBySlug(slug: string, { includeDrafts = false } = {}) {
  const meta = (await readIndex()).find((p) => p.slug === slug);
  if (!meta || (!includeDrafts && meta.status !== "published")) return null;
  return getPostById(meta.id);
}

export function slugify(input: string) {
  return (
    input
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/['’]/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "article"
  );
}

export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 200));
}

/** Enregistre (création ou mise à jour). Garantit l'unicité du slug. */
export async function savePost(post: Post) {
  const index = await readIndex();
  // À la première écriture, les articles d'exemple sont réellement enregistrés.
  if (!(await getJSON("posts:index"))) {
    for (const seed of SEED) await setJSON(`post:${seed.id}`, seed);
  }
  let slug = post.slug;
  for (let n = 2; index.some((p) => p.slug === slug && p.id !== post.id); n++) slug = `${post.slug}-${n}`;
  const final = { ...post, slug };
  await setJSON(`post:${final.id}`, final);
  await setJSON("posts:index", [...index.filter((p) => p.id !== final.id), toMeta(final)]);
  return final;
}

export async function deletePost(id: string) {
  const index = await readIndex();
  await setJSON(
    "posts:index",
    index.filter((p) => p.id !== id),
  );
  await del(`post:${id}`);
}
