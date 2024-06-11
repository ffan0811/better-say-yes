"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { previewAtom } from "@/atoms/preview";
import { useAtom } from "jotai";
import { PageStepType } from "@/types/status";

export default function PageSwitcher() {
  const [preview, setPreview] = useAtom(previewAtom);

  return (
    <div className="fixed right-4 bottom-4 space-x-2">
      <Button
        size="icon"
        onClick={() => setPreview({ ...preview, stage: PageStepType.MAIN })}
      >
        <ChevronLeft />
      </Button>
      <Button
        size="icon"
        onClick={() =>
          setPreview({ ...preview, stage: PageStepType.AFTER_YES })
        }
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
