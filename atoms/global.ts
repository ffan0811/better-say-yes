import { atom } from "jotai";

export const globalLoaderAtom = atom<{ isActive: boolean; message: string }>({
  isActive: false,
  message: "",
});

export const uploadingImageLoaderAtom = atom<boolean>(false);