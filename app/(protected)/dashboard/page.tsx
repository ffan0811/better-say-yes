import Layout from "@/components/Layout";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import { buttonVariants } from "@/components/ui/button/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

  return (
    <Layout>
      <div className="container">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>My Arts</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/create"
              className={buttonVariants({ variant: "default" })}
            >
              Create
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
