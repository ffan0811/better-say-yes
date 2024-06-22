"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CopyIcon, UnlinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { copyToClipboard } from "@/lib/utils";
import { useAtom } from "jotai";
import { globalLoaderAtom } from "@/atoms/global";
import ContentItem from "./ContentItem";
import ContentSideButton from "./ContentItem/ContentSideButton";

export type ActiveType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function ActiveContainer({
  data,
  onRefresh,
}: {
  data: ActiveType[];
  onRefresh: () => void;
}) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);

  const handleTakeDownContent = async (
    e: React.MouseEvent<HTMLButtonElement>,
    contentId: string,
    contentName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      `Are you sure you want to take your ${contentName} offline? It will no longer be public.`
    );

    if (!confirm) return;

    const { data, error } = await supabase
      .from("contents")
      .update({ status: "inactive" })
      .eq("id", contentId);

    if (error) {
      toast({
        title: ERROR_DEFAULT_TITLE,
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onRefresh();
  };

  const handleCopy = async (
    e: React.MouseEvent<HTMLButtonElement>,
    contentId: string,
    contentName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const { result, error } = await copyToClipboard(
      `${process.env.NEXT_PUBLIC_SITE_URL}/my/${contentId}`
    );
    if (error) {
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: error,
      });
    }
    if (result) {
      toast({
        title: "Successfully copied",
        description: "Now share the link and get a yes!",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Active</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {data.map((ele, idx) => (
            <ContentItem
              key={ele.id}
              contentId={ele.id}
              title={ele?.name || `Draft ${idx}`}
              type="link"
              backgroundColor={ele.background_color}
              themeColor={ele.theme_color}
              onClickLink={() => {
                setIsGlobalLoading({
                  isActive: true,
                  message: "Preparing your page...",
                });
              }}
            >
              <ContentSideButton
                type="button"
                onClick={(e) =>
                  handleTakeDownContent(e, ele.id, ele.name || `Draft ${idx}`)
                }
              >
                <UnlinkIcon />
              </ContentSideButton>
              <ContentSideButton
                type="button"
                onClick={(e) =>
                  handleCopy(e, ele.id, ele.name || `Draft ${idx}`)
                }
              >
                <CopyIcon />
              </ContentSideButton>
            </ContentItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
