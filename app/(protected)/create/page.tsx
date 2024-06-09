import Layout from "@/components/Layout";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import Sidebar from "@/components/Sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

  return (
    <div>
      <Sidebar />
      <div className="ml-64 p-8">content</div>
    </div>
  );
}
