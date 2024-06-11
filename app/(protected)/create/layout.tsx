"use client";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { useAtom } from "jotai";
import { ReactNode } from "react";

export default function CreateLayout({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useAtom(previewAtom);

  return (
    <div
      className={` ${
        preview.stage === PageStepType.AFTER_YES
          ? "h-[calc(100vh-5rem)]"
          : "h-screen overflow-y-hidden "
      }`}
    >
      {children}
    </div>
  );
}
