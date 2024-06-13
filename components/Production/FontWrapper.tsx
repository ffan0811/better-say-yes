"use client";

import { ReactNode, useEffect } from "react";
import { useFont } from "../font-provider";
import { FontType } from "@/types/font";

export default function FontWrapper({
  fontFamily,
  className = "",
  children,
}: {
  fontFamily?: FontType;
  className?: string;
  children: ReactNode;
}) {
  const { fontClassName, setFont } = useFont();

  useEffect(() => {
    if (!fontFamily) return;
    setFont(fontFamily);
  }, [fontFamily]);

  return <div className={`${fontClassName} ${className}`}>{children}</div>;
}
