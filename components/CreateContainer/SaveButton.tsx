"use client";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { contentsAtom } from "@/atoms/content";
import { saveContents } from "@/actions/content";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { SaveIcon } from "lucide-react";
import { Input } from "../ui/input";
import { MAX_PROJECT_NAME_LENGTH } from "@/constants/content";

export default function SaveButton({ contentId }: { contentId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: get colors and font
      const { error } = await saveContents({ id: contentId, contents });
      if (error) {
        throw new Error(error.message);
      }
    } catch (e) {
      const err = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to save data",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input
        placeholder="Name your project"
        className="w-auto"
        maxLength={MAX_PROJECT_NAME_LENGTH}
        disabled={isLoading}
        value={contents.name}
        onChange={(e) => {
          setContents({
            ...contents,
            name: e.target.value,
          });
        }}
      />
      <Button
        size="icon"
        className="w-10"
        spinnerColor="stroke-neutral-100"
        isLoading={isLoading}
        onClick={handleSubmit}
        variant="outline"
      >
        <SaveIcon className="max-w-5 max-h-5" />
      </Button>
    </>
  );
}
