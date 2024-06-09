"use client";
import { previewAtom } from "@/atoms/preview";
import Preview from "@/components/Preview";
import Sidebar from "@/components/Sidebar";
import { useColor } from "@/components/color-provider";
import CreateContainer from "@/components/create";
import { useFont } from "@/components/font-provider";
import { useAtom } from "jotai";

export default function CreatePage() {
  const { fontClassName } = useFont();
  const { fontColor, backgroundColor } = useColor();
  const [preview, setPreview] = useAtom(previewAtom);

  return (
    <div
      className={`min-h-screen ${fontClassName}`}
      style={{ background: backgroundColor, color: fontColor }}
    >
      {preview.isOpen ? (
        <Preview />
      ) : (
        <>
          <Sidebar />
          <div className="ml-64 p-8">
            <CreateContainer />
          </div>
        </>
      )}
    </div>
  );
}
