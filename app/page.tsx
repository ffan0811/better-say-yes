import Layout from "@/components/Layout";
import ImageRotator from "@/components/ImageRotator";

export default async function Index() {
  return (
    <Layout>
      <main className="flex-1 flex flex-col">
        <section className="h-screen absolute w-full left-0 top-0 flex justify-center items-center -z-[1]">
          <div className="flex items-center text-7xl 2xl:text-9xl font-bold space-x-12">
            <span>100%</span>
            <div className="">
              <ImageRotator />
            </div>
            <span>100%</span>
            <span>fun</span>
          </div>
        </section>
        <section></section>
      </main>
    </Layout>
  );
}
