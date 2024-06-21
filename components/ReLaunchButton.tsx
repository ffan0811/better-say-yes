"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";

export default function ReLaunchButton({ contentId }: { contentId: string }) {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const [contentsData, setContentsData] = useAtom(contentsAtom);

  const handleClick = async () => {
    const confirm = window.confirm(
      "Are you sure you want to re-launch and make it public?"
    );

    if (!confirm) return;

    const { data, error } = await supabase
      .from(contentsData.tableName || "contents")
      .update({ status: "active" })
      .eq("id", contentId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to re-launch",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Your page is now on live.",
    });
    router.push("/dashboard");
  };
  return <Button onClick={handleClick}>Re-Launch</Button>;
}
