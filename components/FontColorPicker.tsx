"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";

export default function FontColorPicker() {
  const { fontColor, setFontColor } = useColor();

  return (
    <ColorPickerLibrary
      value={fontColor}
      onChange={setFontColor}
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
    />
  );
}
