"use client";
import { Button, buttonVariants } from "../ui/button";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";
import { useImages } from "../image-provider";

export default function PreviewButton({ contentId }: { contentId: string }) {
  const [contents, setContents] = useAtom(contentsAtom);
  const { viewableImages } = useImages();

  const handlePreview = () => {
    const previewWindow = window.open("/preview", "_blank");

    const states = { ...contents, viewableImages, contentId };

    if (previewWindow) {
      Promise.resolve(
        setTimeout(() => {
          previewWindow?.postMessage(states, window.location.origin);
        }, 1000)
      );
    } else {
      console.error("Failed to open preview window");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePreview}
      className={`${buttonVariants({ variant: "outline" })}`}
    >
      Preview
    </Button>
  );
}
