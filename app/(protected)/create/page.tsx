import CreateContainer from "@/components/Create";
import Logo from "@/components/Logo";
import PaymentButton from "@/components/Payment/Button";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div>
      <nav className="fixed z-40 left-0 top-0 flex items-center w-full h-20 bg-neutral-900 py-4">
        <div className="flex justify-between items-center w-full px-5">
          <div className="flex items-center space-x-16">
            <Link href="/">
              <Logo className="h-auto w-20" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <Button>Save</Button>
            <PaymentButton />
          </div>
        </div>
      </nav>
      <Sidebar className="fixed z-40 left-0 top-0 mt-20" />
      <div className="ml-80 mt-20">
        <CreateContainer />
      </div>
    </div>
  );
}
