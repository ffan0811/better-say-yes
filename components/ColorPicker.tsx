"use client";
import ColorPickerLibrary from "react-best-gradient-color-picker";
import { useColor } from "./color-provider";

export default function ColorPicker() {
  const { color, setColor } = useColor();

  return <ColorPickerLibrary value={color} onChange={setColor} />;
}
