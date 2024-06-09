import Layout from "@/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function NoAuthOnlyLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/dashboard");

  return <Layout hasGap>{children}</Layout>;
}
