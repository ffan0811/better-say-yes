"use client";
import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/input";

export default function ProductionMain({
  question,
  alertAfterYes,
  isPreview,
}: {
  question: string;
  alertAfterYes?: string;
  isPreview?: boolean;
}) {
  const handleNo = () => {
    alert("Are you sure? Think again!");
  };

  const handleYes = () => {
    if (alertAfterYes) {
      alert(alertAfterYes);
    }
    if (!isPreview) {
      // routing
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen container flex-col">
      <div className="w-1/2 space-y-4">
        <p className="text-3xl text-center break-words mb-8">{question}</p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleNo} className="w-full">
            No
          </Button>
          <Button onClick={handleYes} className="w-full">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
