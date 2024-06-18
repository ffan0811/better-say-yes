"use client";

import Link from "next/link";
import { ITEM_COMMON_CLASSES, ITEM_HEIGHT } from "./ProjectsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CreateButton from "./CreateContainer/CreateButton";
import { Trash2Icon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";

const MAX_DRAFT_COUNT = 5;

export type DraftType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function DraftContainer({
  data,
  onRefresh,
}: {
  data: DraftType[];
  onRefresh: () => void;
}) {
  const supabase = createClient();
  const { toast } = useToast();

  const handleDeleteContent = async (
    e: React.MouseEvent<HTMLButtonElement>,
    contentId: string,
    contentName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      `Are you sure you want to delete ${contentName}`
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
        <CardTitle>Drafts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          {data.length > MAX_DRAFT_COUNT ? null : <CreateButton />}
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
                <button
                  data-prevent-nprogress={true}
                  type="button"
                  onClick={(e) =>
                    handleDeleteContent(e, ele.id, ele.name || `Draft ${idx}`)
                  }
                  className="hidden group-hover:block absolute right-3 top-3"
                >
                  <Trash2Icon className="w-6 h-6 " />
                </button>
              </a>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
