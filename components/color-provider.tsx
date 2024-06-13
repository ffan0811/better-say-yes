"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface ColorContextType {
  backgroundColor: string;
  themeColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  setThemeColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>("");

  console.log("g", backgroundColor);

  return (
    <ColorContext.Provider
      value={{
        backgroundColor,
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
