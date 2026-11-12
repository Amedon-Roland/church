import { GalleryManager } from "@/components/admin/GalleryManager";
import { getJSON } from "@/lib/store";
import type { Photo } from "@/lib/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Galerie" };

export default async function AdminGalleryPage() {
  return <GalleryManager initial={(await getJSON<Photo[]>("gallery")) ?? []} />;
}
