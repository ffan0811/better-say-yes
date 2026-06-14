import ProjectsContainer from "@/components/ProjectsContainer";
import Layout from "@/components/Layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import ProductionProviders from "@/components/ProductionProviders";

export default async function DashboardPage() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  if (!user.user_metadata?.username) return redirect("/welcome");

  const { data, error } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  return (
    <Layout>
      <div className="container">
        <div className="text-right mb-4">
          <Link
            href="/settings"
            className={`flex items-center ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <SettingsIcon className="mr-2 w-5 h-5" />
            Settings
          </Link>
        </div>
        <ProductionProviders>
          <ProjectsContainer user={{ id: user.id, role: data.role || [] }} />
        </ProductionProviders>
      </div>
    </Layout>
  );
}
