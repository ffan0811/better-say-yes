"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";

type ColorPickerProps = {};

export default function ColorPicker({}: ColorPickerProps) {
  const { themeColor, setThemeColor } = useColor();

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
