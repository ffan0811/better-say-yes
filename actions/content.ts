"use server";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";
import getBase64ImageUrl from "@/lib/utils/generateBlurPlaceholder";
import { ContentsType } from "@/types/content";
import { ErrorType } from "@/types/global";

export async function createContent() {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("contents")
      .insert({})
      .select(`id`)
      .single();
    result = data;
  } catch (error) {
    const err = handleError(error);
    throw err;
  }

  return { result, error };
}

export async function saveContents({
  id,
  contents,
}: {
  id: string;
  contents: ContentsType;
}) {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();

    await supabase
      .from("contents")
      .update({
        question: contents.question,
        alert_after_yes: contents.alertAfterYes,
        after_yes_title: contents.afterYesTitle,
        after_yes_description: contents.afterYesDescription,
        after_yes_button_text: contents.afterYesButtonText,
        after_yes_button_link: contents.afterYesButtonLink,
        secret_code: contents.secretCode,
        font_family: contents.fontFamily,
        background_color: contents.backgroundColor,
        theme_color: contents.themeColor,
      })
      .eq("id", id);
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
}

export async function deleteImage({
  contentId,
  imageName,
}: {
  contentId: string;
  imageName: string;
}) {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();
    const { error } = await supabase.storage
      .from(`contents`)
      .remove([`${contentId}/${imageName}`]);
    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
}

export async function getImageUrls({
  contentId,
  isTemplate,
}: {
  contentId: string;
  isTemplate?: boolean;
}) {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(isTemplate ? "templates" : "contents")
      .list(contentId, {
        limit: 1,
        offset: 0,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (error) {
      console.log("nnnn");
      throw new Error(error.message);
    }
    console.log("ssss?");

    const imagePromises = data.map(async (ele) => {
      const blurDataUrl = await getBase64ImageUrl(
        contentId,
        {
          src: ele.name,
          blurDataUrl: "",
        },
        isTemplate
      );
      return { src: ele.name, blurDataUrl };
    });

    console.log("yessss?");

    const imageNames = await Promise.all(imagePromises);

    console.log("bbbb");

    result = imageNames;
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
}

// NOTE: cannot pass images unless its in FormData
// export async function saveImages({
//   contentId,
//   images,
// }: {
//   contentId: string;
//   images: File[];
// }) {
//   let result,
//     error: ErrorType = null;
//   try {
//     const supabase = createClient();
//     const fileNames = createImageFileNames(images || []) as string[];

//     await Promise.all(
//       images.map(async (ele: File, index) => {
//         const { error } = await supabase.storage
//           .from(`contents`)
//           .upload(`${contentId}/${fileNames[index]}`, ele, {
//             upsert: true,
//           });
//         if (error) {
//           throw new Error(error.message);
//         }
//       })
//     );
//   } catch (e) {
//     const err = handleError(e);
//     error = err;
//   }

//   return { result, error };
// }
