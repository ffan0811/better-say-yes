import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center space-x-4 text-sm md:text-base">
      <Link href="/dashboard">
        Welcome, {user.user_metadata?.username || user.email || ""}
      </Link>
      {/* <Link
        href="/settings"
        className={`px-2 ${buttonVariants({
          variant: "outline",
          size: "icon",
        })}`}
      >
        <SettingsIcon />
      </Link> */}
      {/* <SignOutButton /> */}
    </div>
  ) : (
    <Link href="/login" className={`${buttonVariants({ variant: "default" })}`}>
      Get Started
    </Link>
  );
}
