"use client";
import Sidebar from "@/components/Sidebar";
import { useColor } from "@/components/color-provider";
import CreateContainer from "@/components/create";
import { useFont } from "@/components/font-provider";

export default function CreatePage() {
  const { fontClassName } = useFont();
  const { fontColor, backgroundColor } = useColor();

  return (
    <div
      className={`min-h-screen ${fontClassName}`}
      style={{ background: backgroundColor, color: fontColor }}
    >
      <Sidebar />
      <div className="ml-64 p-8">
        <CreateContainer />
      </div>
    </div>
  );
}
