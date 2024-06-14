"use client";

import Link from "next/link";
import { ITEM_COMMON_CLASSES } from "./ProjectsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";

export type TemplateType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
};

export default function TemplatesContainer({ data }: { data: TemplateType[] }) {
  const handleCreateWithTemplate = (
    e: React.MouseEvent<HTMLDivElement>,
    templateId: string
  ) => {
    console.log("Div clicked", templateId);
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
          {data.map((ele, idx) => (
            <Item
              key={ele.id}
              data={ele}
              onClick={(e) => handleCreateWithTemplate(e, ele.id)}
              onClickLink={(e) => handleClickLink(e)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Item({
  data,
  onClick,
  onClickLink,
}: {
  data: TemplateType;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickLink: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div
      key={data.id}
      onClick={onClick}
      className={`relative flex flex-col ${ITEM_COMMON_CLASSES}`}
      style={{
        background: data.background_color,
        color: data.theme_color,
        borderColor: data.theme_color,
      }}
    >
      <span className="block"> {data.name || "Draft"}</span>
      {/* <div className="space-x-2 mt-4">
          <Link
            target="_blank"
            href={`/my/templates/${data.id}`}
            className={`${buttonVariants({ variant: "outline" })}`}
          >
            Demo
          </Link>
          <Button>Start</Button>
        </div> */}
      <Link
        href={`/my/templates/${data.id}`}
        target="_blank"
        onClick={onClickLink}
      >
        <ExternalLinkIcon className="w-5 h-5 absolute right-2 top-2" />
      </Link>
    </div>
  );
}
