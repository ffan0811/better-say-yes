"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PageSwitcherProps = {
  className?: string;
  onClick: (direction: "prev" | "next") => void;
};

export default function PageSwitcher({
  className = "",
  onClick,
}: PageSwitcherProps) {
  return (
    <div className={`space-x-2 ${className}`}>
      {/* {isLoading && <Button size="icon" isLoading />} */}
      <Button size="icon" onClick={() => onClick("prev")}>
        <ChevronLeft />
      </Button>
      <Button size="icon" onClick={() => onClick("next")}>
        <ChevronRight />
      </Button>
    </div>
  );
}
