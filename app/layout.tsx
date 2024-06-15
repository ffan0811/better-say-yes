import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import SessionProvider from "@/components/session-provider";
import { FontProvider } from "@/components/font-provider";
import { ColorProvider } from "@/components/color-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProgressBarProvider from "@/components/progress-bar-provider";
import { GlobalLoaderProvider } from "@/components/global-loader-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Your Fun, Personalized Decision-Making Page",
  description:
    "You can create and customize fun decision-making pages. Engage with creative questions, interactive yes or no options, and personalized images. Join us for 100% fun and success in every decision!",
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
    </html>
  );
}
