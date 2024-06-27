import { Tables } from "@/database.types";
import { handleError } from "@/lib/utils";
import { ErrorType } from "@/types/global";

export const fetchContentData = async ({
  contentId,
  tableName = "contents",
}: {
  contentId: string;
  tableName?: "contents" | "templates";
}): Promise<Tables<"contents" | "templates"> | null> => {
  const url = `https://${process.env.NEXT_PUBLIC_SUPABASE_HOST}/rest/v1/${tableName}?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}&id=in.(${contentId})`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch content data");
    }
    const data = await res.json();
    if (data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching content data:", error);
    return null;
  }
};

export const sendImagesToDB = async ({
  contentId,
  data,
  thumbnails,
  tableName,
  fileNames,
}: {
  contentId: string;
  data: File[];
  thumbnails: File[];
  tableName?: "contents" | "templates";
  fileNames: string[];
}) => {
  let result,
    error: ErrorType = null;
  try {
    const formData = new FormData();
    formData.append("contentId", contentId || "");
    (data || []).forEach((ele) => {
      formData.append("images", ele);
    });
    (fileNames || []).forEach((ele) => {
      formData.append("fileNames", ele);
    });
    (thumbnails || []).forEach((ele) => {
      formData.append("thumbnails", ele);
    });
    formData.append("tableName", tableName);
    const response = await fetch(`/api/contents`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    result = true;
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
};
