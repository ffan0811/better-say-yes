import { atom } from "jotai";

export const contentsAtom = atom<{
  question: string;
  alertAfterYes?: string;
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  secretCode?: string;
  images: File[];
}>({
  question: "",
  alertAfterYes: "",
  afterYesTitle: "",
  afterYesDescription: "",
  afterYesButtonText: "",
  afterYesButtonLink: "",
  secretCode: "",
  images: [],
});
