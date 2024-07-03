import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
import GoogleLogin from "@/components/GoogleLogin";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "@/components/SubmitButton";
import { ReactNode } from "react";

export default function SignInLayout({
  searchParams,
  children,
}: {
  searchParams: { message: string };
  children: ReactNode;
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
              Make some fun moments with your people with us
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleLogin className="w-full" />
            <Separator className="block my-8" />
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
            {children}
          </CardContent>
        </Card>
      </ResponsiveWrapper>
    </>
  );
}
