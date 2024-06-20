import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { ReactNode, Suspense } from "react";

const TABLE_NAME = "contents";

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
