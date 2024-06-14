"use client";
import { useAtom } from "jotai";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { contentsAtom } from "@/atoms/content";
import DynamicHeightTextarea from "@/components/DynamicHeightTextarea";
import { DefaultButton, OutlineButton } from "../Production/Button";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import { useColor } from "../color-provider";
import NoButton from "../Production/NoButton";
import MainContents, {
  QUESTION_COMMON_CLASSES,
} from "../Production/MainContents";
import MaxLength from "../MaxLength";
import { MAX_QUESTION_LENGTH } from "@/constants/content";

export default function CreateMain({}: {}) {
  const [preview, setPreview] = useAtom(previewAtom);
  const [contents, setContents] = useAtom(contentsAtom);
  const { themeColor } = useColor();

  const handleYes = () => {
    if (contents.alertAfterYes) {
      alert(contents.alertAfterYes);
    }
    setPreview({
      ...preview,
      stage: PageStepType.AFTER_YES,
    });
  };
  return (
    <div className="flex justify-center items-center flex-col w-full h-[calc(100vh-5rem)]">
      <MainContents
        title={
          <MaxLength
            className="w-11/12 flex justify-center"
            maxLength={MAX_QUESTION_LENGTH}
            currentLength={contents.question.length}
          >
            <DynamicHeightTextarea
              className={`w-full h-0 bg-transparent outline-none focus:border border-dashed border-neutral-500 whitespace-pre-line ${EDITABLE_INPUT_CLASSES} ${QUESTION_COMMON_CLASSES}`}
              value={contents.question}
              maxLength={MAX_QUESTION_LENGTH}
              onChange={(e) => {
                setContents({ ...contents, question: e.target.value });
              }}
            />
          </MaxLength>
        }
        themeColor={themeColor}
      >
        <DefaultButton
          themeColor={themeColor}
          onClick={handleYes}
          className="min-w-40"
        >
          Yes
        </DefaultButton>
      </MainContents>
    </div>
  );
}
