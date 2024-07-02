import AfterYesContents, {
  DESCRIPTION_COMMON_CLASSES,
  TITLE_COMMON_CLASSES,
} from "@/components/Production/AfterYesContents";
import { DefaultButton, DefaultLink } from "@/components/Production/Button";
import ColorWrapper from "@/components/Production/ColorWrapper";
import FontWrapper from "@/components/Production/FontWrapper";
import { createClient } from "@/lib/supabase/server";
import { FontType } from "@/types/font";

export default async function PreviewDetailsYesPage({
  params,
}: {
  params: { contentId: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", params.contentId)
    .single();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <FontWrapper fontFamily={data.font_family as FontType}>
      <ColorWrapper
        backgroundColor={data.background_color}
        themeColor={data.theme_color}
      >
        <AfterYesContents
          secretCode={data.secret_code}
          baseUrl="/my/preview"
          className="min-h-screen"
          contentId={params.contentId}
          title={
            <h1 className={TITLE_COMMON_CLASSES}>{data.after_yes_title}</h1>
          }
          description={
            <p className={DESCRIPTION_COMMON_CLASSES}>
              {data.after_yes_description}
            </p>
          }
          button={
            data.after_yes_button_text ? (
              data.after_yes_button_link ? (
                <DefaultLink
                  themeColor={data.theme_color}
                  href={data.after_yes_button_link}
                  target="_blank"
                >
                  {data.after_yes_button_text}
                </DefaultLink>
              ) : (
                <DefaultButton themeColor={data.theme_color}>
                  {data.after_yes_button_text}
                </DefaultButton>
              )
            ) : null
          }
        />
      </ColorWrapper>
    </FontWrapper>
  );
}
