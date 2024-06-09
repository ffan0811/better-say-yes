"use client";
import { selectedAtom } from "@/atoms/sidebar";
import { SidebarMenuType } from "@/types/sidebar";
import { useAtom } from "jotai";
import CreateGeneral from "./General";
import CreateMain from "./Main";
import CreateAfterYes from "./AfterYes";

export default function CreateContainer() {
  const [selected, setSelected] = useAtom(selectedAtom);

  if (selected === SidebarMenuType.MAIN_PAGE) {
    return <CreateMain />;
  }
  if (selected === SidebarMenuType.AFTER_YES_PAGE) {
    return <CreateAfterYes />;
  }
  return <CreateGeneral />;
}
