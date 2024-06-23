"use client";
import { Button, buttonVariants } from "../ui/button";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";
import { saveContents } from "@/actions/content";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { toast } from "../ui/use-toast";

export default function PreviewButton({ contentId }: { contentId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);

  const handlePreview = async () => {
    try {
      setIsLoading(true);
      const { error } = await saveContents({ id: contentId, contents });
      if (error) {
        throw new Error(error.message);
      }
      window.open(`/my/preview/${contentId}`, "_blank");
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
      variant="outline"
      onClick={handlePreview}
      className={`${buttonVariants({ variant: "outline" })}`}
      isLoading={isLoading}
      theme="light"
    >
      Preview
    </Button>
  );
}
