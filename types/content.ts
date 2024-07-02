export type ContentsType = {
  tableName: "contents" | "templates" | null;
  name: string;
  question: string;
  alertAfterYes?: string;
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  secretCode?: string;
  secretCodeQuestion?: string;
  fontFamily?: string;
  themeColor?: string;
  backgroundColor?: string;
};
