"use client";
import { useAtom } from "jotai";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { contentsAtom } from "@/atoms/content";
import DynamicHeightTextarea from "@/components/DynamicHeightTextarea";
import { DefaultButton, OutlineButton } from "./Button";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import { useColor } from "../color-provider";
import NoButton from "./NoButton";

export const QUESTION_COMMON_CLASSES =
  "leading-9 text-center break-words text-3xl whitespace-pre";

export default function ProductionMain({
  question,
  alertAfterYes,
  isPreview,
}: {
  question: string;
  alertAfterYes?: string;
  isPreview?: boolean;
}) {
  const [preview, setPreview] = useAtom(previewAtom);
  const [contents, setContents] = useAtom(contentsAtom);
  const { themeColor } = useColor();

  const handleYes = () => {
    if (alertAfterYes) {
      alert(alertAfterYes);
    }
    if (isPreview) {
      setPreview({
        ...preview,
        stage: PageStepType.AFTER_YES,
      });
    } else {
      // routing
    }
  };
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className="space-y-8 w-full">
        {isPreview ? (
          <DynamicHeightTextarea
            className={`w-full h-0 ${EDITABLE_INPUT_CLASSES} ${QUESTION_COMMON_CLASSES}`}
            value={question}
            onChange={(e) => {
              setContents({ ...contents, question: e.target.value });
            }}
          />
        ) : (
          <p className={` ${QUESTION_COMMON_CLASSES}`}>{question}</p>
        )}
        <div className="flex space-x-4 justify-center">
          <NoButton themeColor={themeColor} />
          <DefaultButton
            themeColor={themeColor}
            onClick={handleYes}
            className="min-w-40"
          >
            Yes
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
