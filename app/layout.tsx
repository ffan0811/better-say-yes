import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import SessionProvider from "@/components/session-provider";
import { FontProvider } from "@/components/font-provider";
import { ColorProvider } from "@/components/color-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <SessionProvider>
          <ColorProvider>
            <FontProvider>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <TooltipProvider delayDuration={100}>
                  {children}
                </TooltipProvider>
                <Toaster />
              </ThemeProvider>
            </FontProvider>
          </ColorProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
