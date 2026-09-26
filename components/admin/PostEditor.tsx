"use client";

import { deletePostAction, savePostAction, type PostInput } from "@/app/admin/actions";
import { renderMarkdown } from "@/lib/markdown";
import type { Post } from "@/lib/posts";
import { Bold, Check, ExternalLink, Heading2, ImagePlus, Italic, Link2, List, Loader2, Quote, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ImageField, uploadFile } from "./ImageField";

const field = "w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-ink focus:border-royal focus:bg-card focus:outline-none";

const toLocalInput = (iso?: string) => {
  const d = iso ? new Date(iso) : new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const slugPreview = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export function PostEditor({ post, categories }: { post?: Post; categories: string[] }) {
  const router = useRouter();
  const [data, setData] = useState<PostInput>({
    id: post?.id,
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    cover: post?.cover ?? "",
    category: post?.category ?? categories[0],
    author: post?.author ?? "",
    status: post?.status ?? "draft",
    publishedAt: toLocalInput(post?.publishedAt),
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [pending, start] = useTransition();
  const [uploading, setUploading] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof PostInput>(k: K, v: PostInput[K]) => {
    setData((d) => ({ ...d, [k]: v, ...(k === "title" && !slugTouched ? { slug: slugPreview(String(v)) } : {}) }));
    setDirty(true);
  };

  // Évite de perdre un texte en cours en quittant la page.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => dirty && e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function wrap(before: string, after = before, placeholder = "texte") {
    const el = area.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const chosen = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + chosen + after + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + chosen.length);
    });
  }

  function linePrefix(prefix: string) {
    const el = area.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    set("content", value.slice(0, lineStart) + prefix + value.slice(lineStart));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + prefix.length, s + prefix.length);
    });
  }

  async function insertImage(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      wrap("\n![", `](${url})\n`, "Description de l'image");
    } catch (e) {
      setMessage({ ok: false, text: (e as Error).message });
    } finally {
      setUploading(false);
    }
  }

  function save(status?: PostInput["status"]) {
    const payload = { ...data, status: status ?? data.status };
    start(async () => {
      const res = await savePostAction(payload);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setDirty(false);
      setData((d) => ({ ...d, id: res.id, slug: res.slug, status: payload.status }));
      setMessage({ ok: true, text: payload.status === "published" ? "Article publié !" : "Brouillon enregistré." });
      if (!post) router.replace(`/admin/articles/${res.id}`);
      else router.refresh();
    });
  }

  const tools = [
    { Icon: Bold, label: "Gras", run: () => wrap("**") },
    { Icon: Italic, label: "Italique", run: () => wrap("*") },
    { Icon: Heading2, label: "Intertitre", run: () => linePrefix("## ") },
    { Icon: List, label: "Liste", run: () => linePrefix("- ") },
    { Icon: Quote, label: "Citation / verset", run: () => linePrefix("> ") },
    { Icon: Link2, label: "Lien", run: () => wrap("[", "](https://)", "texte du lien") },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/articles" className="text-sm text-ink-mute hover:text-ink">
          ← Articles
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {data.id && data.status === "published" && (
            <Link href={`/blog/${data.slug}`} target="_blank" className="btn btn-line !min-h-10 text-sm text-ink">
              <ExternalLink className="h-4 w-4" /> Voir
            </Link>
          )}
          <button type="button" onClick={() => save("draft")} disabled={pending} className="btn btn-line !min-h-10 text-sm text-ink">
            {data.status === "published" ? "Repasser en brouillon" : "Enregistrer le brouillon"}
          </button>
          <button type="button" onClick={() => save("published")} disabled={pending} className="btn btn-primary !min-h-10 text-sm">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {data.status === "published" ? "Mettre à jour" : "Publier"}
          </button>
        </div>
      </div>
      {message && <p className={`mt-4 rounded-xl px-4 py-2.5 text-sm font-medium ${message.ok ? "bg-royal/10 text-royal" : "bg-live/10 text-live"}`}>{message.text}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-5">
          <input
            value={data.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Titre de l'article"
            className="w-full border-0 bg-transparent font-serif text-4xl text-ink placeholder:text-ink-mute/60 focus:outline-none sm:text-5xl"
            aria-label="Titre"
          />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">Chapeau (résumé affiché dans les listes)</span>
            <textarea value={data.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={`${field} resize-y`} placeholder="Une ou deux phrases qui donnent envie de lire." />
          </label>

          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 border-b border-line px-2 py-1.5">
              <div className="mr-2 flex rounded-full bg-linen p-0.5 text-sm">
                {(["write", "preview"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-3 py-1 font-medium ${tab === t ? "bg-card text-ink shadow-sm" : "text-ink-mute"}`}>
                    {t === "write" ? "Écrire" : "Aperçu"}
                  </button>
                ))}
              </div>
              {tab === "write" &&
                tools.map(({ Icon, label, run }) => (
                  <button key={label} type="button" onClick={run} title={label} aria-label={label} className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-linen hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              {tab === "write" && (
                <button type="button" onClick={() => imageInput.current?.click()} title="Insérer une image" aria-label="Insérer une image" className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-linen hover:text-ink">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                </button>
              )}
              <input ref={imageInput} type="file" accept="image/*" hidden onChange={(e) => insertImage(e.target.files?.[0])} />
            </div>
            {tab === "write" ? (
              <textarea
                ref={area}
                value={data.content}
                onChange={(e) => set("content", e.target.value)}
                rows={22}
                className="block w-full resize-y bg-card px-5 py-4 font-mono text-[0.95rem] leading-relaxed text-ink focus:outline-none"
                placeholder={"Écrivez ici…\n\n## Un intertitre\n\n**gras**, *italique*, > pour citer un verset"}
                aria-label="Contenu"
              />
            ) : (
              <div className="prose-church min-h-[30rem] px-5 py-6 sm:px-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.content) || "<p><em>Rien à afficher pour l'instant.</em></p>" }} />
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card space-y-4 p-5">
            <p className="text-sm font-semibold text-ink">
              Statut : <span className={data.status === "published" ? "text-royal" : "text-gold-ink"}>{data.status === "published" ? "publié" : "brouillon"}</span>
            </p>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Date de publication</span>
              <input type="datetime-local" value={data.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Catégorie</span>
              <input list="categories" value={data.category} onChange={(e) => set("category", e.target.value)} className={field} />
              <datalist id="categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Auteur</span>
              <input value={data.author} onChange={(e) => set("author", e.target.value)} placeholder="L'équipe de Terre de Victoire" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Adresse de la page</span>
              <span className="flex items-center rounded-xl border border-line bg-paper pl-3 text-sm text-ink-mute focus-within:border-royal">
                /blog/
                <input
                  value={data.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugPreview(e.target.value));
                  }}
                  className="w-full bg-transparent py-2.5 pr-3 text-ink focus:outline-none"
                />
              </span>
            </label>
          </div>
          <div className="card p-5">
            <ImageField label="Image de couverture (facultative)" value={data.cover} onChange={(url) => set("cover", url)} />
          </div>
          {post && (
            <button
              type="button"
              onClick={() => confirm("Supprimer définitivement cet article ?") && start(() => deletePostAction(post.id))}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-live hover:bg-live/10"
            >
              <Trash2 className="h-4 w-4" /> Supprimer l&apos;article
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
