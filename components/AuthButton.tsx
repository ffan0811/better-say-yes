import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import SignOutButton from "@/components/SignOutButton";
import { SettingsIcon } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex space-x-2">
      <Link
        href="/dashboard"
        className={`${buttonVariants({ variant: "default" })}`}
      >
        Dashboard
      </Link>
      <Link
        href="/settings"
        className={`px-2 ${buttonVariants({
          variant: "outline",
          size: "icon",
        })}`}
      >
        <SettingsIcon />
      </Link>
      {/* <SignOutButton /> */}
    </div>
  ) : (
    <Link href="/login" className={`${buttonVariants({ variant: "default" })}`}>
      Get Started
    </Link>
  );
}
