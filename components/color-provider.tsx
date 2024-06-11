"use client";
import { getContrastingColor } from "@/lib/utils";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useColorPicker } from "react-best-gradient-color-picker";

interface ColorContextType {
  backgroundColor: string;
  contrastingColor: string;
  themeColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  setThemeColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "linear-gradient(45deg, rgb(23, 26, 29) 4%, rgb(21, 39, 58) 46%, rgb(23, 84, 148) 100%)"
  );
  const [themeColor, setThemeColor] = useState<string>("");
  const [contrastingColor, setContrastingColor] = useState<string>("");

  useEffect(() => {
    if (!themeColor) return;
    const color = getContrastingColor(themeColor);
    setContrastingColor(color);
  }, [themeColor]);

  return (
    <ColorContext.Provider
      value={{
        backgroundColor,
        contrastingColor,
        themeColor,
        setBackgroundColor,
        setThemeColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useBackgroundColor must be used within ndColorProvider");
  }
  return context;
};
