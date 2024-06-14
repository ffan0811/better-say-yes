import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { SubmitButton } from "./submit-button";

export default function SignOutButton() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form>
      <SubmitButton formAction={signOut} type="submit" className="px-2">
        <LogOutIcon />
      </SubmitButton>
    </form>
  );
}
