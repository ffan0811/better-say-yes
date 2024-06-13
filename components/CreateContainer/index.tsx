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

type CreateContainerProps = {
  contentId: string;
  contentsData: any;
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
    const myFontFamily: FontType = contentsData?.font_family || "system";
    // Get data from db otherwise insert default contents
    setContents((prev) => {
      return {
        ...prev,
        question: contentsData?.question || "Click me to edit",
        alertAfterYes: contentsData?.alert_after_yes,
        afterYesTitle:
          contentsData?.after_yes_title || "Title: Click me to edit",
        afterYesDescription:
          contentsData?.after_yes_description ||
          "Description: Click me to edit",
        afterYesButtonText:
          contentsData?.after_yes_button_text ||
          "Click me to edit\nHover me to add a link",
        afterYesButtonLink: contentsData?.after_yes_button_link || "",
        secretCode: contentsData?.secret_code || "",
        fontFamily: myFontFamily,
        themeColor: myThemeColor,
        backgroundColor: myBackgroundColor,
      };
    });

    setThemeColor(myThemeColor);
    setBackgroundColor(myBackgroundColor);
    setFont(myFontFamily);
  }, [contentsData]);

  return (
    <FontWrapper fontFamily={font as FontType}>
      <ColorWrapper backgroundColor={backgroundColor} themeColor={themeColor}>
        <div className="">
          {preview.stage === PageStepType.MAIN && <CreateMain />}
          {preview.stage === PageStepType.AFTER_YES && (
            <CreateAfterYes contentId={contentId} />
          )}
        </div>
      </ColorWrapper>
    </FontWrapper>
  );
}
