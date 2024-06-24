import { ErrorType } from "@/types/global";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getRandomElementInArray(array: string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const handleError = (e: Error | unknown) => {
  let error: ErrorType = { code: "error", message: "Error occurred." };

  if (e instanceof Error) {
    console.error(e);
    error.message = e.message;
  }

  return error;
};

function parseRgbString(rgbString) {
  const result = rgbString.match(/\d+/g);
  return {
    r: parseInt(result[0], 10),
    g: parseInt(result[1], 10),
    b: parseInt(result[2], 10),
  };
}

export function getContrastingColor(rgbString) {
  const { r, g, b } = parseRgbString(rgbString);

  // Calculate the perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Determine if the background is light or dark
  const fontColor = brightness > 128 ? "black" : "white";

  return fontColor;
}

export const copyToClipboard = async (text: string) => {
  let result,
    error = null;
  try {
    await navigator.clipboard.writeText(text);
    result = true;
  } catch (error) {
    error = "Failed to copy";
  }

  return { result, error };
};
