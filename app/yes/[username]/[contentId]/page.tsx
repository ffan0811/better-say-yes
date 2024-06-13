import FontWrapper from "@/components/Production/FontWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function ArtDetailsPage({
  params,
}: {
  params: { contentId: string };
}) {
  const supabase = createClient();

  if (!params.contentId) {
    return <p>Incorrect URL</p>;
  }

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", params.contentId)
    .single();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Cannot find data</p>;
  }

  if (data.status !== "active") {
    return <p>Permission denied</p>;
  }

  return <FontWrapper>tme</FontWrapper>;
}
