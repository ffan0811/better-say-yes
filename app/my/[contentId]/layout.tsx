import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
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

  // const { result, error } = await getImageUrls({
  //   contentId: params.contentId,
  // });

  // if (error) {
  //   return <p>{`Failed to fetch images: ${JSON.stringify(error)}`}</p>;
  // }
  return (
    <Suspense fallback={<LoaderEntirePage />}>
      <ImageProvider contentId={params.contentId}>
        <ImageWrapper contentId={params.contentId}>{children}</ImageWrapper>
      </ImageProvider>
    </Suspense>
  );
}
