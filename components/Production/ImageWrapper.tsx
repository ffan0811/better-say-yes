"use client";

import { ImageProps } from "@/types/image";
import { ReactNode, useEffect } from "react";
import { useImages } from "../image-provider";

export default function ImageWrapper({
  images,
  children,
}: {
  images: ImageProps[];
  children: ReactNode;
}) {
  const { setViewableImages } = useImages();

  useEffect(() => {
    if (images && (images || []).length > 0) {
      console.log("images", images);
      setViewableImages(images);
    }
  }, [images]);
  return <>{children}</>;
}
