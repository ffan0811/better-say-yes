import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { createClient } from "@/lib/supabase/server";
import getBase64ImageUrl from "@/lib/utils/generateBlurPlaceholder";
import { ImageProps } from "@/types/image";
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

  const supabase = createClient();

  const { data, error } = await supabase.functions.invoke("fetch-images", {
    body: { contentId: params.contentId, tableName: "contents" },
  });

  if (error) {
    return <p>{`Failed to fetch template images: ${JSON.stringify(error)}`}</p>;
  }

  let reducedResults: ImageProps[] = [];

  const blurImagePromises = data.data.map((image: { name: string }) => {
    return getBase64ImageUrl({
      imageName: image.name,
      storageUrl: `/contents/${params.contentId}`,
    });
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < data.data.length; i++) {
    reducedResults.push({
      src: data.data[i].name,
      blurDataUrl: imagesWithBlurDataUrls[i],
    });
  }

  return (
    <Suspense fallback={<LoaderEntirePage />}>
      <ImageProvider contentId={params.contentId}>
        <ImageWrapper images={reducedResults}>{children}</ImageWrapper>
      </ImageProvider>
    </Suspense>
  );
}
