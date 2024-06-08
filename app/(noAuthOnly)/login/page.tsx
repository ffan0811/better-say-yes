import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/welcome`,
      },
    });
    console.log("err", error);

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(
      "/verify-request?message=Check email to continue sign in process"
    );
  };

  return (
    <>
      <div className="container">
        <Link
          href="/"
          className="h-9 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
      </div>
      <div className="-mt-9 flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <Label htmlFor="email">Email</Label>
          <Input
            className="mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <SubmitButton formAction={signIn} className="mb-2">
            Continue with Email
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
