"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageProps } from "@/types/image";
import { DefaultButton, DefaultLink } from "./Button";
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
import Link from "next/link";

const TITLE_COMMON_CLASSES =
  "text-center text-base font-bold uppercase tracking-widest";

const DESCRIPTION_COMMON_CLASSES =
  "text-center break-words whitespace-pre-line text-white/75";

export default function ProductionAfterYes({
  contentId,
  afterYesTitle,
  afterYesDescription,
  afterYesButtonText,
  afterYesButtonLink,
  images,
  isPreview,
}: {
  contentId: string;
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  images: { src: string; blurDataUrl?: string }[];
  isPreview?: boolean;
}) {
  const [contents, setContents] = useAtom(contentsAtom);
  const [tempLink, setTempLink] = useState<string>("");

  const newImages: ImageProps[] = [];

  console.log("contents", contents);

  return (
    <div className="w-full h-full">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 p-6 text-center text-white shadow-highlight">
          {isPreview ? (
            <input
              className={`${TITLE_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
              value={afterYesTitle}
              onChange={(e) => {
                setContents({ ...contents, afterYesTitle: e.target.value });
              }}
            />
          ) : (
            <h1 className={TITLE_COMMON_CLASSES}>{afterYesTitle}</h1>
          )}
          {isPreview ? (
            <DynamicHeightTextarea
              className={`w-full h-0 ${DESCRIPTION_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
              value={afterYesDescription}
              onChange={(e) => {
                setContents({
                  ...contents,
                  afterYesDescription: e.target.value,
                });
              }}
            />
          ) : (
            <p className={DESCRIPTION_COMMON_CLASSES}>{afterYesDescription}</p>
          )}

          {isPreview ? (
            <>
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DefaultButton>
                      <DynamicInput
                        className="bg-transparent outline-none text-center"
                        onChange={(e) =>
                          setContents({
                            ...contents,
                            afterYesButtonText: e.target.value,
                          })
                        }
                        value={afterYesButtonText}
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
            </>
          ) : afterYesButtonText ? (
            afterYesButtonLink ? (
              <DefaultLink href={afterYesButtonLink} target="_blank">
                {afterYesButtonText}
              </DefaultLink>
            ) : (
              <DefaultButton>{afterYesButtonText}</DefaultButton>
            )
          ) : null}
        </div>
        {(images || []).map((ele) => {
          console.log("ele", ele);
          let src = ele.src;
          if (ele.src.includes("blob")) {
          } else {
            src = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/contents/${contentId}/${ele.src}`;
          }
          console.log("src", ele.blurDataUrl);
          return (
            <Image
              key={ele.src}
              alt="better say yes images"
              className="mb-5 transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder="blur"
              blurDataURL={ele?.blurDataUrl || ""}
              src={src}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
            />
          );
        })}
      </div>
    </div>
  );
}
