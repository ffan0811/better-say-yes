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

export default function CreateGeneral() {
  return (
    <div>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>
          You can set fonts, background colors and optionally language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label className="block mb-1">Font</Label>
        <FontSelect />
      </CardContent>
    </div>
  );
}
