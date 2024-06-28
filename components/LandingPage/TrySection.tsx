"use client";

import { useAtom } from "jotai";
import CreateContainer from "../CreateContainer";
import MenuContent from "../CreateContainer/MenuContent";
import PageSwitcher from "../PageSwitcher";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { ImageProvider } from "../image-provider";
import { Tables } from "@/database.types";
import ImageWrapper from "../Production/ImageWrapper";

export default function TrySection() {
  const [preview, setPreview] = useAtom(previewAtom);

  const handlePage = (direction: "prev" | "next") => {
    setPreview({
      ...preview,
      stage: direction === "prev" ? PageStepType.MAIN : PageStepType.AFTER_YES,
    });
  };

  const contentId = "";
  const data: Tables<"contents"> = {
    after_yes_button_link: "https://instagram.com/bettersayyes",
    after_yes_button_text: "@bettersayyes",
    after_yes_description:
      "Use your creativity and\nsurprise your loved ones!\n(Click me to edit texts)",
    after_yes_title: "Yay! You said yes!",
    alert_after_yes: "",
    background_color: "rgb(10,10,10)",
    created_at: "",
    font_family: "",
    id: "",
    images: ["logo_white.png"],
    name: "",
    question: "Try it out by customizing colors, fonts, or text here",
    secret_code: "",
    status: "active",
    theme_color: "rgb(255,255,255)",
    updated_at: "",
    user_id: "",
  };

  return (
    <ImageProvider contentId={contentId}>
      <ImageWrapper images={[{ src: { value: "logo/logo_white.png" } }]}>
        <div className="flex min-h-screen relative w-full h-full mt-10">
          <div className="h-full w-80 sticky top-0">
            <MenuContent contentId={contentId} className="w-full" isAllOpen />
          </div>
          <div className="top-0 w-[calc(100%-20rem)] h-full sticky">
            <CreateContainer contentId={contentId} contentsData={data} />
            <PageSwitcher
              className="absolute right-4 bottom-4"
              onClick={handlePage}
            />
          </div>
        </div>
      </ImageWrapper>
    </ImageProvider>
  );
}
