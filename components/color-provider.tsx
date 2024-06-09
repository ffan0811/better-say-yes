"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface ColorContextType {
  backgroundColor: string;
  fontColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  setFontColor: (fontColor: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");

  return (
    <ColorContext.Provider
      value={{ backgroundColor, fontColor, setBackgroundColor, setFontColor }}
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
