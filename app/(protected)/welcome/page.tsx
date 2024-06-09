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

export default async function WelcomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

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
