import AccountForm from "@/components/AccountForm";
import Layout from "@/components/Layout";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils/link";

export default async function WelcomePage() {
  const supabase = createClient();
  const locale = (await getLocale()) as "en" | "ko";
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect(getLocalizedPath("/", locale));

  return (
    <Layout hasGap>
      <ResponsiveWrapper>
        <Card>
          <CardHeader>
            <CardTitle>
              Welcome, {user?.user_metadata?.username || user?.email || ""}
            </CardTitle>
            <CardDescription>
              Tell us a bit about yourself for a better experience on our
              platform!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm user={user} />
          </CardContent>
        </Card>
      </ResponsiveWrapper>
    </Layout>
  );
}
