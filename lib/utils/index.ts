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

function parseRgbString(rgbString: string): {
  r: number;
  g: number;
  b: number;
} {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(rgbString);
  return result
    ? {
        r: parseInt(result[1], 10),
        g: parseInt(result[2], 10),
        b: parseInt(result[3], 10),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 3) return q;
      if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function getContrastingColor(rgbString: string): string {
  const { r, g, b } = parseRgbString(rgbString);
  let { h, s, l } = rgbToHsl(r, g, b);

  // Reverse the lightness completely
  if (l === 1) {
    l = 0; // If lightness is 1, make it 0
  } else if (l === 0) {
    l = 1; // If lightness is 0, make it 1
  } else {
    l = 1 - l; // Reverse the lightness
  }

  const { r: cr, g: cg, b: cb } = hslToRgb(h, s, l);
  return `rgb(${cr}, ${cg}, ${cb})`;
}
