"use client";
import { useEffect } from "react";
import { useColor } from "@/components/color-provider";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";

import BackgroundColorPicker from "../BackgroundColorPicker";

export default function CreateBackground() {
  const { backgroundColor } = useColor();
  const [contents, setContents] = useAtom(contentsAtom);

  useEffect(() => {
    setContents({
      ...contents,
      backgroundColor,
    });
  }, [backgroundColor]);

  return (
    <div className="flex justify-center">
      <BackgroundColorPicker />
    </div>
  );
}
