"use client";

import AfterYesContents, {
  DESCRIPTION_COMMON_CLASSES,
  TITLE_COMMON_CLASSES,
} from "@/components/Production/AfterYesContents";
import { DefaultButton, DefaultLink } from "@/components/Production/Button";
import ColorWrapper from "@/components/Production/ColorWrapper";
import FontWrapper from "@/components/Production/FontWrapper";
import ImageWrapper from "@/components/Production/ImageWrapper";
import MainContents, {
  QUESTION_COMMON_CLASSES,
} from "@/components/Production/MainContents";
import { ImageProvider } from "@/components/image-provider";
import { FontType } from "@/types/font";
import { ImageProps } from "@/types/image";
import { PageStepType } from "@/types/status";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [pageStep, setPageStep] = useState<PageStepType>(PageStepType.MAIN);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === window.location.origin) {
        setContents(event.data);
      } else {
        console.warn("Received message from untrusted origin");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!contents) {
    return <div>Loading...</div>;
  }

  const handleClickYes = () => {
    setPageStep(PageStepType.AFTER_YES);
  };

  return (
    <ImageProvider contentId={contents.contentId}>
      <FontWrapper fontFamily={contents.fontFamily as FontType}>
        <ColorWrapper
          backgroundColor={contents.backgroundColor}
          themeColor={contents.themeColor}
        >
          <ImageWrapper images={contents.viewableImages as ImageProps[]}>
            {pageStep === PageStepType.MAIN && (
              <div className="h-screen flex flex-col items-center justify-center">
                <MainContents
                  title={
                    <p className={QUESTION_COMMON_CLASSES}>
                      {contents.question}
                    </p>
                  }
                  themeColor={contents.themeColor}
                >
                  <DefaultButton
                    themeColor={contents.themeColor}
                    className="min-w-40"
                    onClick={handleClickYes}
                  >
                    Yes
                  </DefaultButton>
                </MainContents>
              </div>
            )}
            {pageStep === PageStepType.AFTER_YES && (
              <AfterYesContents
                className="min-h-screen"
                contentId={contents.contentId}
                title={
                  <h1 className={TITLE_COMMON_CLASSES}>
                    {contents.afterYesTitle}
                  </h1>
                }
                description={
                  <p className={DESCRIPTION_COMMON_CLASSES}>
                    {contents.afterYesDescription}
                  </p>
                }
                button={
                  contents.afterYesButtonText ? (
                    contents.afterYesButtonLink ? (
                      <DefaultLink
                        themeColor={contents.themeColor}
                        href={contents.afterYesButtonLink}
                        target="_blank"
                      >
                        {contents.afterYesButtonText}
                      </DefaultLink>
                    ) : (
                      <DefaultButton themeColor={contents.themeColor}>
                        {contents.afterYesButtonText}
                      </DefaultButton>
                    )
                  ) : null
                }
              />
            )}
          </ImageWrapper>
        </ColorWrapper>
      </FontWrapper>
    </ImageProvider>
  );
}
