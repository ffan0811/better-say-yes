import Layout from "@/components/Layout";
import ShowcaseContainer from "@/components/ShowcaseContainer";
import TemplatesContainer from "@/components/TemplatesContainer";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ShowcasePage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select(
      "id, background_color, font_family, theme_color, name, created_at, updated_at"
    )
    .eq("status", "active")
    .order("updated_at", { ascending: false });

  return (
    <Layout>
      <Link
        href="/"
        target="_blank"
        className="bg-white hover:bg-white/80 transition-colors w-full text-center py-6 px-4 mb-8"
      >
        <p className="text-neutral-900 md:text-xl">
          Ready to show off your creativity? <br className="md:hidden" />
          Submit your site to our Showcase today!
        </p>
      </Link>
      <div className="container space-y-8">
        <TemplatesContainer data={data} isFetching={false} isShowcase />
        <ShowcaseContainer />
      </div>
    </Layout>
  );
}
