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

  return (
    <Layout>
      <div className="container">
        <ProjectsContainer userId={user.id} />
      </div>
    </Layout>
  );
}
