"use client";
import { useAtom } from "jotai";
import { InputWithLabel, LABEL_WRAPPER_CLASSES } from "../ui/input";
import { contentsAtom } from "@/atoms/content";
import { isLockedContentAtom, previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CreateContents() {
  const [contents, setContents] = useAtom(contentsAtom);
  const [preview, setPreview] = useAtom(previewAtom);
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);

  return (
    <div className="space-y-8">
      <div>
        <div className={`flex flex-row space-x-2 mb-2`}>
          <Checkbox
            id="confetti"
            checked={contents.isConfetti}
            onCheckedChange={(checked: boolean) => {
              setContents((prev) => {
                return { ...prev, isConfetti: checked };
              });
            }}
          />
          <Label htmlFor="confetti">Confetti</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Show confetti when your loved one say yes.
        </p>
      </div>
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
