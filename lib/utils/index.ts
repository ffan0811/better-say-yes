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
