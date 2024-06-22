import ProjectsContainer from "@/components/ProjectsContainer";
import Layout from "@/components/Layout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data, error } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  return (
    <Layout>
      <div className="container">
        <ProjectsContainer user={{ id: user.id, role: data.role || [] }} />
      </div>
    </Layout>
  );
}
