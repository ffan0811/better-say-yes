"use client";

import { useAtom } from "jotai";
import CreateContainer from "../CreateContainer";
import MenuContent from "../CreateContainer/MenuContent";
import PageSwitcher from "../PageSwitcher";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { ImageProvider } from "../image-provider";

export default function TrySection() {
  const [preview, setPreview] = useAtom(previewAtom);

  const handlePage = (direction: "prev" | "next") => {
    setPreview({
      ...preview,
      stage: direction === "prev" ? PageStepType.MAIN : PageStepType.AFTER_YES,
    });
  };

  const contentId = "";

  return (
    <ImageProvider contentId={contentId}>
      <div className="flex min-h-screen relative w-full h-full">
        <div className="h-full w-80 sticky top-0">
          <MenuContent contentId={contentId} className="w-full" isAllOpen />
        </div>
        <div className="top-0 w-[calc(100%-20rem)] h-full sticky">
          <CreateContainer contentId={contentId} contentsData={null} />
          <PageSwitcher
            className="absolute right-4 bottom-4"
            onClick={handlePage}
          />
        </div>
      </div>
    </ImageProvider>
  );
}
