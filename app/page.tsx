import Layout from "@/components/Layout";
import ImageRotator from "@/components/ImageRotator";
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
import { DESCRIPTION } from "./shared-metadata";

export default async function Index() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) return redirect("/dashboard");

  return (
    <Layout navigationClassName="absolute top-0 w-full">
      <section className=" w-full h-screen flex justify-center items-center">
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
      {/* <main className="flex-1 flex flex-col w-full h-full">
        <section className="h-screen flex item justify-center flex-col">
          <MainContents
            title={
              <p className={QUESTION_COMMON_CLASSES}>
                Are you ready to turn every NO into a YES
              </p>
            }
            themeColor="rgb(255, 255, 255)"
          >
            <DefaultLink
              href={`/dashboard`}
              themeColor="rgb(255, 255, 255)"
              className="min-w-40"
            >
              Yes
            </DefaultLink>
          </MainContents>
        </section>
      </main> */}
    </Layout>
  );
}
