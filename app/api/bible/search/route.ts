import { chapterHref } from "@/lib/bible/books";
import { parseReference, searchBible } from "@/lib/bible/server";

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 80).trim();
  if (q.length < 2) return Response.json({ reference: null, hits: [], total: 0 });

  const ref = parseReference(q);
  const reference = ref ? { label: `${ref.book.name} ${ref.chapter}${ref.verse ? `:${ref.verse}` : ""}`, href: chapterHref(ref.book, ref.chapter, ref.verse) } : null;
  const { hits, total } = searchBible(q);
  return Response.json(
    { reference, hits, total },
    { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } },
  );
}
