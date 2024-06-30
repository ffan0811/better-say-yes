import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import MenuContent from "./MenuContent";

export default function MobileMenu({
  contentId,
  className = "",
}: {
  contentId: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className={`md:hidden ${className}`} asChild>
        <Button size="icon">
          <MenuIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ zIndex: 50 }}
        className="max-h-[calc(100vh-theme(space.8))] max-w-[calc(100%-theme(space.4))]"
      >
        <div className="h-[calc(100vh-theme(space.8))] pb-8 overflow-y-auto">
          <MenuContent contentId={contentId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
