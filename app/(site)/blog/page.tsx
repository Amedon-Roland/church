import { PostCard, PostCover } from "@/components/blog/PostCard";
import { PageIntro } from "@/components/site/PageIntro";
import { formatDate } from "@/lib/format";
import { listPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nouvelles de la famille",
  description: "Nouvelles de l'église, méditations, témoignages et enseignements de Terre de Victoire à Lomé.",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
  const { categorie } = await searchParams;
  const all = await listPosts();
  const categories = [...new Set(all.map((p) => p.category))];
  const posts = categorie ? all.filter((p) => p.category === categorie) : all;
  const [featured, ...rest] = posts;

  return (
    <>
      <PageIntro
        kicker="Nouvelles de la famille"
        title={
          <>
            Des histoires <em>vraies,</em> racontées par les nôtres.
          </>
        }
        lead="Des témoignages, des méditations et les nouvelles de l'église. Ce que Dieu fait parmi nous, dit avec nos mots."
      >
        {categories.length > 1 && (
          <nav aria-label="Filtrer par catégorie" className="mt-9 flex flex-wrap gap-2" data-reveal>
            <Link href="/blog" aria-current={!categorie ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors ${!categorie ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}>
              Tout
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?categorie=${encodeURIComponent(c)}`}
                className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors ${categorie === c ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}
              >
                {c}
              </Link>
            ))}
          </nav>
        )}
      </PageIntro>

      <section className="py-14 lg:py-20">
        <div className="container-x">
          {!featured ? (
            <div className="mx-auto max-w-xl py-16 text-center">
              <p className="t-3 font-display font-semibold text-ink">Les premières nouvelles arrivent.</p>
              <p className="mt-3 text-ink-soft">L&apos;équipe prépare ses premiers articles. En attendant, vous pouvez revoir nos cultes ou ouvrir la Bible.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/direct" className="btn btn-primary">Revoir un culte</Link>
                <Link href="/bible" className="btn btn-line text-ink">Ouvrir la Bible</Link>
              </div>
            </div>
          ) : (
            <>
              <Link href={`/blog/${featured.slug}`} data-reveal className="group grid items-center gap-8 rounded-[2rem] lg:grid-cols-[1.3fr_1fr] lg:gap-14">
                <PostCover post={featured} className="aspect-[16/10] rounded-[2rem]" />
                <div>
                  <p className="text-sm text-ink-mute">
                    <span className="font-bold text-gold-ink">À la une · {featured.category}</span> · {formatDate(featured.publishedAt)}
                  </p>
                  <h2 className="t-2 mt-4 text-ink transition-colors group-hover:text-accent">{featured.title}</h2>
                  <p className="mt-4 text-lg text-ink-soft">{featured.excerpt}</p>
                  <p className="mt-5 text-sm text-ink-mute">
                    Par {featured.author} · {featured.readingMinutes} min de lecture
                  </p>
                </div>
              </Link>
              {rest.length > 0 && (
                <div data-reveal-group className="mt-20 grid gap-x-8 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
