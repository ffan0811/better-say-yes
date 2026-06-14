"use client";

import { ReactNode } from "react";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

import { previewAtom } from "@/atoms/preview";
import { ImageProvider } from "@/components/image-provider";
import ProductionProviders from "@/components/ProductionProviders";
import { PageStepType } from "@/types/status";

export default function CreateLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const [preview] = useAtom(previewAtom);
  const searchFunc = useSearchParams();
  const paramsId = searchFunc.get("id");

  return (
    <ProductionProviders>
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
    </ProductionProviders>
  );
}
