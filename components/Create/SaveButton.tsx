"use client";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { contentsAtom } from "@/atoms/content";
import { saveContents } from "@/actions/content";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { handleError } from "@/lib/utils";
import { ContentsType } from "@/types/content";

export default function SaveButton({ contentId }: { contentId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);
  const { toast } = useToast();

  const sendImagesToDB = async ({
    contentId,
    data,
  }: {
    contentId: string;
    data: File[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("contentId", contentId || "");
      data.forEach((ele) => {
        formData.append("images", ele);
      });
      const response = await fetch(`/api/contents`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      const error = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to upload images",
        description: error.message,
      });
    }
  };

  const sendContentsToDB = async ({
    contentId,
    data,
  }: {
    contentId: string;
    data: ContentsType;
  }) => {
    delete data["images"];
    const { error } = await saveContents({ id: contentId, contents: data });
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to save data",
        description: error.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await sendImagesToDB({ contentId, data: contents.images });
      await sendContentsToDB({ contentId, data: contents });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-16"
      spinnerColor="stroke-neutral-100"
      isLoading={isLoading}
      onClick={handleSave}
      variant="outline"
    >
      Save
    </Button>
  );
}
