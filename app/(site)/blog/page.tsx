import { PostCard, PostCover } from "@/components/blog/PostCard";
import { PageIntro } from "@/components/site/PageIntro";
import { formatDate } from "@/lib/format";
import { listPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
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
        kicker="Le blog"
        title={
          <>
            Des nouvelles, des <em className="text-royal">histoires</em>, de la Parole.
          </>
        }
        lead="Ce que Dieu fait parmi nous, raconté par ceux qui le vivent."
      >
        {categories.length > 1 && (
          <nav aria-label="Catégories" className="mt-8 flex flex-wrap gap-2">
            <Link href="/blog" className={`rounded-full border px-4 py-1.5 text-sm font-medium ${!categorie ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}>
              Tout
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?categorie=${encodeURIComponent(c)}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium ${categorie === c ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}
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
            <p className="py-20 text-center text-ink-mute">Aucun article pour le moment. Revenez bientôt !</p>
          ) : (
            <>
              <Link href={`/blog/${featured.slug}`} className="group reveal grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
                <PostCover post={featured} className="aspect-[16/10] rounded-[1.5rem]" />
                <div>
                  <p className="text-sm text-ink-mute">
                    <span className="font-semibold text-gold-ink">À la une · {featured.category}</span> · {formatDate(featured.publishedAt)}
                  </p>
                  <h2 className="mt-3 text-4xl text-ink transition-colors group-hover:text-royal sm:text-5xl">{featured.title}</h2>
                  <p className="mt-4 text-lg text-ink-soft">{featured.excerpt}</p>
                  <p className="mt-5 text-sm text-ink-mute">
                    Par {featured.author} · {featured.readingMinutes} min de lecture
                  </p>
                </div>
              </Link>
              {rest.length > 0 && (
                <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p, i) => (
                    <PostCard key={p.id} post={p} index={i % 3} />
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
