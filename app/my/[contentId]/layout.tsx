import { ImageProvider } from "@/components/image-provider";
import { ReactNode } from "react";

export default function ContentPageLayout({
  params,
  children,
}: {
  params: { contentId: string };
  children: ReactNode;
}) {
  return <ImageProvider contentId={params.contentId}>{children}</ImageProvider>;
}
