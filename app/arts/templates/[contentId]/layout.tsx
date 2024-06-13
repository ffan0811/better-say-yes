import { ImageProvider } from "@/components/image-provider";
import { ReactNode } from "react";

export default function ArtsTemplateLayout({
  params,
  children,
}: {
  params: { contentId: string };
  children: ReactNode;
}) {
  return (
    <ImageProvider isTemplate contentId={params.contentId}>
      {children}
    </ImageProvider>
  );
}
