"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";

export default function BackgroundColorPicker() {
  const { backgroundColor, setBackgroundColor } = useColor();

  return (
    <ColorPickerLibrary value={backgroundColor} onChange={setBackgroundColor} />
  );
}
