import { v4 as uuidv4 } from "uuid";

import fetch from "node-fetch";
import sharp from "sharp";

export const validateImage = (file: File) => {
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  let error = "";
  if (file instanceof File === false) {
    error = "Expected a file";
  } else if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    error = "Only these types are allowed .jpg, .jpeg, and .png";
  }
  return error;
};

export const getFileExtension = (file: File): string | null => {
  const mimeTypeParts = file.type.split("/");
  if (mimeTypeParts.length === 2) {
    const fileExtension = mimeTypeParts[1];
    if (fileExtension) {
      return fileExtension.toLowerCase();
    }
  }

  return ".unknown";
};

export const createImageFileName = (image: File): string => {
  const id = uuidv4();
  return `${id}.${getFileExtension(image)}`;
};

export const createImageFileNames = (images: File | File[]) => {
  if (!images) return images;

  if (Array.isArray(images)) {
    return images.map((image) => createImageFileName(image));
  } else {
    return createImageFileName(images); // Return single string instead of array
  }
};

// NOTE: only works in server
export async function getBlurDataURL(
  publicUrl: string
): Promise<string | null> {
  try {
    const response = await fetch(publicUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resizedImageBuffer = await sharp(buffer)
      .resize(10) // Resize to 10px
      .blur() // Apply blur
      .toBuffer();

    const base64Image = resizedImageBuffer.toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return null;
  }
}
