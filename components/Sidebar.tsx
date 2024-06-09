"use client";
import { ReactNode } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { SidebarMenuLabels } from "@/constants/sidebar";
import { SidebarMenuType } from "@/types/sidebar";
import { useAtom } from "jotai";
import { selectedAtom } from "@/atoms/sidebar";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";

const Sidebar = () => {
  const [selected, setSelected] = useAtom(selectedAtom);
  const [preview, setPreview] = useAtom(previewAtom);

  const previewState = {
    [SidebarMenuType.GENERAL]: PageStepType.MAIN,
    [SidebarMenuType.MAIN_PAGE]: PageStepType.MAIN,
    [SidebarMenuType.AFTER_YES_PAGE]: PageStepType.AFTER_YES,
  };

  return (
    <div className="w-64 h-screen fixed left-0 top-0 p-5 flex flex-col justify-between">
      <div>
        <Link href="/dashboard">
          <Logo className="w-20 h-auto mb-8" />
        </Link>
        <ul className="space-y-4">
          <SidebarItem
            isActive={selected === SidebarMenuType.GENERAL}
            onClick={() => setSelected(SidebarMenuType.GENERAL)}
          >
            {SidebarMenuLabels[SidebarMenuType.GENERAL]}
          </SidebarItem>
          <div className="space-y-2">
            <p className="opacity-50 text-sm">Pages</p>
            {Object.values(SidebarMenuType)
              .filter((type) => type !== SidebarMenuType.GENERAL)
              .map((type) => (
                <SidebarItem
                  key={type}
                  isActive={selected === type}
                  onClick={() => setSelected(type)}
                >
                  {SidebarMenuLabels[type]}
                </SidebarItem>
              ))}
          </div>
        </ul>
      </div>
      <div className="space-y-2">
        <Link href="/dashboard" className={`w-full py-2 flex items-center`}>
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Leave the current page
        </Link>
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            setPreview({
              stage: previewState[selected as keyof typeof previewState],
              // stage: contents.secretCode ? "secret" : "main",
              isOpen: true,
            })
          }
        >
          Preview
        </Button>
        <Button className="w-full">Launch</Button>
      </div>
    </div>
  );
};

const SidebarItem = ({
  isActive,
  children,
  onClick,
}: {
  isActive?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li
      className={`text-xl cursor-pointer ${isActive ? "underline" : ""}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default Sidebar;
