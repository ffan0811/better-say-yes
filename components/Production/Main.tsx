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
import { answerNoLists } from "@/constants/message";
import { Button } from "../ui/button";
import { getRandomElementInArray } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ProductionMain({
  question,
  alertAfterYes,
  isPreview,
}: {
  question: string;
  alertAfterYes?: string;
  isPreview?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const data = getRandomElementInArray(answerNoLists);
    setMsg(data);
  }, [open]);

  const handleYes = () => {
    if (alertAfterYes) {
      alert(alertAfterYes);
    }
    if (!isPreview) {
      // routing
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="space-y-4">
        <p className="text-3xl text-center break-words mb-8 whitespace-pre">
          {question}
        </p>
        <div className="flex space-x-4 justify-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <Button
              variant="outline"
              className="min-w-40"
              onClick={() => {
                setOpen(true);
              }}
            >
              No
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hmm,,,</AlertDialogTitle>
                <AlertDialogDescription>{msg}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Okay...</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleYes} className="min-w-40">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
