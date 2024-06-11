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
import PaymentButton from "@/components/Payment/Button";

const Sidebar = ({ className = "" }: { className?: string }) => {
  const [selected, setSelected] = useAtom(selectedAtom);
  const [preview, setPreview] = useAtom(previewAtom);

  const previewState = {
    [SidebarMenuType.GENERAL]: PageStepType.MAIN,
    [SidebarMenuType.MAIN_PAGE]: PageStepType.MAIN,
    [SidebarMenuType.AFTER_YES_PAGE]: PageStepType.AFTER_YES,
  };

  return (
    <div
      className={`w-80 h-screen bg-neutral-900 p-5 flex flex-col justify-between ${className}`}
    >
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
