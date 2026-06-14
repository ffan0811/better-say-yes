import ContentItem from "@/components/ContentItem";
import Layout from "@/components/Layout";
import ProductionProviders from "@/components/ProductionProviders";
import { EXTERNAL_SHOWCASE_SUBMISSION_FORM } from "@/constants";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

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
      <h2 className="sr-only">
        Ready to show off your creative personalized pages and inspire others?
        Submit your site to our Showcase today!
      </h2>
      <Link
        href={EXTERNAL_SHOWCASE_SUBMISSION_FORM}
        target="_blank"
        className="bg-white hover:bg-white/80 transition-colors w-full text-center py-6 px-4"
      >
        <p className="text-neutral-900 md:text-xl">
          Ready to show off your creativity? <br className="md:hidden" />
          Submit your site to our Showcase today!
        </p>
      </Link>
      <div className="container space-y-8 py-20">
        {/* <TemplatesContainer data={data} isFetching={false} isShowcase />
        <ShowcaseContainer /> */}
        <ProductionProviders>
          <div className="px-4 grid md:grid-cols-3 gap-4 md:px-0">
            {data.map((ele, idx) => (
              <div key={ele.id}>
                <ContentItem
                  backgroundColor={ele.background_color}
                  themeColor={ele.theme_color}
                  fontFamily={ele.font_family}
                  type="link"
                  title={ele?.name || `Draft ${idx}`}
                  href={`/my/templates/${ele.id}`}
                  target="_blank"
                />
                <div className="text-right mt-1">
                  <p className="text-neutral-200 md:truncate">
                    {ele.question}
                  </p>
                  <p className="text-sm text-neutral-400">BetterSayYes</p>
                </div>
              </div>
            ))}
          </div>
        </ProductionProviders>
      </div>
    </Layout>
  );
}
