"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { answerNoLists } from "@/constants/message";
import { Button } from "../ui/button";
import { getRandomElementInArray } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { contentsAtom } from "@/atoms/content";
import DynamicHeightTextarea from "@/components/DynamicHeightTextarea";
import { DefaultButton, OutlineButton } from "./Button";

const QUESTION_COMMON_CLASSES =
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
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [contents, setContents] = useAtom(contentsAtom);

  useEffect(() => {
    const data = getRandomElementInArray(answerNoLists);
    setMsg(data);
  }, [open]);

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
            className={`w-full h-0 bg-transparent outline-none focus:border border-dashed border-neutral-500 ${QUESTION_COMMON_CLASSES}`}
            value={question}
            onChange={(e) => {
              setContents({ ...contents, question: e.target.value });
            }}
          />
        ) : (
          <p className={` ${QUESTION_COMMON_CLASSES}`}>{question}</p>
        )}
        <div className="flex space-x-4 justify-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <OutlineButton
              variant="outline"
              className="min-w-40"
              onClick={() => {
                setOpen(true);
              }}
            >
              No
            </OutlineButton>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hmm,,,</AlertDialogTitle>
                <AlertDialogDescription>{msg}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <DefaultButton>Okay...</DefaultButton>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DefaultButton onClick={handleYes} className="min-w-40">
            Yes
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
