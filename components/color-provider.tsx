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
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "linear-gradient(45deg, rgb(23, 26, 29) 4%, rgb(21, 39, 58) 46%, rgb(23, 84, 148) 100%)"
  );
  const [themeColor, setThemeColor] = useState<string>("");

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
