"use client";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { useImages } from "../image-provider";
import { getSrc } from "@/lib/utils/image";
import { useAtom } from "jotai";
import { isLockedContentAtom } from "@/atoms/preview";
import { useRouter } from "next/navigation";

export const TITLE_COMMON_CLASSES =
  "text-center text-base font-bold uppercase tracking-widest w-full";

export const DESCRIPTION_COMMON_CLASSES =
  "text-center break-words whitespace-pre-line";

type AfterYesContentsProps = {
  contentId: string;
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
  tableName?: "contents" | "templates";
  className?: string;
  baseUrl?: string;
  secretCode?: string;
};

export default function AfterYesContents({
  contentId,
  title,
  description,
  button,
  tableName = "contents",
  className = "",
  baseUrl,
  secretCode,
}: AfterYesContentsProps) {
  const { viewableImages } = useImages();
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);
  const router = useRouter();
  useEffect(() => {
    if (secretCode && isLocked && baseUrl) {
      router.push(`${baseUrl}/${contentId}`);
    }
  }, [secretCode, isLocked, baseUrl]);

  if (secretCode && isLocked) return null;

  return (
    <div className={`w-full h-full p-4 ${className}`}>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden p-6 text-center">
          {title}
          {description}
          {button}
        </div>
        {(viewableImages || []).map((ele) => {
          const src = getSrc({ image: ele, contentId, tableName });
          return (
            <Image
              key={ele.src.value || ele.src.blob}
              alt="better say yes images"
              className="mb-5 transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder={ele.blurDataUrl ? "blur" : undefined}
              blurDataURL={ele.blurDataUrl || src || ""}
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
