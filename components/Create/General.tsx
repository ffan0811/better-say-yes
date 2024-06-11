"use client";
import FontSelect from "../selectFont";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import BackgroundColorPicker from "../BackgroundColorPicker";
import ColorPicker from "@/components/ColorPicker";
import { InputWithLabel } from "../ui/input";

export default function CreateGeneral() {
  return (
    <div>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription className="text-inherit dark:text-inherit opacity-70">
          You can customize theme of your website
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-between items-center">
          <div className="space-y-8 w-5/12">
            <div className="space-y-1">
              <Label>Font</Label>
              <FontSelect />
            </div>
            <div className="space-y-1">
              <Label>Background</Label>
              <BackgroundColorPicker />
            </div>
            <div className="space-y-1">
              <Label>Font Color</Label>
              <ColorPicker type="font" />
            </div>
            <div className="space-y-1">
              <Label>Button Color</Label>
              <ColorPicker type="button" />
            </div>
          </div>
          <div className="w-5/12">preview</div>
        </div>
      </CardContent>
    </div>
  );
}
