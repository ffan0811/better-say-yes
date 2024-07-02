import { PageStepType } from "@/types/status";
import { atom } from "jotai";

export const previewAtom = atom<{
  stage?: PageStepType;
}>({ stage: PageStepType.MAIN });

// on the landing and create page, it becomes false
export const isLockedContentAtom = atom<boolean>(true);
