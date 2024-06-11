"use client";
import { contentsAtom } from "@/atoms/content";
import UploadImage, { LIMIT_IMAGE_NUMBER } from "../UploadImage";
import { useAtom } from "jotai";
import { compressImages } from "@/lib/compress";

export default function CreateImages() {
  const [contents, setContents] = useAtom(contentsAtom);

  const addImages = async (files: File[]) => {
    let compressedImages: File[] = [];
    compressedImages = await compressImages(files);

    const uniqueFiles = compressedImages.filter(
      (file) =>
        !contents.images.some((existingFile) => existingFile.name === file.name)
    );
    const totalImages = contents.images.length + uniqueFiles.length;

    if (totalImages > LIMIT_IMAGE_NUMBER) {
      const allowed = LIMIT_IMAGE_NUMBER - contents.images.length;
      const allowedFiles = uniqueFiles.slice(0, allowed);
      setContents({
        ...contents,
        images: contents.images.concat(allowedFiles),
      });
      if (allowedFiles.length < uniqueFiles.length) {
        alert(`You can only add ${allowed} more images.`);
      }
    } else {
      setContents({ ...contents, images: contents.images.concat(uniqueFiles) });
    }
  };

  const handleImages = (files: FileList | null) => {
    const newFiles = files ? Array.from(files) : [];
    addImages(newFiles);
  };

  const handleExtraImages = (files: FileList | null) => {
    const newFiles = files ? Array.from(files) : [];
    addImages(newFiles);
  };

  const handleDeleteImage = (index: number, value: string) => {
    const filtered = contents.images.filter((_, i) => i !== index);
    setContents({
      ...contents,
      images: filtered,
    });
  };

  return (
    <div className="flex justify-center">
      <UploadImage
        data={contents.images}
        handleImages={handleImages}
        handleExtraImages={handleExtraImages}
        handleDeleteImage={handleDeleteImage}
      />
    </div>
  );
}
