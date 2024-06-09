"use client";
import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/input";

export default function ProductionAfterYes({
  afterYesTitle,
  afterYesDescription,
  afterYesButtonText,
  afterYesButtonLink,
  images,
  isPreview,
}: {
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  images: File[];
  isPreview?: boolean;
}) {
  return (
    <div className="flex justify-center items-center h-screen w-screen container flex-col">
      test
    </div>
  );
}
