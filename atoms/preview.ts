import { PageStepType } from "@/types/status";
import { atom } from "jotai";

export const previewAtom = atom<{
  isOpen: boolean;
  stage?: PageStepType;
}>({ isOpen: false, stage: PageStepType.MAIN });
