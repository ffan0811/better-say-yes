import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    // <form action={signOut}>
    //   <Button className="">Create</Button>
    // </form>
    <Link
      href="/dashboard"
      className={`${buttonVariants({ variant: "default" })}`}
    >
      Dashboard
    </Link>
  ) : (
    <Link href="/login" className={`${buttonVariants({ variant: "default" })}`}>
      Get Stared
    </Link>
  );
}
