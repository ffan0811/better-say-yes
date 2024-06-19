"use client";

import Link from "next/link";
import { ITEM_COMMON_CLASSES, ITEM_HEIGHT } from "./ProjectsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CopyIcon, UnlinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { copyToClipboard } from "@/lib/utils";

export type ActiveType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
  created_at: string;
  updated_at: string;
};

const BUTTON_COMMON_CLASSES = "opacity-70 hover:opacity-100";
const ICON_COMMON_CLASSES = "w-6 h-6";

export default function ActiveContainer({
  data,
  onRefresh,
}: {
  data: ActiveType[];
  onRefresh: () => void;
}) {
  const supabase = createClient();
  const { toast } = useToast();

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
        <div className="grid md:grid-cols-4 gap-4">
          {data.map((ele, idx) => (
            <Link
              key={ele.id}
              legacyBehavior
              passHref
              href={`/create?id=${ele.id}`}
            >
              <a
                // data-disable-nprogress={true}
                className={`relative flex flex-col group ${ITEM_COMMON_CLASSES} ${ITEM_HEIGHT}`}
                style={{
                  background: ele.background_color,
                  color: ele.theme_color,
                  borderColor: ele.theme_color,
                }}
              >
                <span className="block"> {ele.name || `Draft ${idx}`}</span>
                <div className="hidden group-hover:block absolute right-3 top-3 space-x-2">
                  <button
                    data-prevent-nprogress={true}
                    type="button"
                    onClick={(e) =>
                      handleTakeDownContent(
                        e,
                        ele.id,
                        ele.name || `Draft ${idx}`
                      )
                    }
                    className={BUTTON_COMMON_CLASSES}
                  >
                    <UnlinkIcon className={ICON_COMMON_CLASSES} />
                  </button>
                  <button
                    data-prevent-nprogress={true}
                    type="button"
                    onClick={(e) =>
                      handleCopy(e, ele.id, ele.name || `Draft ${idx}`)
                    }
                    className={BUTTON_COMMON_CLASSES}
                  >
                    <CopyIcon className={ICON_COMMON_CLASSES} />
                  </button>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
