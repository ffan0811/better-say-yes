"use client";
import ColorPickerLibrary, {
  useColorPicker,
} from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";
import { useEffect } from "react";

export default function BackgroundColorPicker() {
  const { backgroundColor, setBackgroundColor } = useColor();
  const { setDegrees } = useColorPicker(backgroundColor, setBackgroundColor);

  useEffect(() => {
    setDegrees(45);
  }, []);

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
