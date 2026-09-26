"use server";

import { requireAdmin } from "@/lib/admin";
import { SESSION_COOKIE, SESSION_DAYS, adminConfigured, checkPassword, createSessionToken } from "@/lib/auth";
import { saveMedia } from "@/lib/media";
import { updateMessages } from "@/lib/messages";
import { deletePost, getPostById, readingMinutes, savePost, slugify, type Post } from "@/lib/posts";
import { saveSettings } from "@/lib/settings";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/site";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* ---------------- Connexion ---------------- */

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  if (!adminConfigured()) return "L'administration n'est pas encore configurée (variable ADMIN_PASSWORD).";
  if (!(await checkPassword(String(form.get("password") ?? "")))) {
    await new Promise((r) => setTimeout(r, 800)); // ralentit les essais en série
    return "Mot de passe incorrect.";
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  const next = String(form.get("suite") ?? "");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/connexion");
}

/* ---------------- Articles ---------------- */

export type PostInput = Pick<Post, "title" | "slug" | "excerpt" | "content" | "cover" | "category" | "author" | "status" | "publishedAt"> & { id?: string };

function refreshBlog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function savePostAction(input: PostInput): Promise<{ ok: true; id: string; slug: string } | { ok: false; error: string }> {
  await requireAdmin();
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Le titre est obligatoire." };
  const existing = input.id ? await getPostById(input.id) : null;
  const content = input.content.trim();
  const now = new Date().toISOString();
  const post: Post = {
    id: existing?.id ?? crypto.randomUUID().slice(0, 12),
    slug: slugify(input.slug || title),
    title,
    excerpt: input.excerpt.trim() || content.replace(/[#>*_`[\]()!-]/g, "").replace(/\s+/g, " ").slice(0, 180),
    content,
    cover: input.cover.trim(),
    category: input.category.trim() || "Vie d'église",
    author: input.author.trim() || "L'équipe de Terre de Victoire",
    status: input.status === "published" ? "published" : "draft",
    publishedAt: input.publishedAt ? new Date(input.publishedAt).toISOString() : existing?.publishedAt ?? now,
    updatedAt: now,
    readingMinutes: readingMinutes(content),
  };
  try {
    const saved = await savePost(post);
    refreshBlog(saved.slug);
    if (existing && existing.slug !== saved.slug) revalidatePath(`/blog/${existing.slug}`);
    return { ok: true, id: saved.id, slug: saved.slug };
  } catch (e) {
    return { ok: false, error: `Enregistrement impossible : ${(e as Error).message}` };
  }
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  const post = await getPostById(id);
  await deletePost(id);
  refreshBlog(post?.slug);
  redirect("/admin/articles");
}

/* ---------------- Images ---------------- */

export async function uploadImageAction(dataUrl: string): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();
  try {
    return { ok: true, url: await saveMedia(dataUrl) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/* ---------------- Réglages ---------------- */

export async function saveSettingsAction(input: Settings): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  const lat = Number(input.lat);
  const lng = Number(input.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return { ok: false, error: "Coordonnées GPS invalides." };
  const clean: Settings = {
    ...DEFAULT_SETTINGS,
    ...input,
    lat,
    lng,
    services: input.services
      .filter((s) => s.title.trim() && /^\d{1,2}:\d{2}$/.test(s.time))
      .map((s) => ({ ...s, weekday: Number(s.weekday), day: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][Number(s.weekday)] }))
      .sort((a, b) => a.weekday - b.weekday || a.time.localeCompare(b.time)),
    leaders: input.leaders.filter((l) => l.role.trim() || l.name.trim()),
  };
  try {
    await saveSettings(clean);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/* ---------------- Messages ---------------- */

export async function markMessageAction(id: string, read: boolean) {
  await requireAdmin();
  await updateMessages((all) => all.map((m) => (m.id === id ? { ...m, read } : m)));
  revalidatePath("/admin", "layout");
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await updateMessages((all) => all.filter((m) => m.id !== id));
  revalidatePath("/admin", "layout");
}
