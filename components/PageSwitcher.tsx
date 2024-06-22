"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PageSwitcherProps = {
  onClick: (direction: "prev" | "next") => void;
};

export default function PageSwitcher({ onClick }: PageSwitcherProps) {
  return (
    <div className="fixed right-4 bottom-4 space-x-2">
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
