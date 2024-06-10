"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface ColorContextType {
  backgroundColor: string;
  buttonColor: string;
  fontColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  setButtonColor: (buttonColor: string) => void;
  setFontColor: (fontColor: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "linear-gradient(45deg, rgb(23, 26, 29) 4%, rgb(21, 39, 58) 46%, rgb(23, 84, 148) 100%)"
  );
  const [fontColor, setFontColor] = useState<string>("");
  const [buttonColor, setButtonColor] = useState<string>("");

  return (
    <ColorContext.Provider
      value={{
        backgroundColor,
        buttonColor,
        fontColor,
        setBackgroundColor,
        setButtonColor,
        setFontColor,
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
