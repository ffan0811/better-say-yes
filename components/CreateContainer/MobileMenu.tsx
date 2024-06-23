import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import MenuContent from "./MenuContent";

export default function MobileMenu({ contentId }: { contentId: string }) {
  return (
    <Dialog>
      <DialogTrigger className="fixed left-4 bottom-4 md:hidden" asChild>
        <Button size="icon">
          <MenuIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-theme(space.8))] max-w-[calc(100%-theme(space.8))]">
        <MenuContent className="overflow-y-auto h-5/6" contentId={contentId} />
      </DialogContent>
    </Dialog>
  );
}
