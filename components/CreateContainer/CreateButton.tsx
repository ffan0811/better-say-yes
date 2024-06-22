"use client";
import { Button } from "@/components/ui/button";
import { createContent } from "@/actions/content";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  ITEM_COMMON_CLASSES,
  ITEM_SIZE,
  ITEM_HOVER_CLASSES,
} from "@/components/ContentItem";
import { useAtom } from "jotai";
import { globalLoaderAtom } from "@/atoms/global";

export default function CreateButton() {
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsGlobalLoading({
      isActive: true,
      message: "Generating your page...",
    });
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
      className={`${ITEM_COMMON_CLASSES} ${ITEM_HOVER_CLASSES} ${ITEM_SIZE} h-full`}
      isLoading={isGlobalLoading.isActive}
      onClick={handleSubmit}
    >
      + Create
    </Button>
  );
}
