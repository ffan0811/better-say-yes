"use client";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import PreviewMain from "./Main";
import { previewAtom } from "@/atoms/preview";

export default function Preview() {
  const [preview, setPreview] = useAtom(previewAtom);
  return (
    <div className="container relative mx-auto">
      <Button
        onClick={() => setPreview({ ...preview, isOpen: false })}
        className="absolute right-4 top-4"
      >
        Close
      </Button>
      <PreviewMain />
    </div>
  );
}
