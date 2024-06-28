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
import { ImageProps, ImageSrcProps } from "@/types/image";
import { useSearchParams } from "next/navigation";
import { compressImages } from "@/lib/compress";
import { createImageFileNames } from "@/lib/utils/image";

interface ImageContextType {
  viewableImages: ImageProps[];
  isFetching: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  setViewableImages: (data: ImageProps[]) => void;
  setImages: ({
    action,
    data,
  }: {
    action: "add" | "delete" | "reset";
    data?: (ImageSrcProps | File)[];
  }) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

type TableNameType = "templates" | "contents";
type ImagesType = {
  action: "add" | "delete" | "reset";
  data?: (ImageSrcProps | File)[];
};

export const ImageProvider = ({
  contentId,
  children,
}: {
  contentId: string;
  children: ReactNode;
}) => {
  const { toast } = useToast();
  const searchFunc = useSearchParams();
  const tableNameParam =
    searchFunc.get("isTemplate") === "true" ? "templates" : "contents";

  const [images, setImages] = useState<ImagesType | null>(null);
  const [viewableImages, setViewableImages] = useState<ImageProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [addingStatus, setAddingStatus] = useState<boolean>(false);
  const [deletingStatus, setDeletingStatus] = useState<boolean>(false);

  console.log("viewableImages", viewableImages);

  const saveImages = async ({
    contentId,
    tableName,
    images,
    fileNames,
  }: {
    contentId: string;
    tableName: TableNameType;
    images: ImagesType;
    fileNames: string[];
  }) => {
    if (!contentId) return;
    try {
      setAddingStatus(true);
      const thumbnails = await compressImages(images.data as File[], {
        maxWidth: 8,
        quality: 0.4,
      });
      const { error } = await sendImagesToDB({
        contentId,
        data: images.data as File[],
        thumbnails: thumbnails as File[],
        tableName,
        fileNames,
      });
      if (error) {
        throw new Error(error.message);
      }

      // Map new data to ImageProps objects
      // const newImages = result.map((value) => ({ src: { value } }));

      // Update the state with the concatenated result
      // setViewableImages([...viewableImages, ...newImages]);
    } catch (e) {
      const err = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to upload images",
        description: err.message,
      });
    } finally {
      setAddingStatus(false);
    }
  };

  // const resetImages = async ({
  //   contentId,
  //   tableName,
  // }: {
  //   contentId: string;
  //   tableName: TableNameType;
  // }) => {
  //   try {
  //     setUploadingImageLoader(true);
  //     const { error } = await deleteFolder({
  //       contentId,
  //       tableName,
  //     });
  //     if (error) {
  //       throw new Error(error.message);
  //     }
  //   } catch (e) {
  //     const err = handleError(e);
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to reset images",
  //       description: err.message,
  //     });
  //   } finally {
  //     setUploadingImageLoader(false);
  //   }
  // };

  const deleteImageInServer = async ({
    imageName,
    tableName,
  }: {
    imageName: string;
    tableName: "templates" | "contents";
  }) => {
    setDeletingStatus(true);

    try {
      await deleteImage({
        contentId,
        imageName,
        tableName,
      });
    } catch (e) {
      const err = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to delete images",
        description: err.message,
      });
    } finally {
      setDeletingStatus(false);
    }
  };

  useEffect(() => {
    if (!images) return;

    console.log("iag", images);

    if (images.action === "add") {
      // Update viewableImages
      const fileNames = createImageFileNames(images.data as File[]) as string[];

      images.data.forEach((ele: File, idx) => {
        const blob = URL.createObjectURL(ele);
        if (blob) {
          setViewableImages((prev) => {
            return prev.concat({
              src: { value: fileNames[idx], blob },
              blurDataUrl: "",
            });
          });
        }
      });

      // Upload images to storage

      saveImages({ contentId, tableName: tableNameParam, images, fileNames });
    }
    if (images.action === "delete") {
      // NOTE: the images.data length is always 1

      // Update viewableImages
      const filtered = viewableImages.filter(
        (ele) => ele.src.value !== (images.data[0] as ImageSrcProps).value
      );
      setViewableImages(filtered);

      // Delete image in storage
      deleteImageInServer({
        imageName: (images.data[0] as ImageSrcProps).value,
        tableName: tableNameParam,
      });
    }

    if (images.action === "reset") {
      // setViewableImages([]);
      // delete folder
      // resetImages({ contentId, tableName: tableNameParam });
    }
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        isFetching,
        isAdding: addingStatus,
        isDeleting: deletingStatus,
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
