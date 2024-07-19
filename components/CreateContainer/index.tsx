"use client";
import { useAtom } from "jotai";
import CreateMain from "./CreateMain";
import { contentsAtom } from "@/atoms/content";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import CreateAfterYes from "./CreateAfterYes";
import { useEffect } from "react";
import { useColor } from "../color-provider";
import { useFont } from "../font-provider";
import FontWrapper from "../Production/FontWrapper";
import ColorWrapper from "../Production/ColorWrapper";
import { FontType } from "@/types/font";
import { Tables } from "@/database.types";

type CreateContainerProps = {
  contentId: string;
  contentsData: Tables<"contents"> | Tables<"templates">;
};

export default function CreateContainer({
  contentId,
  contentsData,
}: CreateContainerProps) {
  const [contents, setContents] = useAtom(contentsAtom);
  const [preview, setPreview] = useAtom(previewAtom);
  const { backgroundColor, themeColor, setThemeColor, setBackgroundColor } =
    useColor();
  const { font, setFont } = useFont();
  useEffect(() => {
    const myBackgroundColor =
      contentsData?.background_color || "rgb(255, 255, 255)";
    const myThemeColor = contentsData?.theme_color || "rgb(0,0,0)";
    const myFontFamily =
      (contentsData?.font_family as FontType) || ("system" as FontType);
    // Get data from db otherwise insert default contents
    setContents((prev) => {
      return {
        ...prev,
        name: contentsData?.name || "",
        question: contentsData?.question || "Click me to edit",
        alertAfterYes: contentsData?.alert_after_yes,
        afterYesTitle:
          contentsData?.after_yes_title || "Title: Click me to edit",
        afterYesDescription:
          contentsData?.after_yes_description ||
          "Description: Click me to edit",
        afterYesButtonText:
          contentsData?.after_yes_button_text ||
          "Click me to edit, Hover me to add a link",
        afterYesButtonLink: contentsData?.after_yes_button_link || "",
        secretCode: contentsData?.secret_code || "",
        secretCodeQuestion:
          contentsData?.secret_code_question ||
          "Enter secret code: Click me to edit",
        fontFamily: myFontFamily,
        themeColor: myThemeColor,
        backgroundColor: myBackgroundColor,
        isConfetti: !!contentsData?.is_confetti,
      };
    });

    setThemeColor(myThemeColor);
    setBackgroundColor(myBackgroundColor);
    setFont(myFontFamily);
  }, [contentsData]);

  useEffect(() => {
    return () => {
      setPreview({ stage: PageStepType.MAIN });
    };
  }, []);

  return (
    <FontWrapper fontFamily={font as FontType}>
      <ColorWrapper backgroundColor={backgroundColor} themeColor={themeColor}>
        {preview.stage === PageStepType.MAIN && <CreateMain />}
        {preview.stage === PageStepType.AFTER_YES && (
          <CreateAfterYes contentId={contentId} />
        )}
      </ColorWrapper>
    </FontWrapper>
  );
}
