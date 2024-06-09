"use client";
import { selectedAtom } from "@/atoms/sidebar";
import { SidebarMenuType } from "@/types/sidebar";
import { useAtom } from "jotai";
import CreateGeneral from "./General";
import CreateMain from "./Main";
import CreateAfterYes from "./AfterYes";

export default function CreateContainer() {
  const [selected, setSelected] = useAtom(selectedAtom);

  const comp = {
    [SidebarMenuType.GENERAL]: <CreateGeneral />,
    [SidebarMenuType.MAIN_PAGE]: <CreateMain />,
    [SidebarMenuType.AFTER_YES_PAGE]: <CreateAfterYes />,
  };

  return <div>{comp[selected as SidebarMenuType]}</div>;
}
