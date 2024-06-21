import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createImageFileNames } from "@/lib/utils/image";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const contentId = formData.get("contentId");
    const tableName = formData.get("tableName") as 'contents' | 'templates';
    const images = formData.getAll("images") as File[];
    const thumbnails = formData.getAll("thumbnails") as File[];

    const supabase = createClient();
    if (!contentId) {
      return NextResponse.json({ message: "bad request" }, { status: 400 });
    }

    // const { error: removeError } = await supabase.storage
    //   .from("contents")
    //   .remove([`${contentId}/*`]);
    // if (removeError) {
    //   throw new Error(removeError.message);
    // }

    const { data: previousImages } = await supabase
      .from(tableName || "contents")
      .select("images")
      .eq("id", contentId)
      .single();

    const fileNames = createImageFileNames(images) as string[];

    await Promise.all([
      ...images.map(async (ele: File, index) => {
        try {
          const { error } = await supabase.storage
            .from(tableName || `contents`)
            .upload(`${contentId}/${fileNames[index]}`, ele, {
              upsert: true,
            });
    
          if (error) {
            throw new Error(error.message);
          }
        } catch (err) {
          console.error(`Error uploading image ${index}:`, err);
        }
      }),
      ...thumbnails.map(async (ele: File, index) => {
        try {
          const { error } = await supabase.storage
            .from(tableName || `contents`)
            .upload(`${contentId}/thumbnail-${fileNames[index]}`, ele, {
              upsert: true,
            });
    
          if (error) {
            throw new Error(error.message);
          }
        } catch (err) {
          console.error(`Error uploading thumbnail ${index}:`, err);
        }
      })
    ]);
    

    const { error: dbError } = await supabase
      .from(tableName || "contents")
      .update({ images: [...(previousImages?.images || []), ...fileNames] })
      .eq("id", contentId);

    if (dbError) {
      throw new Error(dbError.message);
    }

    return NextResponse.json(true);
  } catch (e) {
    const err = handleError(e);
    return NextResponse.json(err, { status: 500 });
  }
}
