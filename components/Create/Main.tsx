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

export default function CreateMain() {
  const [contents, setContents] = useAtom(contentsAtom);
  return (
    <div>
      <CardHeader>
        <CardTitle>Main Page</CardTitle>
        <CardDescription className="text-inherit dark:text-inherit opacity-70">
          the Main page is where users will face as soon as they visit your
          website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <TextareaWithLabel
          label="Set a question to answer yes or no"
          value={contents.question}
          onChange={(e) =>
            setContents({ ...contents, question: e.target.value })
          }
        />
        <TextareaWithLabel
          label="(Optional) Message after clicking yes button"
          value={contents.alertAfterYes}
          onChange={(e) =>
            setContents({ ...contents, alertAfterYes: e.target.value })
          }
        />
        <InputWithLabel
          label="(Optional) Secret code"
          description="Can access your page only with this secret code"
          value={contents.secretCode}
          onChange={(e) =>
            setContents({ ...contents, secretCode: e.target.value })
          }
        />
      </CardContent>
    </div>
  );
}
