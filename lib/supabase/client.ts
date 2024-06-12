import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/database.types";

export const createClient = () =>
  createBrowserClient<Database>(
    `https://${process.env.NEXT_PUBLIC_SUPABASE_HOST!}`,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
