"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";
import { contentsAtom } from "@/atoms/content";
import { useAtom } from "jotai";
import { useEffect } from "react";

type ColorPickerProps = {};

export default function ColorPicker({}: ColorPickerProps) {
  const { themeColor, setThemeColor } = useColor();
  const [contents, setContents] = useAtom(contentsAtom);

  // TODO: move it somewhere so that it can keep this component reusable
  useEffect(() => {
    setContents((prev) => {
      return { ...prev, themeColor };
    });
  }, [themeColor]);

  return (
    <ColorPickerLibrary
      value={themeColor}
      onChange={setThemeColor}
      hideInputs
      hideOpacity
      //   hideHue
      hideControls
      hideColorTypeBtns
      hidePresets
      hideEyeDrop
      hideAdvancedSliders
      hideColorGuide
      hideInputType
      hideGradientType
      hideGradientAngle
      hideGradientStop
      hideGradientControls
      width={270}
    />
  );
}
