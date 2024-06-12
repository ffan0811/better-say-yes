"use server";
import { ImageProps } from "@/types/image";
import sharp from "sharp";

const cache = new Map<ImageProps, string>();

// TODO: make it usable globally, For example, do not have contentId. instead, get just url
export default async function getBase64ImageUrl(
  contentId: string,
  image: ImageProps
): Promise<string> {
  try {
    let url = cache.get(image);
    if (url) {
      return url;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/contents/${contentId}/${image.src}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // Use sharp to process the image
    const minifiedBuffer = await sharp(Buffer.from(buffer)).blur(20).toBuffer();

    const base64 = minifiedBuffer.toString("base64");
    const mimeType = image.src.endsWith(".png") ? "image/png" : "image/jpeg";
    url = `data:${mimeType};base64,${base64}`;
    cache.set(image, url);
    return url;
  } catch (error) {}
}
