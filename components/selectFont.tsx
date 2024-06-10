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

const FontSelect = () => {
  const { setFont, getFontClasses } = useFont();

  const handleFontChange = (font: string) => {
    setFont(font);
  };

  return (
    <Select onValueChange={handleFontChange}>
      <SelectTrigger className="w-full text-white">
        <SelectValue placeholder="Select Font" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">User System</SelectItem>
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

export default FontSelect;
