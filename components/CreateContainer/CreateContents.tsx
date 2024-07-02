"use client";
import { useAtom } from "jotai";
import { InputWithLabel } from "../ui/input";
import { contentsAtom } from "@/atoms/content";
import { isLockedContentAtom, previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";

export default function CreateContents() {
  const [contents, setContents] = useAtom(contentsAtom);
  const [preview, setPreview] = useAtom(previewAtom);
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);

  return (
    <div>
      <InputWithLabel
        label="Secret Code"
        placeholder="Enter secret code"
        description="Your page will be accessible only with the secret code."
        value={contents.secretCode}
        onChange={(e) => {
          const value = e.target.value;
          setPreview({ stage: PageStepType.MAIN });
          if (value) {
            setIsLocked(true);
          } else {
            setIsLocked(false);
          }

          setContents((prev) => {
            return { ...prev, secretCode: e.target.value };
          });
        }}
      />
    </div>
  );
}
