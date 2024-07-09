import Layout from "@/components/Layout";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

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
