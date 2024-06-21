"use server";
import {
  MAX_AFTER_YES_BUTTON_LENGTH,
  MAX_AFTER_YES_DESCRIPTION_LENGTH,
  MAX_AFTER_YES_TITLE_LENGTH,
  MAX_PROJECT_NAME_LENGTH,
  MAX_QUESTION_LENGTH,
} from "@/constants/content";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";
import { generateCustomizedImages } from "@/lib/utils/image";
import { ContentsType } from "@/types/content";
import { FontType } from "@/types/font";
import { ErrorType } from "@/types/global";
import { ImageProps } from "@/types/image";

export async function createContent(params?: {
  fontFamily?: FontType;
  themeColor?: string;
  backgroundColor?: string;
}) {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("contents")
      .insert({
        font_family: params?.fontFamily || null,
        theme_color: params?.themeColor || null,
        background_color: params?.backgroundColor || null,
      })
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
      .from(contents?.tableName || "contents")
      .update({
        name: (contents?.name || "").substring(0, MAX_PROJECT_NAME_LENGTH),
        question: (contents?.question || "").substring(0, MAX_QUESTION_LENGTH),
        alert_after_yes: (contents?.alertAfterYes || "").substring(0, 1),
        after_yes_title: (contents?.afterYesTitle || "").substring(
          0,
          MAX_AFTER_YES_TITLE_LENGTH
        ),
        after_yes_description: (contents?.afterYesDescription || "").substring(
          0,
          MAX_AFTER_YES_DESCRIPTION_LENGTH
        ),
        after_yes_button_text: (contents?.afterYesButtonText || "").substring(
          0,
          MAX_AFTER_YES_BUTTON_LENGTH
        ),
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
  tableName,
}: {
  contentId: string;
  imageName: string;
  tableName: 'contents' | 'templates'
}) {
  let result,
    error: ErrorType = null;
  try {
    const supabase = createClient();
    const { error } = await supabase.storage
      .from(tableName)
      .remove([`${contentId}/${imageName}`, `${contentId}/thumbnail-${imageName}`]);

    const { data: previousImages } = await supabase.from(tableName).select("images").eq("id", contentId).single();

    const newImages = previousImages.images.filter((ele) => ele !== imageName);
    const { error: dbError } = await supabase.from(tableName).update({ images: newImages }).eq('id', contentId);

    if (error) {
      throw new Error(error.message);
    }
    if (dbError) {
      throw new Error(dbError.message);

    }
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
}

export async function getBlurUrls({contentId, tableName, images}: {contentId: string, tableName: string, images: string[]}) {
  let result: ImageProps[],
    error: ErrorType = null;
  try {
    const data = await generateCustomizedImages({
      contentId,
      tableName,
      images,
    });
    result = data;
    
  } catch (e) {
    const err = handleError(e);
    error = err;
  }

  return { result, error };
}

// export async function getImageUrls({
//   contentId,
//   isTemplate,
//   limit = 20,
//   offset = 0,
// }: {
//   contentId: string;
//   isTemplate?: boolean;
//   limit?: number;
//   offset?: number;
// }) {
//   let result: ImageProps[],
//     error: ErrorType = null;
//   try {
//     const tableName = isTemplate ? "templates" : "contents";
//     const supabase = createClient();
//     const { data, error } = await supabase.storage
//       .from(tableName)
//       .list(contentId, {
//         limit,
//         offset,
//         sortBy: { column: "created_at", order: "asc" },
//       });

//     if (error) throw new Error(error.message);

//     let reducedResults: ImageProps[] = [];

//     const blurImagePromises = data.map((image: { name: string }) => {
//       return getBase64ImageUrl({
//         imageName: image.name,
//         storageUrl: `/${tableName}/${contentId}`,
//       });
//     });
//     const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

//     for (let i = 0; i < data.length; i++) {
//       reducedResults.push({
//         src: data[i].name,
//         blurDataUrl: imagesWithBlurDataUrls[i],
//       });
//     }

//     result = reducedResults;
//   } catch (e) {
//     const err = handleError(e);
//     error = err;
//   }

//   return { result, error };
// }

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
