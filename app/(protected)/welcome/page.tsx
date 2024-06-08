import AccountForm from "@/components/AccountForm";
import ResponsiveWrapper from "@/components/responsiveWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function WelcomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ResponsiveWrapper>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome, {user?.user_metadata?.full_name || user?.email || ""}
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
  );
}
