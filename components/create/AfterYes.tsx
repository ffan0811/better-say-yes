"use client";
import { useAtom } from "jotai";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TextareaWithLabel } from "../ui/textarea";
import { contentsAtom } from "@/atoms/content";
import { InputWithLabel } from "../ui/input";
import UploadImage from "../uploadImage";
import { Label } from "../ui/label";

export default function CreateAfterYes() {
  const [contents, setContents] = useAtom(contentsAtom);

  const handleImages = (files: File[]) => {
    if (files.length > 0) {
      const images = [];

      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
      setContents({
        ...contents,
        images,
      });
    }
  };

  const handleDeleteImage = (index: number, value: string) => {
    const images = contents.images || [];
    const filtered = images.toSpliced(index, 1);
    setContents({
      ...contents,
      images: filtered,
    });
  };
  return (
    <div>
      <CardHeader>
        <CardTitle>AfterYes Page</CardTitle>
        <CardDescription className="text-inherit dark:text-inherit opacity-70">
          Edit contents for the page after clicking yes button
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <InputWithLabel
          label="Title"
          value={contents.afterYesTitle}
          onChange={(e) =>
            setContents({ ...contents, afterYesTitle: e.target.value })
          }
        />
        <TextareaWithLabel
          label="Description"
          value={contents.afterYesDescription}
          onChange={(e) =>
            setContents({ ...contents, afterYesDescription: e.target.value })
          }
        />
        <InputWithLabel
          label="(Optional) Button Text"
          value={contents.afterYesButtonText}
          onChange={(e) =>
            setContents({ ...contents, afterYesButtonText: e.target.value })
          }
        />
        <InputWithLabel
          label="(Optional) Button Link"
          description="When clicking the button, It will open a new browser tab"
          value={contents.afterYesButtonLink}
          onChange={(e) =>
            setContents({ ...contents, afterYesButtonLink: e.target.value })
          }
        />
        <div className="gap-2">
          <Label>Images</Label>
          <UploadImage
            data={[]}
            handleImages={handleImages}
            handleDeleteImage={handleDeleteImage}
          />
        </div>
      </CardContent>
    </div>
  );
}
