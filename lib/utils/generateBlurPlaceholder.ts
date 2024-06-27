import { ImageProps } from "@/types/image";
import sharp from "sharp";

const cache = new Map<string, string>();

// TODO: make it usable globally, For example, do not have contentId. instead, get just url
export default async function getBase64ImageUrl({
  storageUrl,
  imageName,
  contentId,
}: {
  storageUrl: string;
  imageName: string;
  contentId: string;
}): Promise<string> {
  try {
    let url = cache.get(imageName);
    if (url) {
      return url;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${storageUrl}/${contentId}/thumbnail-${imageName}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // Use sharp to process the image
    const minifiedBuffer = await sharp(Buffer.from(buffer)).blur(20).toBuffer();

    const base64 = minifiedBuffer.toString("base64");
    const mimeType = imageName.endsWith(".png") ? "image/png" : "image/jpeg";
    url = `data:${mimeType};base64,${base64}`;
    cache.set(imageName, url);
    return url;
  } catch (error) {}
}

export const generateCustomizedImages = async ({
  images,
  contentId,
  tableName,
}: {
  images: string[];
  contentId: string;
  tableName: string;
}) => {
  let reducedResults: ImageProps[] = [];
  const blurImagePromises = (images || []).map((imageName) => {
    return getBase64ImageUrl({
      imageName,
      storageUrl: `/${tableName}`,
      contentId,
    });
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < (images || []).length; i++) {
    reducedResults.push({
      src: { blob: "", value: images[i] },
      blurDataUrl: imagesWithBlurDataUrls[i],
    });
  }
  return reducedResults;
};
