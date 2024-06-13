import { DefaultLink } from "@/components/Production/Button";
import ColorWrapper from "@/components/Production/ColorWrapper";
import FontWrapper from "@/components/Production/FontWrapper";
import MainContents from "@/components/Production/MainContents";
import { createClient } from "@/lib/supabase/server";
import { FontType } from "@/types/font";

export default async function ArtTemplateDetailsPage({
  params,
}: {
  params: { contentId: string };
}) {
  const supabase = createClient();

  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { data, error } = await supabase
    .from("templates")
    .select("*")
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

  return (
    <FontWrapper fontFamily={data.font_family as FontType}>
      <ColorWrapper
        backgroundColor={data.background_color}
        themeColor={data.theme_color}
      >
        <div className="h-screen flex flex-col items-center justify-center">
          <MainContents themeColor={data.theme_color} question={data.question}>
            <DefaultLink
              href={`/templates/${params.contentId}/yes`}
              themeColor={data.theme_color}
              className="min-w-40"
            >
              Yes
            </DefaultLink>
          </MainContents>
        </div>
      </ColorWrapper>
    </FontWrapper>
  );
}
