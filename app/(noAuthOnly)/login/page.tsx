import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      // options: {
      //   emailRedirectTo: `${origin}/welcome`,
      // },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(`/verify-request?email=${email}`);
  };

  return (
    <>
      <ResponsiveWrapper>
        <Card>
          <CardHeader>
            <CardTitle>Welcome,</CardTitle>
            <CardDescription>
              We will send you a verification email
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </ResponsiveWrapper>
    </>
  );
}
