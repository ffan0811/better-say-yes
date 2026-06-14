import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProgressBarProvider from "@/components/progress-bar-provider";
import { GlobalLoaderProvider } from "@/components/global-loader-provider";
import {
  DESCRIPTION,
  SHORT_TITLE,
  TITLE,
  defaultUrl,
  openGraphDefault,
} from "./shared-metadata";
import CookieSetting from "@/components/CookieSetting";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SHORT_TITLE,
  openGraph: {
    ...openGraphDefault,
    url: "/",
  },
  referrer: "no-referrer",
  keywords: ["BetterSayYes", "custom pages", "fun events", "fun projects"],
  icons: [
    { url: "/images/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/images/apple-icon.png", sizes: "180x180", type: "image/png" },
    { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load messages for the current locale
  let messages = {};
  try {
    const locale = await getLocale();
    messages = await getMessages();
  } catch (importError) {
    console.error("Error loading messages:", importError);
    // Fallback to English if there's an error
    try {
      messages = (await import(`../messages/en.json`)).default;
    } catch (fallbackError) {
      console.error("Error loading fallback messages:", fallbackError);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-900 text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ProgressBarProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <GlobalLoaderProvider>
                <TooltipProvider delayDuration={100}>
                  {children}
                  <CookieSetting />
                </TooltipProvider>
                <Toaster />
              </GlobalLoaderProvider>
            </ThemeProvider>
          </ProgressBarProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
