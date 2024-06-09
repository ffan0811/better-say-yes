"use client";
// context/FontContext.tsx
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  Grandstander,
  Inter,
  Lemonada,
  Roboto_Mono,
  Playfair_Display,
} from "next/font/google";
import { FontType } from "@/types/font";

const grandstander = Grandstander({
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const lemonada = Lemonada({
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  [FontType.GRANDSTANDER]: grandstander,
  [FontType.INTER]: inter,
  [FontType.LEMONADA]: lemonada,
  [FontType.ROBOTO_MONO]: robotoMono,
  [FontType.PLAYFAIR_DISPLAY]: playfairDisplay,
};

interface FontContextType {
  font: string;
  fontClassName: string;
  setFont: (font: string) => void;
  getFontClasses: (font: keyof typeof fonts) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState("Roboto");
  const [fontClassName, setFontClassName] = useState("");

  useEffect(() => {
    const classes = fonts[font as keyof typeof fonts];
    setFontClassName(classes?.className || "");
  }, [font]);

  const getFontClasses = (fontName: keyof typeof fonts) => {
    const classes = fonts[fontName];
    return classes?.className || "";
  };

  return (
    <FontContext.Provider
      value={{ font, fontClassName, setFont, getFontClasses }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
