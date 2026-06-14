"use client";

import { ColorProvider } from "@/components/color-provider";
import { FontProvider } from "@/components/font-provider";
import { ReactNode } from "react";

export default function ProductionProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ColorProvider>
      <FontProvider>{children}</FontProvider>
    </ColorProvider>
  );
}
