import Layout from "@/components/Layout";
import ImageRotator from "@/components/ImageRotator";
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
import { DESCRIPTION } from "./shared-metadata";
import UseCasesSection from "@/components/LandingPage/UseCasesSection";
import SmoothScroll from "@/components/SmoothScroll";
import TrySection from "@/components/LandingPage/TrySection";
import CTASection from "@/components/LandingPage/CTASection";

export default function Index() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) return redirect("/dashboard");

  return (
    <SmoothScroll>
      <Layout navigationClassName="absolute top-0 w-full">
        <section className="w-full h-screen flex justify-center items-center">
          <h2 className="sr-only">{DESCRIPTION}</h2>
          <div className="flex items-center flex-col w-full h-full justify-center  md:flex-row text-7xl 2xl:text-9xl font-bold md:space-x-12">
            <span>100%</span>
            <div className="">
              <ImageRotator />
            </div>
            <span>100%</span>
            <span>fun</span>
          </div>
        </section>
        <section className="">
          {/* <SecondarySection /> */}
          <UseCasesSection />
        </section>
        <section className="w-full h-full mb-32">
          <TrySection />
        </section>
        <CTASection className="w-full h-screen flex flex-col items-center justify-center" />
      </Layout>
    </SmoothScroll>
  );
}
