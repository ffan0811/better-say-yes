import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import SessionProvider from "@/components/session-provider";
import { FontProvider } from "@/components/font-provider";
import { ColorProvider } from "@/components/color-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProgressBarProvider from "@/components/progress-bar-provider";
import { GlobalLoaderProvider } from "@/components/global-loader-provider";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

const SHORT_TITLE = "BetterSayYes";
const TITLE = "BetterSayYes: Your Fun, Personalized Decision-Making Page";
const DESCRIPTION =
  "Create and customize fun decision-making pages. Engage with creative questions, interactive yes or no options, and personalized images. Join us for 100% fun and success in every decision!";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SHORT_TITLE,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: SHORT_TITLE,
    locale: "en_US",
    type: "website",
    url: defaultUrl,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <ProgressBarProvider>
          <SessionProvider>
            <ColorProvider>
              <FontProvider>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  <GlobalLoaderProvider>
                    <TooltipProvider delayDuration={100}>
                      {children}
                    </TooltipProvider>
                    <Toaster />
                  </GlobalLoaderProvider>
                </ThemeProvider>
              </FontProvider>
            </ColorProvider>
          </SessionProvider>
        </ProgressBarProvider>
      </body>
      <GoogleAnalytics gaId="G-7THTQS3FPJ" />
    </html>
  );
}
