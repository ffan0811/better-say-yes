"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit2Icon, ExternalLinkIcon } from "lucide-react";
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
import { UserRole } from "@/types/user";
import {
  ERROR_MAX_PROJECTS_REACHED_DESCRIPTION,
  ERROR_MAX_PROJECTS_REACHED_TITLE,
} from "@/constants/message";

export type TemplateType = {
  id: string;
  background_color: string;
  font_family: string;
  theme_color: string;
  name: string;
};

export default function TemplatesContainer({
  data,
  user,
  isFetching,
  isDisabled,
}: {
  data: TemplateType[];
  user: {
    id: string;
    role: string[];
  };
  isFetching: boolean;
  isDisabled: boolean;
}) {
  const { getFontClasses } = useFont();
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateWithTemplate = async (
    e: React.MouseEvent<HTMLDivElement>,
    templateData: TemplateType
  ) => {
    if (isDisabled) {
      toast({
        variant: "destructive",
        title: ERROR_MAX_PROJECTS_REACHED_TITLE,
        description: ERROR_MAX_PROJECTS_REACHED_DESCRIPTION,
      });
      return;
    }
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

  const loaders = Array.from({ length: 6 }, (_, index) => (
    <Loader key={index} className="shrink-0 aspect-video" />
  ));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Start with Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`snap-mandatory snap-x overflow-x-auto space-x-4 flex md:snap-none md:h-auto md:space-x-0 md:grid md:grid-cols-3 md:gap-4`}
        >
          {isFetching
            ? loaders
            : data.map((ele, idx) => {
                const fontClasses = getFontClasses(ele.font_family as FontType);
                return (
                  <ContentItem
                    key={ele.id}
                    className={`snap-center shrink-0 max-w-[260px] md:max-w-none ${fontClasses}`}
                    contentId={ele.id}
                    type="button"
                    href={`/my/templates/${ele.id}`}
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
                      target="_blank"
                      onClickLink={(e) => handleClickLink(e)}
                    >
                      <ExternalLinkIcon />
                    </ContentSideButton>
                    {user.role.includes(UserRole.TEMPLATE_MANAGER) && (
                      <ContentSideButton
                        type="link"
                        href={`/create?id=${ele.id}&isTemplate=true`}
                        onClickLink={(e) => {
                          e.stopPropagation();
                          setIsGlobalLoading({
                            isActive: true,
                            message: "Preparing your page...",
                          });
                        }}
                      >
                        <Edit2Icon />
                      </ContentSideButton>
                    )}
                  </ContentItem>
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
}

function Loader({ className = "" }: { className?: string }) {
  return <Skeleton className={`w-full rounded-md ${className}`} />;
}
