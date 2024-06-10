"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";

type ColorPickerProps = {
  type: "font" | "button";
};

export default function ColorPicker({ type }: ColorPickerProps) {
  const { buttonColor, fontColor, setButtonColor, setFontColor } = useColor();
  const color = type === "font" ? fontColor : buttonColor;
  const setColor = type === "font" ? setFontColor : setButtonColor;

  return (
    <ColorPickerLibrary
      value={color}
      onChange={setColor}
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
