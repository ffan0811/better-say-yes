import { atom } from "jotai";

export const previewAtom = atom<{
  isOpen: boolean;
  stage?: "secret" | "main" | "afterYes";
}>({ isOpen: false });
