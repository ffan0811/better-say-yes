/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, Fragment } from "react";
import { ImagePlusIcon, XCircleIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

import { validateImage } from "@/utils";
// import { AWS_S3_BASE_URL } from "@/constants";

import { buttonVariants } from "@/components/ui/button";
import { useAtom } from "jotai";
interface UploadImageType {
  data: File[];
  handleImages: (files: FileList | null) => void;
  handleExtraImages: (files: FileList | null) => void;
  handleDeleteImage: (index: number, img: string) => void;
  // previews?: string[]
}

export const LIMIT_IMAGE_NUMBER = 5;
const IMAGE_COMMON_CLASSES = `w-40 h-40 min-w-40 min-h-40 ${buttonVariants({
  variant: "outline",
})}`;

export default function UploadImage({
  data,
  handleImages,
  handleExtraImages,
  handleDeleteImage,
}: UploadImageType) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      let images: string[] = [];

      for (let i = 0; i < data.length; i++) {
        const preview = URL.createObjectURL(data[i]);
        images.push(preview);
      }
      setPreviews(images);
    }
  }, [data]);

  // const { toast } = useToast();

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const newData = data.map((ele) =>
  //       ele.includes("blob") ? ele : `/posts/${ele}`
  //     );
  //     setPreviews(newData);
  //   }
  // }, [data]);

  // const handleImagesClient = (files: FileList | null) => {
  //   let received = files ? Array.from(files) : [];

  //   if (received && (received || []).length > 0) {
  //     if (received.length > LIMIT_IMAGE_NUMBER) {
  //       alert(
  //         `You can upload a maximum of ${LIMIT_IMAGE_NUMBER} images per post.`
  //       );
  //       received = received.slice(0, LIMIT_IMAGE_NUMBER);
  //     }
  //     const images = [];

  //     for (let i = 0; i < received.length; i++) {
  //       const error = validateImage(received[i]);
  //       if (!error) {
  //         images.push(URL.createObjectURL(received[i]));
  //         setPreviews(images);
  //         handleImages(received);
  //       } else {
  //         toast({ description: error, variant: "destructive" });
  //         break;
  //       }
  //     }
  //   }
  // };

  // const handleExtraImagesClient = (files: FileList | null) => {
  //   let received = files ? Array.from(files) : [];
  //   const currentLength = previews.length;

  //   if (received && (received || []).length > 0) {
  //     if (currentLength + received.length > LIMIT_IMAGE_NUMBER) {
  //       alert(
  //         `You can upload a maximum of ${LIMIT_IMAGE_NUMBER} images per post.`
  //       );
  //       const allowed = LIMIT_IMAGE_NUMBER - currentLength;
  //       received =
  //         allowed > 0 ? received.slice(0, allowed) : received.slice(0, 0);
  //     }

  //     for (let i = 0; i < received.length; i++) {
  //       const error = validateImage(received[i]);
  //       if (!error) {
  //         setPreviews((prev) => {
  //           const preview = URL.createObjectURL(received[i]);
  //           return [...prev, preview];
  //         });
  //         handleExtraImages && handleExtraImages(received);
  //       } else {
  //         toast({ description: error, variant: "destructive" });
  //         break;
  //       }
  //     }
  //   }
  // };

  // const handleDeletePreviewClient = (index: number, img: string) => {
  //   const filtered = previews.toSpliced(index, 1);
  //   setPreviews(filtered);
  //   handleDeleteImage(index, img);
  // };

  return (
    <div className="relative flex gap-2">
      <div className="pt-2">
        <div
          className={`relative flex flex-col items-center justify-center pt-2 ${IMAGE_COMMON_CLASSES}`}
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
      </div>
      <div className="overflow-y-auto flex gap-2 pt-2 pr-2">
        {previews.length > 0 ? (
          <Fragment>
            {previews.map((img, i) => (
              <div
                key={i}
                className={`relative ${IMAGE_COMMON_CLASSES}`}
                style={{ padding: 0 }}
              >
                <button
                  className="absolute -right-2 -top-2 z-20"
                  type="button"
                  onClick={() => handleDeleteImage(i, img)}
                >
                  <XCircleIcon className="w-4 h-4 text-inherit cursor-pointer hover:opacity-70" />
                </button>
                <img src={img} alt={"image-" + i} className="w-full h-full" />
              </div>
            ))}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}
