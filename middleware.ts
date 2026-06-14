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
  const pathname = request.nextUrl.pathname;

  // Legacy cleanup for old localized URLs.
  if (pathname === "/ko" || pathname.startsWith("/ko/")) {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = `/${segments.slice(1).join('/')}` || "/";
    const redirectUrl = new URL(pathWithoutLocale, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl);
    mergeSupabaseCookies(response, supabaseResponse);

    return response;
  }

  const response = NextResponse.next();
  mergeSupabaseCookies(response, supabaseResponse);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - api routes
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
