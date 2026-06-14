"use client";

import { useAtom } from "jotai";
import CreateContainer from "../CreateContainer";
import MenuContent from "../CreateContainer/MenuContent";
import PageSwitcher from "../PageSwitcher";
import { isLockedContentAtom, previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { ImageProvider } from "../image-provider";
import MobileMenu from "../CreateContainer/MobileMenu";
import { useEffect, useState } from "react";
import ImageWrapper from "../Production/ImageWrapper";
import { Tables } from "@/database.types";
import ProductionProviders from "../ProductionProviders";

export default function TrySection() {
  const [preview, setPreview] = useAtom(previewAtom);
  const [data, setData] = useState({
    after_yes_button_link: "https://instagram.com/bettersayyes",
    after_yes_button_text: "@bettersayyes",
    after_yes_description:
      "Use your creativity and\nsurprise your loved ones!\n(Click me to edit texts)",
    after_yes_title: "Yay! You said yes!",
    // alert_after_yes: "",
    background_color: "rgb(23,23,23)",
    // created_at: "",
    // font_family: "",
    // id: "",
    // images: ["logo_in_black_circle.png"],
    // name: "",
    question:
      "Long enough explanation!\n\nTry it out yourself by\ncustomizing colors, fonts, or text here.\n(Please note: BetterSayYes works best on PC!)\n",
    // secret_code: "",
    secret_code_question: "Enter secret code",
    status: "active",
    theme_color: "rgb(255,255,255)",
    // updated_at: "",
    // user_id: "",
    is_confetti: true,
  });
  const [images, setImages] = useState([
    { src: { value: "events/hamster.jpeg" } },
  ]);
  const [isLocked, setIsLocked] = useAtom(isLockedContentAtom);

  useEffect(() => {
    setIsLocked(false);
    return () => {
      setIsLocked(true);
    };
  }, []);

  const handlePage = (direction: "prev" | "next") => {
    setPreview({
      ...preview,
      stage: direction === "prev" ? PageStepType.MAIN : PageStepType.AFTER_YES,
    });
  };

  const contentId = "";

  return (
    <ProductionProviders>
      <ImageProvider contentId={contentId}>
        <ImageWrapper images={images}>
          <div className="flex min-h-screen relative w-full h-full mt-10">
            <div className="h-full w-80 sticky top-0 hidden md:block">
              <MenuContent contentId={contentId} className="w-full" isAllOpen />
            </div>
            <div className="top-0 w-full md:w-[calc(100%-20rem)] h-full sticky">
              <CreateContainer
                contentId={contentId}
                contentsData={data as Tables<"contents">}
              />
              <MobileMenu
                className="absolute left-4 bottom-4"
                contentId={contentId}
              />
              <PageSwitcher
                className="absolute right-4 bottom-4"
                onClick={handlePage}
              />
            </div>
          </div>
        </ImageWrapper>
      </ImageProvider>
    </ProductionProviders>
  );
}
