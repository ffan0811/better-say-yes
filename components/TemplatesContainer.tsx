"use client";

import Link from "next/link";
import { ITEM_HEIGHT } from "@/components/ContentItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { useFont } from "./font-provider";
import { FontType } from "@/types/font";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createContent } from "@/actions/content";
import { Skeleton } from "./ui/skeleton";
import { globalLoaderAtom } from "@/atoms/global";
import { useAtom } from "jotai";
import ContentItem from "./ContentItem";
import ContentSideButton from "./ContentItem/ContentSideButton";

export type TemplateType = {
  id: string;
  background_color: string;
  font_family: string;
  theme_color: string;
  name: string;
};

export default function TemplatesContainer({
  data,
  isFetching,
}: {
  data: TemplateType[];
  isFetching: boolean;
}) {
  const { getFontClasses } = useFont();
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateWithTemplate = async (
    e: React.MouseEvent<HTMLDivElement>,
    templateData: TemplateType
  ) => {
    setIsGlobalLoading({
      isActive: true,
      message: "Generating your page...",
    });
    const { result, error } = await createContent({
      fontFamily: templateData.font_family as FontType,
      backgroundColor: templateData.background_color,
      themeColor: templateData.theme_color,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to create a draft",
        description: error.message,
      });
    }
    if (result) {
      router.push(`/create?id=${result.id}`);
    }
  };

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const loaders = Array.from({ length: 4 }, (_, index) => (
    <Loader key={index} className="shrink-0" />
  ));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Start with Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`snap-mandatory snap-x ${ITEM_HEIGHT} overflow-x-auto space-x-4 flex md:snap-none md:h-auto md:space-x-0 md:grid md:grid-cols-4 md:gap-4`}
        >
          {isFetching
            ? loaders
            : data.map((ele, idx) => {
                const fontClasses = getFontClasses(ele.font_family as FontType);
                return (
                  <ContentItem
                    key={ele.id}
                    className={`snap-center shrink-0 ${fontClasses}`}
                    contentId={ele.id}
                    type="button"
                    title={ele?.name}
                    onClick={(e) =>
                      !isGlobalLoading.isActive &&
                      handleCreateWithTemplate(e, ele)
                    }
                    backgroundColor={ele.background_color}
                    themeColor={ele.theme_color}
                  >
                    <ContentSideButton
                      type="link"
                      href={`/my/templates/${ele.id}`}
                      onClickLink={(e) => handleClickLink(e)}
                    >
                      <ExternalLinkIcon />
                    </ContentSideButton>
                  </ContentItem>
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
}

function Loader({ className = "" }: { className?: string }) {
  return <Skeleton className={`w-full h-40 rounded-md ${className}`} />;
}
