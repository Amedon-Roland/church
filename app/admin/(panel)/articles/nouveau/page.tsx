import { PostEditor } from "@/components/admin/PostEditor";
import { CATEGORIES } from "@/lib/posts";

export const metadata = { title: "Nouvel article" };

export default function NewPost() {
  return <PostEditor categories={CATEGORIES} />;
}
