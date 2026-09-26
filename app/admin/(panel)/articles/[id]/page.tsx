import { PostEditor } from "@/components/admin/PostEditor";
import { CATEGORIES, getPostById, listPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

export const metadata = { title: "Modifier l'article" };

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const post = await getPostById((await params).id);
  if (!post) notFound();
  const used = (await listPosts({ includeDrafts: true })).map((p) => p.category);
  return <PostEditor post={post} categories={[...new Set([...CATEGORIES, ...used])]} />;
}
