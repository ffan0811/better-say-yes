"use client";

import { createClient } from "@/lib/supabase/client";
import { ReactNode, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import {
  ERROR_DEFAULT_DESCRIPTION,
  ERROR_DEFAULT_TITLE,
} from "@/constants/message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateButton from "./Create/CreateButton";
import Link from "next/link";

const MAX_DRAFT_COUNT = 3;

export const ITEM_COMMON_CLASSES =
  "border w-full h-40 text-lg rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity";

export default function ArtsContainer({ userId }: { userId: string }) {
  const supabase = createClient();
  const [draftsData, setDraftsData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const { toast } = useToast();

  const getDrafts = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("contents")
      .select("id, background_color, theme_color, name, created_at, updated_at")
      .eq("user_id", userId)
      .eq("status", "draft");
    if (data) {
      setDraftsData(data);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: ERROR_DEFAULT_DESCRIPTION,
      });
    }
  };

  const getActives = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("contents")
      .select("id, background_color, theme_color, name, created_at, updated_at")
      .eq("user_id", userId)
      .eq("status", "active");

    if (data) {
      setActiveData(draftsData);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: ERROR_DEFAULT_DESCRIPTION,
      });
    }
  };

  useEffect(() => {
    getDrafts();
    getActives();
  }, []);
  return (
    <div className="space-y-4">
      <Item title="Drafts" data={draftsData}>
        {draftsData.length > MAX_DRAFT_COUNT ? null : <CreateButton />}
      </Item>
      <Item title="Active" data={activeData} />
    </div>
  );
}

function Item({
  title,
  data,
  children,
}: {
  title: string;
  data: any[];
  children?: ReactNode;
}) {
  if ((data || []).length === 0) return;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {children}
          {data.map((ele, idx) => (
            <Link
              key={ele.id}
              href={`/create?id=${ele.id}`}
              className={ITEM_COMMON_CLASSES}
              style={{
                background: ele.background_color,
                color: ele.theme_color,
                borderColor: ele.theme_color,
              }}
            >
              {ele.name || `Draft ${idx}`}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
