import { handleError } from "@/lib/utils";
import { ErrorType } from "@/types/global";

export const sendImagesToDB = async ({
  contentId,
  data,
}: {
  contentId: string;
  data: File[];
}) => {
  let result,
    error: ErrorType = null;
  try {
    const formData = new FormData();
    formData.append("contentId", contentId || "");
    (data || []).forEach((ele) => {
      formData.append("images", ele);
    });
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
