import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

const TONES = ["bg-royal text-paper", "bg-night text-gold-soft", "bg-earth text-gold-soft", "bg-gold-soft text-royal-deep", "bg-royal-deep text-paper"];

/** Couverture typographique quand l'article n'a pas de photo. */
export function PostCover({ post, className = "" }: { post: PostMeta; className?: string }) {
  if (post.cover) {
    return (
      <div className={`relative overflow-hidden bg-linen ${className}`}>
        <Image src={post.cover} alt="" fill unoptimized={!post.cover.startsWith("/")} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
    );
  }
  const tone = TONES[[...post.id].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];
  return (
    <div className={`relative flex items-end overflow-hidden p-6 ${tone} ${className}`}>
      <span aria-hidden className="absolute -right-4 -top-10 font-serif text-[11rem] italic leading-none opacity-15 transition-transform duration-700 group-hover:-translate-y-2">
        {post.title.charAt(0)}
      </span>
      <span className="relative text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{post.category}</span>
    </div>
  );
}

export function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <article className="reveal group" style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
      <Link href={`/blog/${post.slug}`} className="block">
        <PostCover post={post} className="aspect-[4/3] rounded-2xl" />
        <div className="pt-5">
          <p className="text-sm text-ink-mute">
            <span className="font-semibold text-gold-ink">{post.category}</span> · {formatDate(post.publishedAt)} · {post.readingMinutes} min
          </p>
          <h3 className="mt-2 text-[1.6rem] text-ink transition-colors group-hover:text-royal">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-ink-soft">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
