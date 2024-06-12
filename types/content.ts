export type ContentsType = {
  question: string;
  alertAfterYes?: string;
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  secretCode?: string;
  images?: (File | string)[];
  fontFamily?: string;
  themeColor?: string;
  backgroundColor?: string;
};
