"use client";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";

export default function VerifyRequestPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const email = searchParams.email || "";
  const { toast } = useToast();

  const handleResend = async () => {
    setIsLoading(true);
    if (!email) {
      toast({
        description: "We cannot find your email information. Please try again.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        // options: {
        //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/welcome`,
        // },
      });

      if (error) {
        throw new Error();
      }
      toast({
        description: "We've successfully sent you another email!",
      });
    } catch (error) {
      toast({
        description: "We couldn't send an email again. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ResponsiveWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We&apos;ve just sent an email to{" "}
            <span className="text-primary">{email}</span> to help you sign in.
          </p>
          <p className="text-neutral-400 text-sm mt-5 block">
            If you haven&apos;t received the email from us, please click{" "}
            <button
              className="text-primary cursor-pointer underline"
              onClick={handleResend}
              disabled={isLoading}
            >
              {isLoading ? "sending..." : "here"}
            </button>{" "}
            to resend.
          </p>
        </CardContent>
      </Card>
    </ResponsiveWrapper>
  );
}
