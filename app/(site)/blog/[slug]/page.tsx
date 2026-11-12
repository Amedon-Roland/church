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
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-mute hover:text-ink">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Toutes les nouvelles
          </Link>
          <p className="kicker mt-8">{post.category}</p>
          <h1 data-split="now" className="t-2 mt-5 text-ink">{post.title}</h1>
          <p className="lead mt-6">{post.excerpt}</p>
          <p className="mt-6 text-sm text-ink-mute">
            Par <span className="font-semibold text-ink">{post.author}</span> · {formatDate(post.publishedAt)} · {post.readingMinutes} min de lecture
          </p>
        </div>
      </header>

      {post.cover && (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <PostCover post={post} className="aspect-[16/9] rounded-[2rem]" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="prose-church" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-[1.5rem] bg-linen p-6 sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">Ce texte vous a fait du bien ?</p>
            <p className="mt-1 text-ink-soft">Il fera peut-être du bien à quelqu&apos;un d&apos;autre.</p>
          </div>
          <ShareButton text={post.title} label="L'envoyer à quelqu'un" className="text-ink" />
        </div>
      </div>

      {more.length > 0 && (
        <section className="section border-t border-line">
          <div className="container-x">
            <h2 className="t-2 text-ink">À lire <em>aussi</em></h2>
            <div data-reveal-group className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
