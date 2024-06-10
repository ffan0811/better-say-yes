import Footer from "./Footer";
import Navigation from "./Navigation";
import { ReactNode } from "react";

type LayoutProps = {
  isNavMinimize?: boolean;
  hasGap?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Layout({
  isNavMinimize,
  hasGap,
  className = "",
  children,
}: LayoutProps) {
  return (
    <main
      className={`min-h-screen flex flex-col items-center ${
        hasGap ? "gap-20" : ""
      } ${className}`}
    >
      <Navigation isMinimize={isNavMinimize} />
      {children}
      <Footer />
    </main>
  );
}
