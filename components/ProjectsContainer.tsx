"use client";

import { createClient } from "@/lib/supabase/client";
import { ReactNode, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_DESCRIPTION } from "@/constants/message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateButton from "./CreateContainer/CreateButton";
import Link from "next/link";
import TemplatesContainer, { TemplateType } from "./TemplatesContainer";

const MAX_DRAFT_COUNT = 5;

export const ITEM_COMMON_CLASSES =
  "border w-full h-40 text-lg rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity whitespace-pre-line p-4";

export default function ProjectsContainer({ userId }: { userId: string }) {
  const supabase = createClient();
  const [templatesData, setTemplatesData] = useState<TemplateType[]>([]);
  const [draftsData, setDraftsData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const { toast } = useToast();
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);

  const getTemplates = async () => {
    if (!userId) return;

    setIsLoadingTemplates(true);
    const { data, error } = await supabase
      .from("templates")
      .select(
        "id, background_color, font_family, theme_color, name, created_at, updated_at"
      )
      .eq("status", "active")
      .order("updated_at", { ascending: false });
    if (data) {
      setTemplatesData(data);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch templates",
        description: ERROR_DEFAULT_DESCRIPTION,
      });
    }
    setIsLoadingTemplates(false);
  };

  const getDrafts = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("contents")
      .select("id, background_color, theme_color, name, created_at, updated_at")
      .eq("user_id", userId)
      .eq("status", "in_progress")
      .order("updated_at", { ascending: false });
    if (data) {
      setDraftsData(data);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch drafts",
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
      .eq("status", "active")
      .order("updated_at", { ascending: false });

    console.log("data", data);

    if (data) {
      setActiveData(data);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch active contents",
        description: ERROR_DEFAULT_DESCRIPTION,
      });
    }
  };

  useEffect(() => {
    getDrafts();
    getActives();
    getTemplates();
  }, []);
  return (
    <div className="space-y-4">
      <TemplatesContainer
        data={templatesData}
        isFetching={isLoadingTemplates}
      />
      <Item title="Drafts" data={draftsData}>
        {draftsData.length > MAX_DRAFT_COUNT ? null : <CreateButton />}
      </Item>
      {activeData.length > 0 && <Item title="Active" data={activeData} />}
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
  // if ((data || []).length === 0) return;
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
                background: ele?.background_color,
                color: ele?.theme_color,
                borderColor: ele?.theme_color,
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
