import { PageStepType } from "@/types/status";
import { atom } from "jotai";

export const previewAtom = atom<{
  stage?: PageStepType;
}>({ stage: PageStepType.MAIN });
