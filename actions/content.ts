"use server";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";
import getBase64ImageUrl from "@/lib/utils/generateBlurPlaceholder";
import { ContentsType } from "@/types/content";
import { ErrorType } from "@/types/global";
import { ImageProps } from "@/types/image";

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
  let result: ImageProps[],
    error: ErrorType = null;
  try {
    const tableName = isTemplate ? "templates" : "contents";
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from(tableName)
      .list(contentId, {
        limit: 5,
        offset: 0,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (error) throw new Error(error.message);

    let reducedResults: ImageProps[] = [];

    const blurImagePromises = data.map((image: { name: string }) => {
      return getBase64ImageUrl({
        imageName: image.name,
        storageUrl: `/${tableName}/${contentId}`,
      });
    });
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < data.length; i++) {
      reducedResults.push({
        src: data[i].name,
        blurDataUrl: imagesWithBlurDataUrls[i],
      });
    }

    result = reducedResults;
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
