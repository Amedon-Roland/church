// Redimensionne une image dans le navigateur avant l'envoi (WebP, 1600 px max).
export async function resizeImage(file: File, max = 1600, quality = 0.82): Promise<string> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("Cette image n'a pas pu être lue. Essayez une photo JPG ou PNG.");
  }
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  let url = canvas.toDataURL("image/webp", quality);
  // Safari ancien : pas d'encodage WebP → JPEG.
  if (!url.startsWith("data:image/webp")) url = canvas.toDataURL("image/jpeg", quality);
  return url;
}
