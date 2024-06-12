"use client";

import { contentsAtom } from "@/atoms/content";
import { createClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useFetchImages({ contentId }: { contentId: string }) {
  const supabase = createClient();
  const [contents, setContents] = useAtom(contentsAtom);

  console.log("here", contents);

  const getImages = async (id: string) => {
    const { data, error } = await supabase.storage.from("contents").list(id, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
    if (data) {
      const imageNames = data.map((ele) => ele.name);
      setContents((prev) => {
        return {
          ...prev,
          images: imageNames,
        };
      });
    }
  };

  useEffect(() => {
    if (!contentId) return;
    getImages(contentId);
  }, [contentId]);

  return null;
}
