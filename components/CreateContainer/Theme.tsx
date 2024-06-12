"use client";
import { useAtom } from "jotai";
import ColorPicker from "../ColorPicker";
import { useColor } from "../color-provider";
import { contentsAtom } from "@/atoms/content";
import { useEffect } from "react";

export default function CreateTheme() {
  const { themeColor } = useColor();
  const [contents, setContents] = useAtom(contentsAtom);

  useEffect(() => {
    setContents({
      ...contents,
      themeColor,
    });
  }, [themeColor]);

  return (
    <div className="flex justify-center">
      <ColorPicker />
    </div>
  );
}
