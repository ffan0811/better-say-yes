"use client";

import { ReactNode, useEffect } from "react";
import { useImages } from "../image-provider";
import { getImageUrls } from "@/actions/content";
import { ImageProps } from "@/types/image";

export default function ImageWrapper({
  contentId,
  images,
  children,
}: {
  contentId?: string;
  images?: ImageProps[];
  children: ReactNode;
}) {
  const { setViewableImages } = useImages();

  const fetchImages = async () => {
    const { result, error } = await getImageUrls({
      contentId: contentId,
    });
    if (result && result.length > 0) {
      setViewableImages(result);
    }
  };

  useEffect(() => {
    if (!contentId) return;
    fetchImages();
  }, [contentId]);

  useEffect(() => {
    if (images && images.length > 0) {
      setViewableImages(images);
    }
  }, [images]);
  return <>{children}</>;
}
