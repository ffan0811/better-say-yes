import Layout from "@/components/Layout";
import ImageRotator from "@/components/ImageRotator";
import Logo from "@/components/Logo";

export default async function Index() {
  return (
    <Layout>
      <main className="flex-1 flex flex-col">
        <section className="h-screen absolute w-full left-0 top-0 flex justify-center items-center -z-[1]">
          <div className="flex items-center text-7xl font-bold">
            100%{" "}
            <div className="mx-4">
              <ImageRotator />
            </div>{" "}
            100% fun
          </div>
        </section>
        <section></section>
      </main>
    </Layout>
  );
}
