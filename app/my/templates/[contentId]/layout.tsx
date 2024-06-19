import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { createClient } from "@/lib/supabase/server";
import { generateCustomizedImages } from "@/lib/utils/image";
import { ReactNode, Suspense } from "react";

const TABLE_NAME = "templates";

export default async function TemplateContentPageLayout({
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

  // const { data, error } = await supabase.functions.invoke("fetch-images", {
  //   body: { contentId: params.contentId, tableName: TABLE_NAME },
  // });

  const { data, error } = await supabase.rpc("list_objects", {
    bucketid: "templates",
    prefix: "",
    limits: 20,
    offsets: 0,
  });

  if (error) {
    return <p>{`Failed to fetch template images: ${JSON.stringify(error)}`}</p>;
  }

  const results = await generateCustomizedImages({
    contentId: params.contentId,
    tableName: TABLE_NAME,
    images: data,
  });

  return (
    <Suspense fallback={<LoaderEntirePage />}>
      <ImageProvider isTemplate contentId={params.contentId}>
        <ImageWrapper images={results}>{children}</ImageWrapper>
      </ImageProvider>
    </Suspense>
  );
}
