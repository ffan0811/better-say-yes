import { handleError } from "@/lib/utils";
import { ErrorType } from "@/types/global";

export const sendImagesToDB = async ({
  contentId,
  data,
  thumbnails,
  tableName,
}: {
  contentId: string;
  data: File[];
  thumbnails: File[];
  tableName?: "contents" | "templates"
}) => {
  let result,
    error: ErrorType = null;
  try {
    const formData = new FormData();
    formData.append("contentId", contentId || "");
    (data || []).forEach((ele) => {
      formData.append("images", ele);
    });
    (thumbnails || []).forEach((ele) => {
      formData.append("thumbnails", ele);
    });
    formData.append("tableName", tableName)
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
