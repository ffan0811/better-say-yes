import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  // Currently, We have "signup" for signup and "magiclink" for login.
  const type = requestUrl.searchParams.get("type") as EmailOtpType;
  const origin = process.env.SITE_ORIGIN || requestUrl.origin;
  // const redirectTo = requestUrl.searchParams.get("emailRedirectTo");

  if (tokenHash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  // if (redirectTo) {
  //   return NextResponse.redirect(redirectTo);
  // }

  if (type === "signup") {
    return NextResponse.redirect(`${origin}/welcome`);
  } else {
    return NextResponse.redirect(`${origin}/dashboard`);
  }
}
