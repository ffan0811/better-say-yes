import { ReactNode } from "react";
import NoButton from "./NoButton";

export const QUESTION_COMMON_CLASSES =
  "leading-9 text-center break-words text-3xl whitespace-pre";

type MainContentsProps = {
  title: ReactNode;
  themeColor: string;
  children: ReactNode;
};

export default function MainContents({
  title,
  themeColor,
  children,
}: MainContentsProps) {
  return (
    <>
      {title}
      <div className="flex space-x-4 justify-center mt-8">
        <NoButton themeColor={themeColor} />
        {children}
      </div>
    </>
  );
}
