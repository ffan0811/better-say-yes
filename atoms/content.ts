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
  question: "Do you wanna go out with me?",
  alertAfterYes: "",
  afterYesTitle: "Hello World",
  afterYesDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  afterYesButtonText: "❤️",
  afterYesButtonLink: "https://bettersayyes.com",
  secretCode: "",
  images: [],
});
