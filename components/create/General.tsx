"use client";
import FontSelect from "../selectFont";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import ColorPicker from "../ColorPicker";

export default function CreateGeneral() {
  return (
    <div>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>
          You can set fonts, background colors and optionally language.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="space-y-1 w-1/2">
          <Label>Font</Label>
          <FontSelect />
        </div>
        <div className="space-y-1 w-1/2">
          <Label>Background</Label>
          <ColorPicker />
        </div>
      </CardContent>
    </div>
  );
}
