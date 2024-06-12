"use client";
import { useAtom } from "jotai";
import ProductionMain from "../Production/Main";
import { contentsAtom } from "@/atoms/content";
import ProductionWrapper from "../Production/Wrapper";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import ProductionAfterYes from "../Production/AfterYes";
import { useEffect } from "react";
import { useColor } from "../color-provider";
import { useFont } from "../font-provider";
import { useImages } from "../image-provider";

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
  const { setThemeColor, setBackgroundColor } = useColor();
  const { setFont } = useFont();
  const { viewableImages } = useImages();

  useEffect(() => {
    if (!contentsData) return;

    setContents((prev) => {
      return {
        ...prev,
        question: contentsData.question,
        alertAfterYes: contentsData.alert_after_yes,
        afterYesTitle: contentsData.after_yes_title,
        afterYesDescription: contentsData.after_yes_description,
        afterYesButtonText: contentsData.after_yes_button_text,
        afterYesButtonLink: contentsData.after_yes_button_link,
        secretCode: contentsData.secret_code,
        fontFamily: contentsData.font_family,
        themeColor: contentsData.theme_color,
        backgroundColor: contentsData.background_color,
      };
    });

    setThemeColor(contentsData.theme_color);
    setBackgroundColor(contentsData.background_color);
    setFont(contentsData.font_family);
  }, [contentsData]);

  return (
    <ProductionWrapper className={`min-h-[calc(100vh-5rem)]`}>
      {preview.stage === PageStepType.MAIN && (
        <ProductionMain
          question={contents.question}
          alertAfterYes={contents.alertAfterYes}
          isPreview
        />
      )}
      {preview.stage === PageStepType.AFTER_YES && (
        <ProductionAfterYes
          contentId={contentId}
          afterYesTitle={contents.afterYesTitle}
          afterYesDescription={contents.afterYesDescription}
          afterYesButtonText={contents.afterYesButtonText}
          afterYesButtonLink={contents.afterYesButtonLink}
          images={viewableImages}
          isPreview
        />
      )}
    </ProductionWrapper>
  );
}
