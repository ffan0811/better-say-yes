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
import UploadImage, { LIMIT_IMAGE_NUMBER } from "../UploadImage";
import { Label } from "../ui/label";

export default function CreateAfterYes() {
  const [contents, setContents] = useAtom(contentsAtom);

  const addImages = (newFiles: File[]) => {
    const uniqueFiles = newFiles.filter(
      (file) =>
        !contents.images.some((existingFile) => existingFile.name === file.name)
    );
    const totalImages = contents.images.length + uniqueFiles.length;

    if (totalImages > LIMIT_IMAGE_NUMBER) {
      const allowed = LIMIT_IMAGE_NUMBER - contents.images.length;
      const allowedFiles = uniqueFiles.slice(0, allowed);
      setContents({
        ...contents,
        images: contents.images.concat(allowedFiles),
      });
      if (allowedFiles.length < uniqueFiles.length) {
        alert(`You can only add ${allowed} more images.`);
      }
    } else {
      setContents({ ...contents, images: contents.images.concat(uniqueFiles) });
    }
  };

  const handleImages = (files: FileList | null) => {
    const newFiles = files ? Array.from(files) : [];
    addImages(newFiles);
  };

  const handleExtraImages = (files: FileList | null) => {
    const newFiles = files ? Array.from(files) : [];
    addImages(newFiles);
  };

  const handleDeleteImage = (index: number, value: string) => {
    const filtered = contents.images.filter((_, i) => i !== index);
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
            data={contents.images}
            handleImages={handleImages}
            handleExtraImages={handleExtraImages}
            handleDeleteImage={handleDeleteImage}
          />
        </div>
      </CardContent>
    </div>
  );
}
