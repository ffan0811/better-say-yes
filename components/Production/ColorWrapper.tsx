"use client";
import { useColor } from "@/components/color-provider";
import { ReactNode, useEffect } from "react";

type ColorWrapperProps = {
  backgroundColor?: string;
  themeColor?: string;
  className?: string;
  children: ReactNode;
};

export default function ColorWrapper({
  backgroundColor,
  themeColor,
  className = "",
  children,
}: ColorWrapperProps) {
  const { setThemeColor, setBackgroundColor } = useColor();

  useEffect(() => {
    if (!backgroundColor) return;

    setBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    if (!themeColor) return;

    setThemeColor(themeColor);
  }, [themeColor]);

  return (
    <div
      className={className}
      style={{
        background: backgroundColor,
        color: themeColor,
      }}
    >
      {children}
    </div>
  );
}
