import Footer from "./Footer";
import Navigation from "./Navigation";
import { ReactNode } from "react";

type LayoutProps = {
  hasGap?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Layout({
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
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
