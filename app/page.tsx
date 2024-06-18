import Layout from "@/components/Layout";
import ImageRotator from "@/components/ImageRotator";

export default async function Index() {
  return (
    <Layout navigationClassName="absolute top-0 w-full">
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex items-center flex-col w-full h-full justify-center  md:flex-row text-7xl 2xl:text-9xl font-bold md:space-x-12">
          <span>100%</span>
          <div className="">
            <ImageRotator />
          </div>
          <span>100%</span>
          <span>fun</span>
        </div>
      </section>
      <main className="flex-1 flex flex-col w-full h-full">
        <section>hello</section>
      </main>
    </Layout>
  );
}
