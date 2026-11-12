import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

const TONES = ["bg-indigo text-snow", "bg-night text-gold", "bg-clay text-snow", "bg-gold text-night"];

/** Couverture typographique quand l'article n'a pas de photo. */
export function PostCover({ post, className = "" }: { post: PostMeta; className?: string }) {
  if (post.cover) {
    return (
      <div className={`relative overflow-hidden bg-linen ${className}`}>
        <Image src={post.cover} alt="" fill unoptimized={!post.cover.startsWith("/")} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
      </div>
    );
  }
  const tone = TONES[[...post.id].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];
  return (
    <div className={`relative flex items-end overflow-hidden p-6 ${tone} ${className}`}>
      <span aria-hidden className="absolute -right-2 -top-8 font-display text-[11rem] font-bold leading-none opacity-15 transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-3">
        {post.title.charAt(0)}
      </span>
      <span className="relative text-xs font-bold uppercase tracking-[0.18em]">{post.category}</span>
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta; index?: number }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block rounded-[1.5rem]">
        <PostCover post={post} className="aspect-[4/3] rounded-[1.5rem]" />
        <div className="pt-5">
          <p className="text-sm text-ink-mute">
            <span className="font-bold text-gold-ink">{post.category}</span> · {formatDate(post.publishedAt)} · {post.readingMinutes} min
          </p>
          <h3 className="t-3 mt-2 text-ink transition-colors group-hover:text-accent">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-ink-soft">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
