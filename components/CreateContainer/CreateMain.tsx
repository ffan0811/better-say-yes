"use client";
import { useAtom } from "jotai";
import { isLockedContentAtom, previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { contentsAtom } from "@/atoms/content";
import DynamicHeightTextarea from "@/components/DynamicHeightTextarea";
import { DefaultButton } from "../Production/Button";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import { useColor } from "../color-provider";
import MainContents, {
  ANSWER_BUTTON_COMMON_CLASSES,
  QUESTION_COMMON_CLASSES,
} from "../Production/MainContents";
import MaxLength from "../MaxLength";
import { MAX_QUESTION_LENGTH } from "@/constants/content";
import { usePathname } from "next/navigation";
import SecretCodeContents from "./SecretCodeContents";
import { useEffect } from "react";

export default function CreateMain({}: {}) {
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);
  const [preview, setPreview] = useAtom(previewAtom);
  const [contents, setContents] = useAtom(contentsAtom);
  const pathname = usePathname();
  const { themeColor } = useColor();

  useEffect(() => {
    if (!contents.secretCode) {
      setIsLocked(false);
    }
  }, [contents.secretCode]);

  const handleYes = () => {
    if (contents.alertAfterYes) {
      alert(contents.alertAfterYes);
    }
    setPreview({
      ...preview,
      stage: PageStepType.AFTER_YES,
    });
  };

  const isCreatePage = pathname.includes("create");
  return (
    <div
      className={`flex justify-center items-center flex-col w-full ${
        isCreatePage ? "h-[calc(100vh-5rem)]" : "h-screen"
      }`}
    >
      <MainContents
        title={
          <MaxLength
            className="w-11/12 flex justify-center"
            maxLength={MAX_QUESTION_LENGTH}
            currentLength={contents.question.length}
          >
            <DynamicHeightTextarea
              className={`w-full h-0 bg-transparent outline-none focus:border border-dashed border-neutral-500 whitespace-pre-line-line ${EDITABLE_INPUT_CLASSES} ${QUESTION_COMMON_CLASSES}`}
              value={contents.question}
              maxLength={MAX_QUESTION_LENGTH}
              onChange={(e) => {
                setContents({ ...contents, question: e.target.value });
              }}
            />
          </MaxLength>
        }
        secretCode={
          <SecretCodeContents
            secretCode={contents.secretCode}
            secretCodeQuestion={contents.secretCodeQuestion}
            themeColor={contents.themeColor}
            isEditSecretCodeQuestionDisabled={false}
          />
        }
        themeColor={themeColor}
      >
        <DefaultButton
          themeColor={themeColor}
          onClick={handleYes}
          className={ANSWER_BUTTON_COMMON_CLASSES}
        >
          Yes
        </DefaultButton>
      </MainContents>
    </div>
  );
}
