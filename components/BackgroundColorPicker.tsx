"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";

export default function BackgroundColorPicker() {
  const { backgroundColor, setBackgroundColor } = useColor();
  const [contents, setContents] = useAtom(contentsAtom);

  // useEffect(() => {
  //   if (!backgroundColor) return;
  //   const isLinearGradient = backgroundColor.includes("linear");
  //   if (!isLinearGradient) return;

  //   setDegrees(45);
  // }, []);

  // TODO: move it somewhere so that it can keep this component reusable
  useEffect(() => {
    setContents((prev) => {
      return { ...prev, backgroundColor };
    });
  }, [backgroundColor]);

  return (
    <ColorPickerLibrary
      hideOpacity
      hideEyeDrop
      hideAdvancedSliders
      hideColorGuide
      hideInputType
      hideInputs
      // presets={}
      value={backgroundColor}
      onChange={setBackgroundColor}
      width={270}
    />
  );
}
