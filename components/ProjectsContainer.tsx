"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { ERROR_DEFAULT_DESCRIPTION } from "@/constants/message";
import TemplatesContainer, { TemplateType } from "./TemplatesContainer";
import InProgressContainer from "./DraftContainer";
import ActiveContainer from "./ActiveContainer";
import InactiveContainer from "./InactiveContainer";

export const ITEM_COMMON_CLASSES =
  "border w-full h-40 text-lg rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity whitespace-pre-line p-4";

export default function ProjectsContainer({ userId }: { userId: string }) {
  const supabase = createClient();
  const [templatesData, setTemplatesData] = useState<TemplateType[]>([]);
  const [draftsData, setDraftsData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
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
      .eq("status", "draft")
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

  const getInactives = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("contents")
      .select("id, background_color, theme_color, name, created_at, updated_at")
      .eq("user_id", userId)
      .eq("status", "inactive")
      .order("updated_at", { ascending: false });

    if (data) {
      setInactiveData(data);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch inactive contents",
        description: ERROR_DEFAULT_DESCRIPTION,
      });
    }
  };

  useEffect(() => {
    getDrafts();
    getActives();
    getTemplates();
    getInactives();
  }, []);
  return (
    <div className="space-y-4">
      <TemplatesContainer
        data={templatesData}
        isFetching={isLoadingTemplates}
      />
      <InProgressContainer data={draftsData} onRefresh={getDrafts} />
      {activeData.length > 0 && (
        <ActiveContainer
          data={activeData}
          onRefresh={() => {
            getDrafts();
            getActives();
          }}
        />
      )}
      {inactiveData.length > 0 && (
        <InactiveContainer data={inactiveData} onRefresh={getInactives} />
      )}
    </div>
  );
}
