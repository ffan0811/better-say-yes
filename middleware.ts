import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function mergeSupabaseCookies(response: NextResponse, supabaseResponse: NextResponse) {
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie);
  });
}

export async function middleware(request: NextRequest) {
  if (request.method === 'POST' || request.nextUrl.pathname.startsWith('/api')) {
    const supabaseResponse = await updateSession(request);
    const response = NextResponse.next();
    mergeSupabaseCookies(response, supabaseResponse);
    
    return response;
  }
  
  const supabaseResponse = await updateSession(request);
  const response = NextResponse.next();
  mergeSupabaseCookies(response, supabaseResponse);
  
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/welcome/:path*",
    "/create/:path*",
    "/payment/:path*",
    "/my/preview/:path*",
    "/login",
    "/signup",
    "/verify-request",
    "/auth/callback",
    "/ko/:path*",
    "/ko",
  ],
};
