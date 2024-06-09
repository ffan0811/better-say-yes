"use client";
import Sidebar from "@/components/Sidebar";
import CreateContainer from "@/components/create";
import { useFont } from "@/components/font-provider";

export default function CreatePage() {
  const { fontClassName } = useFont();

  return (
    <div className={fontClassName}>
      <Sidebar />
      <div className="ml-64 p-8">
        <CreateContainer />
      </div>
    </div>
  );
}
