import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form>
      <SubmitButton
        formAction={signOut}
        variant="outline"
        size="icon"
        type="submit"
        className="px-2"
        theme="light"
      >
        <LogOutIcon />
      </SubmitButton>
    </form>
  );
}
