/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Fragment } from "react";
import { ImagePlusIcon, XCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface UploadImageType {
  data: File[];
  handleImages: (files: FileList | null) => void;
  handleExtraImages: (files: FileList | null) => void;
  handleDeleteImage: (index: number, img: string) => void;
}

export const LIMIT_IMAGE_NUMBER = 20;
const IMAGE_COMMON_CLASSES = `w-20 h-20 min-w-20 min-h-20 cursor-pointer ${buttonVariants(
  {
    variant: "outline",
  }
)}`;

export default function UploadImage({
  data,
  handleImages,
  handleExtraImages,
  handleDeleteImage,
}: UploadImageType) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    let images: string[] = [];

    for (let i = 0; i < (data || []).length; i++) {
      const preview = URL.createObjectURL(data[i]);
      images.push(preview);
    }
    setPreviews(images);
  }, [data]);

  return (
    <div className="relative content-start grid gap-2 grid-cols-3">
      <div
        className={`relative flex flex-col items-center justify-center ${IMAGE_COMMON_CLASSES}`}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
          multiple
          accept="image/*"
          onChange={(e) =>
            previews.length > 0
              ? handleExtraImages(e.target.files)
              : handleImages(e.target.files)
          }
        />
        <ImagePlusIcon className="h-5 w-5" />
        <p className="text-sm mt-1">
          <span className="text-primary">{previews.length}</span>/
          {LIMIT_IMAGE_NUMBER}
        </p>
      </div>
      {previews.length > 0 ? (
        <Fragment>
          {previews.map((img, i) => (
            <div
              key={i}
              className={`relative ${IMAGE_COMMON_CLASSES}`}
              style={{ padding: 0 }}
            >
              <button
                className="absolute flex items-center justify-center w-full h-full z-20"
                type="button"
                onClick={() => handleDeleteImage(i, img)}
              >
                <XCircleIcon className="w-8 h-8 text-inherit cursor-pointer hover:opacity-70" />
              </button>
              <img src={img} alt={"image-" + i} className="w-full h-full" />
            </div>
          ))}
        </Fragment>
      ) : null}
    </div>
  );
}
