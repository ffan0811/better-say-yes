import { SidebarMenuType } from "@/types/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CreateImages from "@/components/CreateContainer/Images";
import SelectFont from "@/components/selectFont";
import BackgroundColorPicker from "@/components/BackgroundColorPicker";
import ColorPicker from "@/components/ColorPicker";

const sidebarMenu = [
  {
    label: "Font",
    value: SidebarMenuType.FONT,
  },
  {
    label: "Background",
    value: SidebarMenuType.BACKGROUND,
  },
  {
    label: "Theme Color",
    value: SidebarMenuType.THEME_COLOR,
  },
  {
    label: "Images",
    value: SidebarMenuType.IMAGES,
  },
];

export default function MenuContent({
  contentId,
  className = "",
  isAllOpen,
}: {
  contentId: string;
  className?: string;
  isAllOpen?: boolean;
}) {
  const comp = {
    [SidebarMenuType.FONT]: (
      <div className="flex justify-center">
        <SelectFont />
      </div>
    ),
    [SidebarMenuType.BACKGROUND]: (
      <div className="flex justify-center">
        <BackgroundColorPicker />
      </div>
    ),
    [SidebarMenuType.THEME_COLOR]: (
      <div className="flex justify-center">
        <ColorPicker />
      </div>
    ),
    [SidebarMenuType.IMAGES]: <CreateImages contentId={contentId} />,
  };

  return (
    <Accordion
      type="multiple"
      className={`w-full ${className}`}
      defaultValue={isAllOpen && sidebarMenu.map((ele) => ele.value)}
    >
      {/* <InputWithLabel label="Project Name" /> */}
      {sidebarMenu.map((ele) => (
        <AccordionItem key={ele.value} className="px-5" value={ele.value}>
          <AccordionTrigger>{ele.label}</AccordionTrigger>
          <AccordionContent className="pt-2 pb-5">
            {comp[ele.value]}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
