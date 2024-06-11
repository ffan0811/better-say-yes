"use client";
import { selectedAtom } from "@/atoms/sidebar";
import { SidebarMenuType } from "@/types/sidebar";
import { useAtom } from "jotai";
import CreateGeneral from "./General";
import CreateMain from "./Main";
import CreateAfterYes from "./AfterYes";
import Sidebar from "@/components/Sidebar";
import { useColor } from "@/components/color-provider";
import { useFont } from "@/components/font-provider";

export default function CreateContainer() {
  const [selected, setSelected] = useAtom(selectedAtom);

  const { fontClassName } = useFont();
  const { fontColor, backgroundColor } = useColor();

  const comp = {
    [SidebarMenuType.GENERAL]: <CreateGeneral />,
    [SidebarMenuType.MAIN_PAGE]: <CreateMain />,
    [SidebarMenuType.AFTER_YES_PAGE]: <CreateAfterYes />,
  };

  return (
    <div
      className={`min-h-screen p-8 ${fontClassName}`}
      style={{ background: backgroundColor, color: fontColor }}
    >
      {comp[selected as SidebarMenuType]}
    </div>
  );
}
