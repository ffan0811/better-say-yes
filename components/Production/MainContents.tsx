import { ReactNode } from "react";
import NoButton from "./NoButton";

const QUESTION_COMMON_CLASSES =
  "leading-9 text-center break-words text-3xl whitespace-pre";

type MainContentsProps = {
  question: string;
  themeColor: string;
  children: ReactNode;
};

export default function MainContents({
  question,
  themeColor,
  children,
}: MainContentsProps) {
  return (
    <>
      <p className={QUESTION_COMMON_CLASSES}>{question}</p>
      <div className="flex space-x-4 justify-center mt-4">
        <NoButton themeColor={themeColor} />
        {children}
      </div>
    </>
  );
}
