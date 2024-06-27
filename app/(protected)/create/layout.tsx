"use client";
import { previewAtom } from "@/atoms/preview";
import { ImageProvider } from "@/components/image-provider";
import { PageStepType } from "@/types/status";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function CreateLayout({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useAtom(previewAtom);
  const searchFunc = useSearchParams();
  const paramsId = searchFunc.get("id");

  return (
    <ImageProvider contentId={paramsId}>
      <div
        className={` ${
          preview.stage === PageStepType.AFTER_YES
            ? "h-[calc(100vh-5rem)]"
            : "h-screen overflow-y-hidden "
        }`}
      >
        {children}
      </div>
    </ImageProvider>
  );
}
