"use client";

import Link from "next/link";
import { ITEM_COMMON_CLASSES } from "./ProjectsContainer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type ActiveType = {
  id: string;
  background_color: string;
  theme_color: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function ActiveContainer({ data }: { data: ActiveType[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Active</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {data.map((ele, idx) => (
            <Link
              key={ele.id}
              href={`/create?id=${ele.id}`}
              className={ITEM_COMMON_CLASSES}
              style={{
                background: ele?.background_color,
                color: ele?.theme_color,
                borderColor: ele?.theme_color,
              }}
            >
              {ele.name || `Draft ${idx}`}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
