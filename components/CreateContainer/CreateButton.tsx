"use client";
import { Button } from "../ui/button";
import { createContent } from "@/actions/content";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ITEM_COMMON_CLASSES } from "../ArtsContainer";

export default function CreateButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { result, error } = await createContent();
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to create a draft",
        description: error.message,
      });
    }
    if (result) {
      router.push(`/create?id=${result.id}`);
    }
  };

  return (
    <Button
      variant="outline"
      spinnerColor="stroke-neutral-50"
      className={ITEM_COMMON_CLASSES}
      isLoading={isLoading}
      onClick={handleSubmit}
    >
      + Create
    </Button>
  );
}
