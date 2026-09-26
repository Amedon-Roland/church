import { getMedia } from "@/lib/media";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const media = await getMedia((await params).id);
  if (!media) return new Response("Image introuvable", { status: 404 });
  return new Response(new Uint8Array(media.bytes), {
    headers: {
      "Content-Type": media.type,
      // Une image envoyée n'est jamais modifiée (un nouvel envoi = un nouvel identifiant).
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
