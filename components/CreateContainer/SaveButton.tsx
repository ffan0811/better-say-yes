"use client";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { contentsAtom } from "@/atoms/content";
import { saveContents } from "@/actions/content";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { handleError } from "@/lib/utils";

export default function SaveButton({ contentId }: { contentId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
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
    <Button
      className="w-16"
      spinnerColor="stroke-neutral-100"
      isLoading={isLoading}
      onClick={handleSubmit}
      variant="outline"
    >
      Save
    </Button>
  );
}
