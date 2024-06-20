"use client";
import CreateContainer from "@/components/CreateContainer";
import Logo from "@/components/Logo";
import PaymentButton from "@/components/Payment/PaymentButton";
import Link from "next/link";
import { SidebarMenuType } from "@/types/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageSwitcher from "@/components/PageSwitcher";
import CreateImages from "@/components/CreateContainer/Images";
import SaveButton from "@/components/CreateContainer/SaveButton";
import { createClient } from "@/lib/supabase/client";
import { ImageProvider } from "@/components/image-provider";
import SelectFont from "@/components/selectFont";
import BackgroundColorPicker from "@/components/BackgroundColorPicker";
import ColorPicker from "@/components/ColorPicker";
import ImageWrapper from "@/components/Production/ImageWrapper";
import PreviewButton from "@/components/CreateContainer/PreviewButton";
import ReLaunchButton from "@/components/ReLaunchButton";
import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { ImageProps } from "@/types/image";
import { useToast } from "@/components/ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { getBlurUrls } from "@/actions/content";
import LoaderEntirePage from "@/components/loaderEntirePage";

const sidebarMenu = [
  {
    label: "Font",
    value: SidebarMenuType.FONT,
  },
  {
    label: "Background",
    value: SidebarMenuType.BACKGROUND,
  },
  {
    label: "Theme Color",
    value: SidebarMenuType.THEME_COLOR,
  },
  {
    label: "Images (AutoSave)",
    value: SidebarMenuType.IMAGES,
  },
];

const TABLE_NAME = "contents";

export default function CreatePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const [contentsData, setContentsData] = useState<Tables<"contents">>(null);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();
  const { toast } = useToast();

  const init = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("id", searchParams.id)
        .single();

      setContentsData(data);

      if (error) {
        toast({
          variant: "destructive",
          title: ERROR_DEFAULT_TITLE,
          description: error.message,
        });
        return;
      }

      const { result: fullImages } = await getBlurUrls({
        contentId: searchParams.id,
        tableName: "contents",
        images: data.images,
      });
      setImages(fullImages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchParams.id) return;
    init();
  }, [searchParams.id]);

  const comp = {
    [SidebarMenuType.FONT]: (
      <div className="flex justify-center">
        <SelectFont />
      </div>
    ),
    [SidebarMenuType.BACKGROUND]: (
      <div className="flex justify-center">
        <BackgroundColorPicker />
      </div>
    ),
    [SidebarMenuType.THEME_COLOR]: (
      <div className="flex justify-center">
        <ColorPicker />
      </div>
    ),
    [SidebarMenuType.IMAGES]: <CreateImages contentId={searchParams.id} />,
  };
  if (isLoading && !contentsData)
    return <LoaderEntirePage text="Preparing your page..." />;

  if (!contentsData) return <p>Cannot find data</p>;

  return (
    <ImageProvider contentId={searchParams.id}>
      <ImageWrapper images={images}>
        <nav className="fixed z-40 left-0 top-0 flex items-center w-full h-20 bg-neutral-900 py-4 border-b border-neutral-500 overflow-x-auto">
          <div className="flex justify-between items-center w-full px-5">
            <div className="flex items-center space-x-16">
              <Link
                href="/dashboard
            "
              >
                <Logo className="h-auto w-12 md:w-20" />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              {/* <RefreshCcwIcon className="mr-4 opacity-80" /> */}
              <SaveButton contentId={searchParams.id} />
              <PreviewButton contentId={searchParams.id} />
              {contentsData.status === "draft" && (
                <PaymentButton contentId={searchParams.id} />
              )}
              {contentsData.status === "inactive" && (
                <ReLaunchButton contentId={searchParams.id} />
              )}
            </div>
          </div>
        </nav>
        <div className="w-80 h-screen overflow-y-auto bg-neutral-900 justify-between fixed z-30 left-0 top-0 hidden md:flex">
          <Accordion type="multiple" className="w-full mt-20">
            {/* <InputWithLabel label="Project Name" /> */}
            {sidebarMenu.map((ele) => (
              <AccordionItem key={ele.value} className="px-5" value={ele.value}>
                <AccordionTrigger>{ele.label}</AccordionTrigger>
                <AccordionContent className="pt-2 pb-5">
                  {comp[ele.value]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="md:ml-80 mt-20">
          <CreateContainer
            contentId={searchParams.id}
            contentsData={contentsData}
          />
        </div>
        <PageSwitcher />
      </ImageWrapper>
    </ImageProvider>
  );
}
