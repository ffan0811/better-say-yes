"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2Icon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { useAtom } from "jotai";
import { globalLoaderAtom } from "@/atoms/global";
import ContentItem from "./ContentItem";
import ContentSideButton from "./ContentItem/ContentSideButton";

export type InactiveType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function InactiveContainer({
  data,
  onRefresh,
}: {
  data: InactiveType[];
  onRefresh: () => void;
}) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);

  const handleDeleteContent = async (
    e: React.MouseEvent<HTMLButtonElement>,
    contentId: string,
    contentName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      `You can't undo this action or receive a refund by deleting it. Are you sure you want to delete ${contentName}?`
    );

    if (!confirm) return;

    const { data, error } = await supabase
      .from("contents")
      .delete()
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inactive</CardTitle>
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
                  handleDeleteContent(e, ele.id, ele.name || `Draft ${idx}`)
                }
              >
                <Trash2Icon />
              </ContentSideButton>
            </ContentItem>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
