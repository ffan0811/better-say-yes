"use client";
import UploadImage, { LIMIT_IMAGE_NUMBER } from "../UploadImage";
import { compressImages } from "@/lib/compress";
import { useImages } from "../image-provider";
import { useAtom } from "jotai";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import { ImageSrcProps } from "@/types/image";
import { useToast } from "../ui/use-toast";
import { validateImage } from "@/lib/utils/image";

export default function CreateImages({ contentId }: { contentId: string }) {
  const { viewableImages, setImages, isAdding } = useImages();
  const [preview, setPreview] = useAtom(previewAtom);
  const { toast } = useToast();

  const compressImagesFunc = async (files: File[] | null) => {
    let result: File[] = [];
    result = await compressImages(files);
    return result;
  };

  const processImages = async (
    files: FileList | null,
    currentCount: number = 0
  ) => {
    if (!files) return;

    let received = Array.from(files);
    const totalLength = currentCount + received.length;

    if (totalLength > LIMIT_IMAGE_NUMBER) {
      alert(
        `You can upload a maximum of ${LIMIT_IMAGE_NUMBER} images per post.`
      );
      const allowed = LIMIT_IMAGE_NUMBER - currentCount;
      received = allowed > 0 ? received.slice(0, allowed) : [];
    }

    const validImages = received.filter((file) => {
      const error = validateImage(file);
      if (error) {
        toast({ description: error, variant: "destructive" });
        return false;
      }
      return true;
    });

    if (validImages.length > 0) {
      const data = await compressImagesFunc(validImages);
      setImages({ action: "add", data });
      setPreview({ stage: PageStepType.AFTER_YES });
    }
  };

  const handleImages = (files: FileList | null) => {
    return processImages(files);
  };

  const handleExtraImages = (files: FileList | null) => {
    return processImages(files, viewableImages.length);
  };

  const handleDeleteImage = (index: number, value: ImageSrcProps) => {
    if (isAdding) {
      toast({
        variant: "destructive",
        title: "Images are being uploaded",
        description:
          "Please wait until all images are uploaded before trying again.",
      });
      return;
    }
    setImages({ action: "delete", data: [value] });
    setPreview({ stage: PageStepType.AFTER_YES });
  };

  // const handleReset = () => {
  //   setImages({ action: "reset" });
  //   setPreview({ stage: PageStepType.AFTER_YES });
  // };

  return (
    <div>
      {/* <div className="text-center mb-4">
        <Button size="sm" variant="outline" onClick={handleReset}>
          Remove all images
        </Button>
      </div> */}

      <div className="flex justify-center">
        <UploadImage
          contentId={contentId}
          data={viewableImages}
          handleImages={handleImages}
          handleExtraImages={handleExtraImages}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}
