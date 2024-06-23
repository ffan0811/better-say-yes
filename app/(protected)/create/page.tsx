"use client";
import CreateContainer from "@/components/CreateContainer";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import PaymentButton from "@/components/Payment/PaymentButton";
import Link from "next/link";
import PageSwitcher from "@/components/PageSwitcher";
import SaveButton from "@/components/CreateContainer/SaveButton";
import { createClient } from "@/lib/supabase/client";
import { ImageProvider } from "@/components/image-provider";
import ImageWrapper from "@/components/Production/ImageWrapper";
import PreviewButton from "@/components/CreateContainer/PreviewButton";
import ReLaunchButton from "@/components/ReLaunchButton";
import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { ImageProps } from "@/types/image";
import { useToast } from "@/components/ui/use-toast";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { getBlurUrls } from "@/actions/content";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";
import MobileMenu from "@/components/CreateContainer/MobileMenu";
import MenuContent from "@/components/CreateContainer/MenuContent";
import { previewAtom } from "@/atoms/preview";
import { globalLoaderAtom, uploadingImageLoaderAtom } from "@/atoms/global";
import { PageStepType } from "@/types/status";

export default function CreatePage() {
  const [contentsData, setContentsData] = useState<Tables<"contents">>(null);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [tableName, setTableName] = useState<string | null>(null);
  const [contentsClientData, setContentsClientData] = useAtom(contentsAtom);
  const [preview, setPreview] = useAtom(previewAtom);
  const [uploadingImageLoader, setUploadingImageLoader] = useAtom(
    uploadingImageLoaderAtom
  );
  const [globalLoader, setGlobalLoader] = useAtom(globalLoaderAtom);
  const supabase = createClient();
  const { toast } = useToast();

  const searchFunc = useSearchParams();
  const paramsId = searchFunc.get("id");
  const paramsIsTemplate = searchFunc.get("isTemplate");

  useEffect(() => {
    if (paramsIsTemplate === "true") {
      setTableName("templates");
      setContentsClientData({
        ...contentsClientData,
        tableName: "templates",
      });
    } else {
      setTableName("contents");
      setContentsClientData({
        ...contentsClientData,
        tableName: "contents",
      });
    }
  }, [paramsIsTemplate]);

  const init = async () => {
    if (!tableName) return;

    try {
      setGlobalLoader({ isActive: true, message: "Fetching data..." });

      const { data, error } = await supabase
        .from(tableName as "contents" | "templates")
        .select("*")
        .eq("id", paramsId)
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
        contentId: paramsId,
        tableName: tableName,
        images: data?.images || [],
      });
      setImages(fullImages);
    } catch (error) {
    } finally {
      setGlobalLoader({ isActive: false, message: "" });
    }
  };

  useEffect(() => {
    if (!paramsId) return;
    init();
  }, [paramsId, paramsIsTemplate, tableName]);

  if (globalLoader.isActive && !contentsData) return null;

  if (!contentsData) return <p>Cannot find data</p>;

  const handlePage = (direction: "prev" | "next") => {
    setPreview({
      ...preview,
      stage: direction === "prev" ? PageStepType.MAIN : PageStepType.AFTER_YES,
    });
  };

  return (
    <ImageProvider contentId={paramsId}>
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
              <SaveButton
                contentId={paramsId}
                isImageLoading={uploadingImageLoader}
              />
              <PreviewButton contentId={paramsId} />
              {contentsData.status === "draft" && (
                <PaymentButton contentId={paramsId} />
              )}
              {contentsData.status === "inactive" && (
                <ReLaunchButton contentId={paramsId} />
              )}
            </div>
          </div>
        </nav>
        <div className="w-80 h-screen overflow-y-auto bg-neutral-900 justify-between fixed z-30 left-0 top-0 hidden md:flex">
          <MenuContent contentId={paramsId} className="mt-20" />
        </div>
        <div className="md:ml-80 mt-20">
          <CreateContainer contentId={paramsId} contentsData={contentsData} />
        </div>
        <MobileMenu contentId={paramsId} />
        <PageSwitcher onClick={handlePage} />
      </ImageWrapper>
    </ImageProvider>
  );
}
