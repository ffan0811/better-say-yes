"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DefaultButton, OutlineButton } from "./Button";
import { useEffect, useState } from "react";
import { getRandomElementInArray } from "@/lib/utils";
import { answerNoLists } from "@/constants/message";
import { useFont } from "../font-provider";

type NoButtonProps = {
  themeColor: string;
};

export default function NoButton({ themeColor }: NoButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const { fontClassName } = useFont();

  useEffect(() => {
    const data = getRandomElementInArray(answerNoLists);
    setMsg(data);
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <OutlineButton
        themeColor={themeColor}
        variant="outline"
        className="min-w-32 md:min-w-40"
        onClick={() => {
          setOpen(true);
        }}
      >
        No
      </OutlineButton>
      <AlertDialogContent className={fontClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle>Hmm,,,</AlertDialogTitle>
          <AlertDialogDescription>{msg}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <DefaultButton themeColor={themeColor}>Okay...</DefaultButton>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
