import SecretCodeContents from "@/components/CreateContainer/SecretCodeContents";
import { DefaultLink } from "@/components/Production/Button";
import ColorWrapper from "@/components/Production/ColorWrapper";
import FontWrapper from "@/components/Production/FontWrapper";
import MainContents, {
  ANSWER_BUTTON_COMMON_CLASSES,
  QUESTION_COMMON_CLASSES,
} from "@/components/Production/MainContents";
import { createClient } from "@/lib/supabase/server";
import { FontType } from "@/types/font";

export default async function TemplateDetailsPage({
  params,
}: {
  params: { contentId: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select(
      "status,font_family,background_color,theme_color,question,secret_code,secret_code_question"
    )
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
        <div className="px-4 h-screen flex flex-col items-center justify-center">
          <MainContents
            title={<p className={QUESTION_COMMON_CLASSES}>{data.question}</p>}
            themeColor={data.theme_color}
            secretCode={
              data.secret_code && (
                <SecretCodeContents
                  secretCode={data.secret_code}
                  secretCodeQuestion={data.secret_code_question}
                  themeColor={data.theme_color}
                />
              )
            }
          >
            <DefaultLink
              href={`/my/templates/${params.contentId}/yes`}
              themeColor={data.theme_color}
              className={ANSWER_BUTTON_COMMON_CLASSES}
            >
              Yes
            </DefaultLink>
          </MainContents>
        </div>
      </ColorWrapper>
    </FontWrapper>
  );
}
