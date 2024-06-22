import ContentItem from "@/components/ContentItem";
import Layout from "@/components/Layout";
import { EXTERNAL_SHOWCASE_SUBMISSION_FORM } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ShowcasePage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .select(
      "id, question, background_color, font_family, theme_color, name, created_at, updated_at"
    )
    .eq("status", "active")
    .order("updated_at", { ascending: false });

  return (
    <Layout>
      <Link
        href={EXTERNAL_SHOWCASE_SUBMISSION_FORM}
        target="_blank"
        className="bg-white hover:bg-white/80 transition-colors w-full text-center py-6 px-4 mb-8"
      >
        <p className="text-neutral-900 md:text-xl">
          Ready to show off your creativity? <br className="md:hidden" />
          Submit your site to our Showcase today!
        </p>
      </Link>
      <div className="container space-y-8">
        {/* <TemplatesContainer data={data} isFetching={false} isShowcase />
        <ShowcaseContainer /> */}
        <div className="grid grid-cols-3 gap-4">
          {data.map((ele, idx) => (
            <div>
              <ContentItem
                key={ele.id}
                backgroundColor={ele.background_color}
                themeColor={ele.theme_color}
                type="link"
                title={ele?.name || `Draft ${idx}`}
                href={`/my/templates/${ele.id}`}
                target="_blank"
              />
              <div className="text-right mt-1">
                <p className="text-neutral-200 truncate">
                  Q. {`${ele.question}`}
                </p>
                <p className="text-sm text-neutral-400">BetterSayYes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
