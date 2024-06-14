"use client";

import Link from "next/link";
import { ITEM_COMMON_CLASSES } from "./ProjectsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { useFont } from "./font-provider";
import { FontType } from "@/types/font";

export type TemplateType = {
  id: string;
  background_color: string;
  font_family: string;
  theme_color: string;
  name: string;
};

export default function TemplatesContainer({ data }: { data: TemplateType[] }) {
  const { getFontClasses } = useFont();

  const handleCreateWithTemplate = (
    e: React.MouseEvent<HTMLDivElement>,
    templateId: string
  ) => {
    console.log("Div clicked", data);
  };

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Start with Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {data.map((ele, idx) => {
            const fontClasses = getFontClasses(ele.font_family as FontType);
            return (
              <Item
                key={ele.id}
                className={fontClasses}
                data={ele}
                onClick={(e) => handleCreateWithTemplate(e, ele.id)}
                onClickLink={(e) => handleClickLink(e)}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function Item({
  data,
  className = "",
  onClick,
  onClickLink,
}: {
  data: TemplateType;
  className: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickLink: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div
      key={data.id}
      onClick={onClick}
      className={`relative flex flex-col group ${className} ${ITEM_COMMON_CLASSES}`}
      style={{
        background: data.background_color,
        color: data.theme_color,
        borderColor: data.theme_color,
      }}
    >
      <span className="block"> {data.name || "Draft"}</span>
      <Link
        href={`/my/templates/${data.id}`}
        target="_blank"
        onClick={onClickLink}
        className="hidden group-hover:block"
      >
        <ExternalLinkIcon className="w-6 h-6 absolute right-3 top-3" />
      </Link>
    </div>
  );
}
