import { formatDate } from "@/lib/format";
import { listMessages } from "@/lib/messages";
import { listPosts } from "@/lib/posts";
import { storeKind } from "@/lib/store";
import { ArrowRight, Inbox, Newspaper, PenLine, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Tableau de bord" };

export default async function Dashboard() {
  const [posts, messages] = await Promise.all([listPosts({ includeDrafts: true }), listMessages()]);
  const drafts = posts.filter((p) => p.status === "draft").length;
  const unread = messages.filter((m) => !m.read);
  const hour = new Date().getUTCHours();

  return (
    <>
      <p className="hand text-3xl text-royal">{hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"} !</p>
      <h1 className="mt-1 text-4xl text-ink sm:text-5xl">Tableau de bord</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/articles" className="card p-5 hover:border-royal">
          <Newspaper className="h-5 w-5 text-gold-ink" />
          <p className="mt-4 font-serif text-4xl text-ink">{posts.length - drafts}</p>
          <p className="text-sm text-ink-soft">articles publiés{drafts ? ` · ${drafts} brouillon${drafts > 1 ? "s" : ""}` : ""}</p>
        </Link>
        <Link href="/admin/messages" className="card p-5 hover:border-royal">
          <Inbox className="h-5 w-5 text-gold-ink" />
          <p className="mt-4 font-serif text-4xl text-ink">{unread.length}</p>
          <p className="text-sm text-ink-soft">message{unread.length > 1 ? "s" : ""} non lu{unread.length > 1 ? "s" : ""}</p>
        </Link>
        <Link href="/admin/reglages" className="card p-5 hover:border-royal">
          <Settings className="h-5 w-5 text-gold-ink" />
          <p className="mt-4 font-serif text-2xl text-ink">Réglages</p>
          <p className="text-sm text-ink-soft">Horaires, réseaux, pasteurs, adresse…</p>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-ink">Derniers articles</h2>
            <Link href="/admin/articles/nouveau" className="btn btn-primary !min-h-9 !px-3 text-sm">
              <PenLine className="h-4 w-4" /> Écrire
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {posts.slice(0, 5).map((p) => (
              <li key={p.id}>
                <Link href={`/admin/articles/${p.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-royal">
                  <span className="min-w-0 truncate">{p.title}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${p.status === "draft" ? "bg-gold-soft text-gold-ink" : "bg-linen text-ink-mute"}`}>
                    {p.status === "draft" ? "Brouillon" : formatDate(p.publishedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-6">
          <h2 className="text-2xl text-ink">Messages récents</h2>
          {messages.length === 0 ? (
            <p className="mt-4 text-ink-mute">Aucun message pour l&apos;instant.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="py-3">
                  <p className="flex items-center gap-2 text-sm">
                    {!m.read && <span className="h-2 w-2 rounded-full bg-live" />}
                    <span className="font-semibold text-ink">{m.name}</span>
                    <span className="text-ink-mute">· {m.kind === "priere" ? "Prière" : "Question"}</span>
                  </p>
                  <p className="mt-1 line-clamp-1 text-ink-soft">{m.body}</p>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/messages" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-royal">
            Tous les messages <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
      <p className="mt-10 text-xs text-ink-mute">Stockage : {storeKind === "redis" ? "base Redis (permanent)" : "fichiers locaux (.data/)"}</p>
    </>
  );
}
