"use client";
import { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

const MENU_COMMON_CLASSES = "text-xl cursor-pointer";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-neutral-800 text-white fixed left-0 top-0 p-5 flex flex-col justify-between">
      <div>
        <Link href="/dashboard">
          <Logo className="w-20 h-auto mb-8" />
        </Link>
        <ul className="space-y-4">
          <li className={MENU_COMMON_CLASSES}>General</li>
          <ul className="space-y-2">
            <p className="text-neutral-400 text-sm">Pages</p>
            <li className={MENU_COMMON_CLASSES}>Main</li>
            <li className={MENU_COMMON_CLASSES}>After Yes</li>
          </ul>
        </ul>
      </div>
      <Link
        href="/dashboard"
        className={`w-full flex items-center ${buttonVariants({
          variant: "default",
        })}`}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Go back
      </Link>
    </div>
  );
};

export default Sidebar;
