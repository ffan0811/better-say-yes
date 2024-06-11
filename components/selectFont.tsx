"use client";
import { useFont } from "@/components/font-provider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { FontType } from "@/types/font";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";

const items = [
  {
    value: FontType.INTER,
    label: "Inter",
  },
  {
    value: FontType.ROBOTO_MONO,
    label: "Roboto Mono",
  },
  {
    value: FontType.GRANDSTANDER,
    label: "Grandstander",
  },
  {
    value: FontType.PLAYPEN_SANS,
    label: "Playpen Sans",
  },
  {
    value: FontType.LEMONADA,
    label: "Lemonada",
  },
  {
    value: FontType.CAVEAT,
    label: "Caveat",
  },
  {
    value: FontType.PLAYFAIR_DISPLAY,
    label: "Playfair Display",
  },
  {
    value: FontType.PIXELIFY_SANS,
    label: "Pixelify Sans",
  },
];

const SelectFont = () => {
  const { setFont, getFontClasses } = useFont();
  const [contents, setContents] = useAtom(contentsAtom);

  const handleFontChange = (font: FontType) => {
    setFont(font);
    setContents({
      ...contents,
      fontFamily: font,
    });
  };

  return (
    <Select onValueChange={handleFontChange}>
      <SelectTrigger className="w-full text-white focus:ring-0">
        <SelectValue placeholder="Select Font" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>User System</SelectItem>
        {items.map((ele) => (
          <SelectItem
            key={ele.value}
            value={ele.value}
            className={`${getFontClasses(ele.value)} `}
          >
            {ele.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFont;
