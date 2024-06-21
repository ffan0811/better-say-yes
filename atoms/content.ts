import { ContentsType } from "@/types/content";
import { atom } from "jotai";

export const contentsAtom = atom<ContentsType>({
  tableName: null,
  name: "",
  question: "",
  alertAfterYes: "",
  afterYesTitle: "",
  afterYesDescription: "",
  afterYesButtonText: "",
  afterYesButtonLink: "",
  secretCode: "",
  fontFamily: "",
  themeColor: "",
  backgroundColor: "",
});
