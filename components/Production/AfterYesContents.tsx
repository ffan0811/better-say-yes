"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { useImages } from "../image-provider";

export const TITLE_COMMON_CLASSES =
  "text-center text-base font-bold uppercase tracking-widest";

export const DESCRIPTION_COMMON_CLASSES =
  "text-center break-words whitespace-pre-line";

type AfterYesContentsProps = {
  contentId: string;
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
  className?: string;
};

export default function AfterYesContents({
  contentId,
  title,
  description,
  button,
  className = "string",
}: AfterYesContentsProps) {
  const { viewableImages } = useImages();

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 p-6 text-center shadow-highlight">
          {title}
          {description}
          {button}
        </div>
        {(viewableImages || []).map((ele) => {
          let src = ele.src;
          if (ele.src.includes("blob")) {
          } else {
            src = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/contents/${contentId}/${ele.src}`;
          }
          return (
            <Image
              key={ele.src}
              alt="better say yes images"
              className="mb-5 transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              placeholder={ele?.blurDataUrl ? "blur" : undefined}
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
