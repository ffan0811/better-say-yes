import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { locales, type Locale } from './i18n';
import { createServerClient, type CookieOptions } from "@supabase/ssr";

async function getUserLocale(request: NextRequest): Promise<Locale | null> {
  // First, check cookie preference (works for both logged-in and non-logged-in users)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  
  // Then, check user's Supabase preference (for logged-in users)
  try {
    const supabase = createServerClient(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_HOST!}`,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set() {},
          remove() {},
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.user_metadata?.locale) {
      const locale = user.user_metadata.locale as Locale;
      if (locales.includes(locale)) {
        return locale;
      }
    }
  } catch (error) {
    // Silently fail - will use default locale
  }
  
  return null;
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true, // Enable detection - it should work with 'as-needed' for default locale
  alternateLinks: false
});

export async function middleware(request: NextRequest) {
  // Skip locale processing for POST requests (server actions) and API routes
  // POST requests are typically server actions or form submissions that shouldn't be redirected
  if (request.method === 'POST' || request.nextUrl.pathname.startsWith('/api')) {
    // Just handle Supabase session for server actions/API routes
    const supabaseResponse = await updateSession(request);
    const response = NextResponse.next();
    
    // Merge Supabase cookies
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    
    return response;
  }
  
  // Handle Supabase session first
  const supabaseResponse = await updateSession(request);
  
  // Check if user has a locale preference (from cookie or Supabase)
  const preferredLocale = await getUserLocale(request);
  
  // If user has a locale preference and it's not in the URL, redirect to preferred locale
  if (preferredLocale) {
    const pathname = request.nextUrl.pathname;
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    // Only redirect if locale is not in URL and it's not the default locale (for 'as-needed' strategy)
    // For default locale 'en', we don't redirect since URLs without prefix are valid
    if (!pathnameHasLocale && preferredLocale !== 'en' && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
      newUrl.search = request.nextUrl.search;
      // Merge Supabase cookies into redirect response
      const redirectResponse = NextResponse.redirect(newUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
      });
      // Ensure the locale cookie is set with longer expiration
      redirectResponse.cookies.set('NEXT_LOCALE', preferredLocale, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
      return redirectResponse;
    }
  }
  
  // Check if path has a locale prefix
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  let response: NextResponse;
  let detectedLocale: Locale = 'en';
  
  // If path has locale prefix, extract it and strip it from the path
  if (pathnameHasLocale) {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (locales.includes(firstSegment as Locale)) {
      detectedLocale = firstSegment as Locale;
      // Strip the locale from the path for routing
      const pathWithoutLocale = '/' + segments.slice(1).join('/') || '/';
      
      // Rewrite the URL to strip the locale prefix and route to the underlying path
      // This allows /ko/showcase to route to /showcase with Korean locale
      // We need to preserve the locale in the URL for next-intl to detect it
      const rewriteUrl = new URL(pathWithoutLocale, request.url);
      rewriteUrl.search = request.nextUrl.search;
      
      // Add the locale as a query parameter so next-intl can detect it
      // This is a workaround since we're doing custom rewrites
      rewriteUrl.searchParams.set('locale', detectedLocale);
      
      response = NextResponse.rewrite(rewriteUrl);
      
      // Set the locale cookie and header for next-intl with longer expiration
      response.cookies.set('NEXT_LOCALE', detectedLocale, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year - persist across sessions
      });
      response.headers.set('x-next-intl-locale', detectedLocale);
    } else {
      // Invalid locale, use default
      response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', 'en', {
        path: '/',
        sameSite: 'lax',
      });
      response.headers.set('x-next-intl-locale', 'en');
    }
  } else {
    // Path without locale prefix - use default locale 'en' with 'as-needed'
    response = NextResponse.next();
    // Set default locale cookie and header so translations work
    response.cookies.set('NEXT_LOCALE', 'en', {
      path: '/',
      sameSite: 'lax',
    });
    response.headers.set('x-next-intl-locale', 'en');
  }
  
  // Merge headers from Supabase response
  supabaseResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  // Merge cookies from Supabase response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie);
  });
  
  // Set locale cookie and header if user has preference (for next-intl to use)
  // This ensures the preference persists even if not in URL
  if (preferredLocale) {
    response.cookies.set('NEXT_LOCALE', preferredLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year - persist across sessions
    });
    response.headers.set('x-next-intl-locale', preferredLocale);
  }
  
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
