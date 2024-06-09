import { SidebarMenuType } from "@/types/sidebar";
import { atom } from "jotai";

export const selectedAtom = atom<string>(SidebarMenuType.GENERAL);
