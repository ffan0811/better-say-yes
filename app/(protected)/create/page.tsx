import CreateContainer from "@/components/Create";
import Logo from "@/components/Logo";
import PaymentButton from "@/components/Payment/Button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarMenuType } from "@/types/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreateBackground from "@/components/Create/Background";
import CreateTheme from "@/components/Create/Theme";
import CreateFont from "@/components/Create/Font";

const sidebarMenu = [
  {
    label: "Background",
    value: SidebarMenuType.BACKGROUND,
  },
  {
    label: "Theme Color",
    value: SidebarMenuType.THEME_COLOR,
  },
  {
    label: "Font",
    value: SidebarMenuType.FONT,
  },
];

export default function CreatePage() {
  const comp = {
    [SidebarMenuType.BACKGROUND]: <CreateBackground />,
    [SidebarMenuType.THEME_COLOR]: <CreateTheme />,
    [SidebarMenuType.FONT]: <CreateFont />,
  };

  return (
    <div>
      <nav className="fixed z-40 left-0 top-0 flex items-center w-full h-20 bg-neutral-900 py-4 border-b border-neutral-500">
        <div className="flex justify-between items-center w-full px-5">
          <div className="flex items-center space-x-16">
            <Link href="/">
              <Logo className="h-auto w-20" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <Button>Save</Button>
            <PaymentButton />
          </div>
        </div>
      </nav>
      <div className="w-80 h-screen overflow-y-auto bg-neutral-900 flex justify-between fixed z-30 left-0 top-0">
        <Accordion type="multiple" className="w-full mt-20">
          {sidebarMenu.map((ele) => (
            <AccordionItem className="px-5" value={ele.value}>
              <AccordionTrigger>{ele.label}</AccordionTrigger>
              <AccordionContent className="pt-2 pb-5">
                {comp[ele.value]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="ml-80 mt-20">
        <CreateContainer />
      </div>
    </div>
  );
}
