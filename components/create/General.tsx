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
import FontColorPicker from "../FontColorPicker";

export default function CreateGeneral() {
  return (
    <div>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription className="text-inherit dark:text-inherit opacity-70">
          You can set fonts, background colors and optionally language.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="space-y-10 w-5/12">
          <div className="space-y-1">
            <Label>Font</Label>
            <FontSelect />
          </div>
          <div className="space-y-1">
            <Label>Font Color</Label>
            <FontColorPicker />
          </div>
        </div>
        <div className="space-y-1 w-5/12">
          <Label>Background</Label>
          <BackgroundColorPicker />
        </div>
      </CardContent>
    </div>
  );
}
