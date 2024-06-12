"use client";
import UploadImage from "../UploadImage";
import { compressImages } from "@/lib/compress";
import { useImages } from "../image-provider";

export default function CreateImages({ contentId }: { contentId: string }) {
  const { viewableImages, setImages } = useImages();

  const compressImagesFunc = async (files: FileList | null) => {
    const newFiles = files ? Array.from(files) : [];

    let result: File[] = [];
    result = await compressImages(newFiles);
    return result;
  };

  const handleImages = async (files: FileList | null) => {
    const data = await compressImagesFunc(files);
    setImages({ action: "add", data });
  };

  const handleExtraImages = async (files: FileList | null) => {
    const data = await compressImagesFunc(files);
    setImages({ action: "add", data });
  };

  const handleDeleteImage = (index: number, value: string) => {
    setImages({ action: "delete", data: [value] });
  };

  return (
    <div className="flex justify-center">
      <UploadImage
        contentId={contentId}
        data={viewableImages}
        handleImages={handleImages}
        handleExtraImages={handleExtraImages}
        handleDeleteImage={handleDeleteImage}
      />
    </div>
  );
}
