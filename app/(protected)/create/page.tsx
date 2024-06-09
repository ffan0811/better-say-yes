import Sidebar from "@/components/Sidebar";
import CreateContainer from "@/components/create";
import { createClient } from "@/utils/supabase/server";
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
      <div className="ml-64 p-8">
        <CreateContainer />
      </div>
    </div>
  );
}
