import { DefaultLink } from "@/components/Production/Button";
import ColorWrapper from "@/components/Production/ColorWrapper";
import FontWrapper from "@/components/Production/FontWrapper";
import ImageWrapper from "@/components/Production/ImageWrapper";
import MainContents, {
  QUESTION_COMMON_CLASSES,
} from "@/components/Production/MainContents";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { createClient } from "@/lib/supabase/server";
import { generateCustomizedImages } from "@/lib/utils/image";
import { FontType } from "@/types/font";
import { Suspense } from "react";

export default async function ContentDetailsPage({
  params,
}: {
  params: { contentId: string };
}) {
  const supabase = createClient();

  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { data, error } = await supabase
    .from("contents")
    .select("status,font_family,background_color,theme_color,question, images")
    .eq("id", params.contentId)
    .single();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Cannot find data</p>;
  }

  if (data.status !== "active") {
    return <p>Permission denied</p>;
  }

  const results = await generateCustomizedImages({
    contentId: params.contentId,
    tableName: "contents",
    images: data.images,
  });

  return (
    <ImageWrapper images={results}>
      <FontWrapper fontFamily={data.font_family as FontType}>
        <ColorWrapper
          backgroundColor={data.background_color}
          themeColor={data.theme_color}
        >
          <div className="h-screen flex flex-col items-center justify-center">
            <MainContents
              title={<p className={QUESTION_COMMON_CLASSES}>{data.question}</p>}
              themeColor={data.theme_color}
            >
              <DefaultLink
                href={`/my/${params.contentId}/yes`}
                themeColor={data.theme_color}
                className="min-w-40"
              >
                Yes
              </DefaultLink>
            </MainContents>
          </div>
        </ColorWrapper>
      </FontWrapper>
    </ImageWrapper>
  );
}
