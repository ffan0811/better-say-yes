import { SHORT_TITLE, openGraphDefault } from "@/app/shared-metadata";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { Tables } from "@/database.types";
import { fetchContentData } from "@/fetch/contents";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { contentId: string };
}): Promise<Metadata> {
  const id = params.contentId;
  const data: Tables<"contents"> = await fetchContentData({ contentId: id });

  return {
    openGraph: {
      ...openGraphDefault,
      title: SHORT_TITLE,
      description: data.question,
      url: `/my/${id}`,
    },
  };
}

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

  return (
    <Suspense fallback={<LoaderEntirePage />}>
      <ImageProvider contentId={params.contentId}>{children}</ImageProvider>
    </Suspense>
  );
}
