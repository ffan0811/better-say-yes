import Layout from "@/components/Layout";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils/link";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function NoAuthOnlyLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const locale = (await getLocale()) as "en" | "ko";
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect(getLocalizedPath("/dashboard", locale));

  return <Layout hasGap>{children}</Layout>;
}
