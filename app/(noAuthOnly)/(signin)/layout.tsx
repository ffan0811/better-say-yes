import { headers, cookies } from "next/headers";
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
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils/link";

export default async function SignInLayout({
  searchParams,
  children,
}: {
  searchParams: { message: string };
  children: ReactNode;
}) {
  const t = await getTranslations("auth");
  const locale = (await getLocale()) as "en" | "ko";

  // Get the error message as a string before passing to server action
  const errorMessage = t("couldNotAuthenticate");

  const signIn = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    const supabase = createClient();

    // Get locale from cookie
    const cookieStore = cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const currentLocale = (localeCookie === "ko" ? "ko" : "en") as "en" | "ko";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      // options: {
      //   emailRedirectTo: `${origin}/welcome`,
      // },
    });

    if (error) {
      // Use the error message directly - can't use translation function in server action
      return redirect(
        `${getLocalizedPath(
          "/login",
          currentLocale
        )}?message=${encodeURIComponent(
          error.message || "Could not authenticate user"
        )}`
      );
    }

    return redirect(
      `${getLocalizedPath("/verify-request", currentLocale)}?email=${email}`
    );
  };

  return (
    <>
      <ResponsiveWrapper>
        <Card>
          <CardHeader>
            <CardTitle>{t("welcome")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleLogin className="w-full" />
            <Separator className="block my-8" />
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                className="mb-6"
                name="email"
                placeholder={t("emailPlaceholder")}
                required
              />
              <SubmitButton formAction={signIn} className="mb-2">
                {t("continueWithEmail")}
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
