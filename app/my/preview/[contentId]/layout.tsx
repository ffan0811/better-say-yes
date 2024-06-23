import Footer from "@/components/Production/Footer";
import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { createClient } from "@/lib/supabase/server";
import { generateCustomizedImages } from "@/lib/utils/image";
import { ReactNode, Suspense } from "react";

export default async function PreviewPageLayout({
  params,
  children,
}: {
  params: { contentId: string };
  children: ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { data, error } = await supabase
    .from("contents")
    .select("status,images,theme_color,user_id")
    .eq("id", params.contentId)
    .single();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Cannot find data</p>;
  }

  if (user?.id !== data?.user_id) {
    return <p>Permission denied</p>;
  }

  const results = await generateCustomizedImages({
    contentId: params.contentId,
    tableName: "contents",
    images: data.images,
  });
  return (
    <Suspense fallback={<LoaderEntirePage />}>
      <ImageProvider contentId={params.contentId}>
        <ImageWrapper images={results}>
          {children}
          <Footer themeColor={data.theme_color} />
        </ImageWrapper>
      </ImageProvider>
    </Suspense>
  );
}
