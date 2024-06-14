import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "./ui/button";
import SignOutButton from "@/components/SignOutButton";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex space-x-4">
      <Link
        href="/dashboard"
        className={`${buttonVariants({ variant: "default" })}`}
      >
        Dashboard
      </Link>
      <SignOutButton />
    </div>
  ) : (
    <Link href="/login" className={`${buttonVariants({ variant: "default" })}`}>
      Get Stared
    </Link>
  );
}
