import { ContentsType } from "@/types/content";
import { atom } from "jotai";

export const contentsAtom = atom<ContentsType>({
  question: "Do you wanna go out with me?",
  alertAfterYes: "",
  afterYesTitle: "Hello World",
  afterYesDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  afterYesButtonText: "❤️",
  afterYesButtonLink: "https://bettersayyes.com",
  secretCode: "",
  images: [],
  fontFamily: "",
  themeColor: "",
  backgroundColor: "",
});
