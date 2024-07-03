"use client";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import DynamicHeightTextarea from "../DynamicHeightTextarea";
import { MAX_SECRET_QUESTION_LENGTH } from "@/constants/content";
import { ProductionInput } from "../Production/Input";
import Spinner from "../Spinner";
import { LockKeyholeIcon } from "lucide-react";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { contentsAtom } from "@/atoms/content";
import { isLockedContentAtom } from "@/atoms/preview";

type CreateSecretCodeProps = {
  secretCode: string;
  secretCodeQuestion: string;
  themeColor?: string;
  isEditSecretCodeQuestionDisabled?: boolean;
};

export default function SecretCodeContents({
  secretCode,
  secretCodeQuestion = "",
  themeColor,
  isEditSecretCodeQuestionDisabled = true,
}: CreateSecretCodeProps) {
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);
  const [contents, setContents] = useAtom(contentsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codeOnClient, setCodeOnClient] = useState<string>("");

  useEffect(() => {
    if (secretCodeQuestion) {
      setContents((prev) => {
        return { ...prev, secretCodeQuestion };
      });
    }
  }, [secretCodeQuestion]);

  useEffect(() => {
    if (secretCode) {
      setContents((prev) => {
        return { ...prev, secretCode };
      });
    }
  }, [secretCode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeOnClient(value);

    if (value && value === secretCode) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLocked(false);
        setCodeOnClient("");
        setIsLoading(false);
      }, 700);
    }
  };

  return (
    <div className="w-2/6 max-w-sm">
      <DynamicHeightTextarea
        className={`font-medium w-full leading-5 text-lg ${EDITABLE_INPUT_CLASSES}`}
        value={contents.secretCodeQuestion}
        maxLength={MAX_SECRET_QUESTION_LENGTH}
        onChange={(e) => {
          setContents({ ...contents, secretCodeQuestion: e.target.value });
        }}
        disabled={isEditSecretCodeQuestionDisabled}
      />
      <div className="relative">
        <ProductionInput
          themeColor={themeColor}
          // placeholder="Enter secret code"
          className="text-lg h-10 pr-10"
          value={codeOnClient}
          onChange={handleChange}
          // type="password"
        />
        <button className="p-2 absolute right-0 top-2/4 -translate-y-2/4 w-10 h-10">
          {isLoading ? (
            <Spinner style={{ stroke: themeColor }} />
          ) : (
            <LockKeyholeIcon
              className="w-full h-full"
              style={{ color: themeColor }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
