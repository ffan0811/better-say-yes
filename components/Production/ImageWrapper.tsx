"use client";

import { ReactNode, useEffect } from "react";
import { useImages } from "../image-provider";
import { getImageUrls } from "@/actions/content";

export default function ImageWrapper({
  contentId,
  children,
}: {
  contentId: string;
  children: ReactNode;
}) {
  const { setViewableImages } = useImages();

  const fetch = async () => {
    const { result, error } = await getImageUrls({
      contentId: contentId,
    });
    if (result && result.length > 0) {
      setViewableImages(result);
    }
  };

  useEffect(() => {
    fetch();
  }, [contentId]);
  return <>{children}</>;
}
