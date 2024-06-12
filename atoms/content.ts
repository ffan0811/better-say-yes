import { ContentsType } from "@/types/content";
import { atom } from "jotai";

export const contentsAtom = atom<ContentsType>({
  question: "",
  alertAfterYes: "",
  afterYesTitle: "",
  afterYesDescription: "",
  afterYesButtonText: "",
  afterYesButtonLink: "",
  secretCode: "",
  images: [],
  fontFamily: "",
  themeColor: "",
  backgroundColor: "",
});
