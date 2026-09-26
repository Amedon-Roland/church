import { formatDate } from "@/lib/format";
import { listPosts } from "@/lib/posts";
import { PenLine } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Articles" };

export default async function PostsAdmin() {
  const posts = await listPosts({ includeDrafts: true });
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl text-ink sm:text-5xl">Articles</h1>
        <Link href="/admin/articles/nouveau" className="btn btn-primary">
          <PenLine className="h-4 w-4" /> Nouvel article
        </Link>
      </div>
      <div className="card mt-8 overflow-hidden">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-ink-mute">Aucun article. Écrivez le premier !</p>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/articles/${p.id}`} className="flex flex-col gap-1 p-4 hover:bg-linen/60 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-xl text-ink">{p.title}</span>
                    <span className="text-sm text-ink-mute">
                      {p.category} · {p.author}
                    </span>
                  </span>
                  <span className={`w-fit shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "draft" ? "bg-gold-soft text-gold-ink" : "bg-royal/10 text-royal"}`}>
                    {p.status === "draft" ? "Brouillon" : "Publié"}
                  </span>
                  <span className="shrink-0 text-sm text-ink-mute">{formatDate(p.publishedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
