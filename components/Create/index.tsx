"use client";
import { selectedAtom } from "@/atoms/sidebar";
import { SidebarMenuType } from "@/types/sidebar";
import { useAtom } from "jotai";
import CreateGeneral from "./General";
import CreateMain from "./Main";
import CreateAfterYes from "./AfterYes";
import { useColor } from "@/components/color-provider";
import { useFont } from "@/components/font-provider";
import ProductionMain from "../Production/Main";
import { contentsAtom } from "@/atoms/content";
import ProductionWrapper from "../Production/Wrapper";
import { previewAtom } from "@/atoms/preview";
import { PageStepType } from "@/types/status";
import ProductionAfterYes from "../Production/AfterYes";

export default function CreateContainer() {
  const [contents, setContents] = useAtom(contentsAtom);
  const [preview, setPreview] = useAtom(previewAtom);

  return (
    <ProductionWrapper className={`min-h-[calc(100vh-5rem)]`}>
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
    </ProductionWrapper>
  );
}
