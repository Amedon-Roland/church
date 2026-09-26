import { PostCard, PostCover } from "@/components/blog/PostCard";
import { ShareButton } from "@/components/ui/ShareButton";
import { formatDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { getPostBySlug, listPosts } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt, images: post.cover ? [post.cover] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const more = (await listPosts()).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article>
      <header className="paper-grain border-b border-line">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-ink-mute hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Tous les articles
          </Link>
          <p className="kicker mt-8">{post.category}</p>
          <h1 className="mt-4 text-[2.5rem] leading-[1.05] text-ink sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl text-ink-soft">{post.excerpt}</p>
          <p className="mt-6 text-sm text-ink-mute">
            Par <span className="font-semibold text-ink">{post.author}</span> · {formatDate(post.publishedAt)} · {post.readingMinutes} min de lecture
          </p>
        </div>
      </header>

      {post.cover && (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <PostCover post={post} className="aspect-[16/9] rounded-[1.5rem]" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="prose-church" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        <div className="ornament mt-14" aria-hidden>
          ✦
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="hand text-2xl text-royal">Ce texte vous a fait du bien ?</p>
          <ShareButton text={post.title} label="Le partager" className="text-ink" />
        </div>
      </div>

      {more.length > 0 && (
        <section className="border-t border-line bg-linen/60 py-16">
          <div className="container-x">
            <h2 className="text-3xl text-ink">À lire aussi</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
