"use client";
import { useState } from "react";
import { DefaultButton } from "../Production/Button";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import { contentsAtom } from "@/atoms/content";
import { useAtom } from "jotai";
import DynamicHeightTextarea from "../DynamicHeightTextarea";
import DynamicInput from "../DynamicInput";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import { useColor } from "../color-provider";
import AfterYesContents, {
  DESCRIPTION_COMMON_CLASSES,
  TITLE_COMMON_CLASSES,
} from "../Production/AfterYesContents";

export default function CreateAfterYes({ contentId }: { contentId: string }) {
  const [contents, setContents] = useAtom(contentsAtom);
  const [tempLink, setTempLink] = useState<string>("");

  const { themeColor } = useColor();

  console.log("contents", contents);

  return (
    <AfterYesContents
      contentId={contentId}
      title={
        <input
          className={`${TITLE_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
          value={contents.afterYesTitle}
          onChange={(e) => {
            setContents({ ...contents, afterYesTitle: e.target.value });
          }}
        />
      }
      description={
        <DynamicHeightTextarea
          className={`w-full h-0 ${DESCRIPTION_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
          value={contents.afterYesDescription}
          onChange={(e) => {
            setContents({
              ...contents,
              afterYesDescription: e.target.value,
            });
          }}
        />
      }
      button={
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DefaultButton themeColor={themeColor}>
                <DynamicInput
                  className="bg-transparent outline-none text-center"
                  onChange={(e) =>
                    setContents({
                      ...contents,
                      afterYesButtonText: e.target.value,
                    })
                  }
                  value={contents.afterYesButtonText}
                />
              </DefaultButton>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center px-4 py-2">
              <DialogTrigger>
                <LinkIcon className="w-full h-full max-w-5 max-h-5 hover:opacity-80 transition-opacity" />
              </DialogTrigger>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link (Optional)</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 flex flex-col">
              <Input
                placeholder="https://bettersayyes.com"
                value={contents.afterYesButtonLink}
                onChange={(e) => setTempLink(e.target.value)}
              />
              <DialogTrigger
                className={`ml-auto ${buttonVariants({
                  variant: "default",
                })}`}
                onClick={() =>
                  setContents({
                    ...contents,
                    afterYesButtonLink: tempLink,
                  })
                }
              >
                Save
              </DialogTrigger>
            </div>
          </DialogContent>
        </Dialog>
      }
    />
  );
}
