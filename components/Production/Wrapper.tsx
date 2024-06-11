"use client";
import { useColor } from "@/components/color-provider";
import { useFont } from "@/components/font-provider";
import { ReactNode } from "react";

type ProductionWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function ProductionWrapper({
  className,
  children,
}: ProductionWrapperProps) {
  const { fontClassName } = useFont();
  const { themeColor, backgroundColor } = useColor();

  return (
    <div
      className={`flex justify-center p-4 ${fontClassName} ${className}`}
      style={{
        background: backgroundColor,
        color: themeColor,
      }}
    >
      {children}
    </div>
  );
}
