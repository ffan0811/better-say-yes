import OpenGraphImage from "@/components/OpenGraphImage";
import { fetchContentData } from "@/fetch/contents";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BetterSayYes";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { contentId: string };
}) {
  return new ImageResponse(<OpenGraphImage />, { ...size });
}
