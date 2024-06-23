import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient as createClientServer } from "@/lib/supabase/server";
import EmailSubscriptionContainer from "@/components/Settings/EmailSubscriptionContainer";
import DeleteAccountContainer from "@/components/Settings/DeleteAccountContainer";
import { Label } from "@/components/ui/label";
import SignOutButton from "@/components/SignOutButton";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const supabase = createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Layout hasGap>
      <div className="container px-4 md:px-0 space-y-8">
        <div className="flex items-center space-x-4">
          <p className="text-3xl font-medium tracking-tight">
            Welcome, {user.user_metadata?.username || user.email}{" "}
          </p>
          <SignOutButton />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              Email Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Marketing emails</Label>
                <CardDescription>
                  Receive emails about promotion codes, new features, and more.
                </CardDescription>
              </div>{" "}
              <EmailSubscriptionContainer
                isSubscribed={user.user_metadata?.is_email_subscribed}
              />
            </div>
          </CardContent>
        </Card>
        <DeleteAccountContainer
          userId={user.id}
          errorMessage={searchParams.message}
        />
      </div>
    </Layout>
  );
}
