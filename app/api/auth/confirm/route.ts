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

  // for google
  const provider = requestUrl.searchParams.get("provider");
  const code = requestUrl.searchParams.get("code");

  const supabase = createClient();

  if (provider === "google" && code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  if (tokenHash && type) {
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

  if (type === "signup" || provider === "google") {
    console.log("heh?");
    return NextResponse.redirect(`${origin}/welcome`);
  } else {
    console.log("poo");
    return NextResponse.redirect(`${origin}/dashboard`);
  }
}
