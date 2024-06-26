"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "./ui/use-toast";
import { sendImagesToDB } from "@/fetch/contents";
import { handleError } from "@/lib/utils";
import { deleteImage } from "@/actions/content";
import { ImageProps } from "@/types/image";
import { useAtom } from "jotai";
import { uploadingImageLoaderAtom } from "@/atoms/global";
import { useSearchParams } from "next/navigation";
import { compressImages } from "@/lib/compress";

interface ImageContextType {
  viewableImages: ImageProps[];
  isFetching: boolean;
  setViewableImages: (data: ImageProps[]) => void;
  setImages: ({
    action,
    data,
  }: {
    action: "add" | "delete" | "reset";
    data: (string | File)[];
  }) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({
  contentId,
  children,
}: {
  contentId: string;
  children: ReactNode;
}) => {
  const { toast } = useToast();
  const searchFunc = useSearchParams();
  const isTemplate = searchFunc.get("isTemplate") === "true";

  const [images, setImages] = useState<{
    action: "add" | "delete" | "reset";
    data: (string | File)[];
  } | null>(null);
  const [viewableImages, setViewableImages] = useState<ImageProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [uploadingImageLoader, setUploadingImageLoader] = useAtom(
    uploadingImageLoaderAtom
  );

  useEffect(() => {
    if (!contentId || !images) return;

    if (images.action === "add") {
      // Update viewableImages
      images.data.forEach((ele: File) => {
        const blob = URL.createObjectURL(ele);
        if (blob) {
          setViewableImages((prev) => {
            return prev.concat({ src: blob, blurDataUrl: "" });
          });
        }
      });

      // Upload images to storage
      const saveImages = async () => {
        try {
          setUploadingImageLoader(true);
          const thumbnails = await compressImages(images.data as File[], {
            maxWidth: 8,
            quality: 0.4,
          });
          const { error } = await sendImagesToDB({
            contentId,
            data: images.data as File[],
            thumbnails: thumbnails as File[],
            tableName: isTemplate ? "templates" : "contents",
          });
          if (error) {
            throw new Error(error.message);
          }
        } catch (e) {
          const err = handleError(e);
          toast({
            variant: "destructive",
            title: "Failed to upload images",
            description: err.message,
          });
        } finally {
          setUploadingImageLoader(false);
        }
      };

      saveImages();
    }
    if (images.action === "delete") {
      // NOTE: the images.data length is always 1

      // Update viewableImages
      const filtered = viewableImages.filter(
        (ele) => ele.src !== images.data[0]
      );
      setViewableImages(filtered);

      // Delete image in storage
      if (!(images.data[0] as string).includes("blob")) {
        const deleteImageInDB = async () => {
          setUploadingImageLoader(true);

          try {
            await deleteImage({
              contentId,
              imageName: images.data[0] as string,
              tableName: isTemplate ? "templates" : "contents",
            });
          } catch (e) {
            const err = handleError(e);
            toast({
              variant: "destructive",
              title: "Failed to delete images",
              description: err.message,
            });
          } finally {
            setUploadingImageLoader(false);
          }
        };

        deleteImageInDB();
      }
    }

    if (images.action === "reset") {
      // delete folder
    }
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        isFetching,
        viewableImages,
        setViewableImages,
        setImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within ImageProvider");
  }
  return context;
};
