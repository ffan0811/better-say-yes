"use client";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { previewAtom } from "@/atoms/preview";
// import ProductionSecret from "../Production/Secret";
import ProductionMain from "../Production/Main";
import { contentsAtom } from "@/atoms/content";
import { PageStepType } from "@/types/status";
import ProductionAfterYes from "../Production/AfterYes";

export default function Preview() {
  const [preview, setPreview] = useAtom(previewAtom);
  const [contents, setContents] = useAtom(contentsAtom);

  return (
    <div className="p-4">
      <Button
        onClick={() => setPreview({ ...preview, isOpen: false })}
        className="absolute right-4 top-4 z-50"
      >
        Close
      </Button>
      {/* {preview.stage === PageStepType.SECRET && <ProductionSecret />} */}
      {preview.stage === PageStepType.MAIN && (
        <ProductionMain
          question={contents.question}
          alertAfterYes={contents.alertAfterYes}
          isPreview
        />
      )}
      {preview.stage === PageStepType.AFTER_YES && (
        <ProductionAfterYes
          afterYesTitle={contents.afterYesTitle}
          afterYesDescription={contents.afterYesDescription}
          afterYesButtonText={contents.afterYesButtonText}
          afterYesButtonLink={contents.afterYesButtonLink}
          images={contents.images}
          isPreview
        />
      )}
    </div>
  );
}
