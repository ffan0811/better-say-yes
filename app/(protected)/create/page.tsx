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
import { createClient } from "@/lib/supabase/server";
import { ImageProvider } from "@/components/image-provider";
import SelectFont from "@/components/selectFont";
import BackgroundColorPicker from "@/components/BackgroundColorPicker";
import ColorPicker from "@/components/ColorPicker";
import ImageWrapper from "@/components/Production/ImageWrapper";
import { getImageUrls } from "@/actions/content";
import PreviewButton from "@/components/CreateContainer/PreviewButton";

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
    label: "Images",
    value: SidebarMenuType.IMAGES,
  },
];

export default async function CreatePage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const supabase = createClient();

  const { data: contentsData, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", searchParams.id)
    .single();

  const { result: imageResults, error: imageError } = await getImageUrls({
    contentId: searchParams.id,
  });

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-3xl">Failed to fetch data</p>
      </div>
    );
  }

  if (imageError) {
    console.log(
      "Failed to fetch images in Create pages",
      JSON.stringify(imageError)
    );
  }

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

  return (
    <ImageProvider contentId={searchParams.id}>
      <ImageWrapper images={imageResults}>
        <nav className="fixed z-40 left-0 top-0 flex items-center w-full h-20 bg-neutral-900 py-4 border-b border-neutral-500">
          <div className="flex justify-between items-center w-full px-5">
            <div className="flex items-center space-x-16">
              <Link
                href="/dashboard
            "
              >
                <Logo className="h-auto w-20" />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              {/* <RefreshCcwIcon className="mr-4 opacity-80" /> */}
              <SaveButton contentId={searchParams.id} />
              <PreviewButton contentId={searchParams.id} />
              {contentsData.status === "draft" && (
                <PaymentButton contentId={searchParams.id} />
              )}
            </div>
          </div>
        </nav>
        <div className="w-80 h-screen overflow-y-auto bg-neutral-900 flex justify-between fixed z-30 left-0 top-0">
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
        <div className="ml-80 mt-20">
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
