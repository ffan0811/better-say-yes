/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment } from "react";
import { ImagePlusIcon, XCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface UploadImageType {
  contentId: string;
  data: string[];
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
  contentId,
  data,
  handleImages,
  handleExtraImages,
  handleDeleteImage,
}: UploadImageType) {
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
            data.length > 0
              ? handleExtraImages(e.target.files)
              : handleImages(e.target.files)
          }
        />
        <ImagePlusIcon className="h-5 w-5" />
        <p className="text-sm mt-1">
          <span className="text-primary">{data.length}</span>/
          {LIMIT_IMAGE_NUMBER}
        </p>
      </div>
      {data.length > 0 ? (
        <Fragment>
          {data.map((img, i) => {
            let src = img;
            if (img.includes("blob")) {
            } else {
              src = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/contents/${contentId}/${img}?quality=50`;
            }
            return (
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
                <img src={src} alt={"image-" + i} className="w-full h-full" />
              </div>
            );
          })}
        </Fragment>
      ) : null}
    </div>
  );
}
