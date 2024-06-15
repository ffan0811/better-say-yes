import { getImageUrls } from "@/actions/content";
import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import { ReactNode, Suspense } from "react";

export default async function ContentPageLayout({
  params,
  children,
}: {
  params: { contentId: string };
  children: ReactNode;
}) {
  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { result, error } = await getImageUrls({
    contentId: params.contentId,
    isTemplate: true,
  });

  if (error) {
    console.log("Failed to fetch template images", JSON.stringify(error));
  }
  return (
    <Suspense fallback={<p className="text-red-500">loading.....</p>}>
      <ImageProvider contentId={params.contentId}>
        <ImageWrapper images={result}>{children}</ImageWrapper>
      </ImageProvider>
    </Suspense>
  );
}
