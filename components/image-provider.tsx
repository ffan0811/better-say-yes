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
  isTemplate,
  children,
}: {
  contentId: string;
  isTemplate?: boolean;
  children: ReactNode;
}) => {
  const { toast } = useToast();

  const [images, setImages] = useState<{
    action: "add" | "delete" | "reset";
    data: (string | File)[];
  } | null>(null);
  const [viewableImages, setViewableImages] = useState<ImageProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
          const { error } = await sendImagesToDB({
            contentId,
            data: images.data as File[],
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
          await deleteImage({ contentId, imageName: images.data[0] as string });
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
