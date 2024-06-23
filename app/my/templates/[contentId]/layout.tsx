import { openGraphDefault } from "@/app/shared-metadata";
import Footer from "@/components/Production/Footer";
import ImageWrapper from "@/components/Production/ImageWrapper";
import { ImageProvider } from "@/components/image-provider";
import LoaderEntirePage from "@/components/loaderEntirePage";
import { createClient } from "@/lib/supabase/server";
import { generateCustomizedImages } from "@/lib/utils/image";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { contentId: string };
}): Promise<Metadata> {
  const id = params.contentId;

  return {
    openGraph: {
      ...openGraphDefault,
      url: `/my/templates/${id}`,
    },
  };
}

export default async function TemplateContentPageLayout({
  params,
  children,
}: {
  params: { contentId: string };
  children: ReactNode;
}) {
  const supabase = createClient();

  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { data, error } = await supabase
    .from("templates")
    .select("status,images,theme_color")
    .eq("id", params.contentId)
    .single();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Cannot find data</p>;
  }

  if (data.status !== "active") {
    return <p>Permission denied</p>;
  }

  const results = await generateCustomizedImages({
    contentId: params.contentId,
    tableName: "templates",
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
