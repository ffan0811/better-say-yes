import OpenGraphImage from "@/components/OpenGraphImage";
import { fetchContentData } from "@/fetch/contents";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BetterSayYes: My project";
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
  const data = await fetchContentData({
    contentId: params.contentId,
    tableName: "templates",
  });

  return new ImageResponse(
    (
      <OpenGraphImage
        themeColor={data?.theme_color}
        backgroundColor={data?.background_color}
      />
    ),
    { ...size }
  );
}
