import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { createImageFileNames } from "@/lib/utils/image";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const contentId = formData.get("contentId");
    const images = formData.getAll("images") as File[];

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

    const fileNames = createImageFileNames(images) as string[];

    await Promise.all(
      images.map(async (ele: File, index) => {
        const { error } = await supabase.storage
          .from(`contents`)
          .upload(`${contentId}/${fileNames[index]}`, ele, {
            upsert: true,
          });
        if (error) {
          throw new Error(error.message);
        }
      })
    );

    return NextResponse.json(true);
  } catch (e) {
    const err = handleError(e);
    return NextResponse.json(err, { status: 500 });
  }
}
