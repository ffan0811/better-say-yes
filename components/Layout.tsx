import Footer from "./Footer";
import Navigation from "./Navigation";
import { ReactNode } from "react";

type LayoutProps = {
  hasGap?: boolean;
  className?: string;
  navigationClassName?: string;
  children: ReactNode;
};

export default function Layout({
  hasGap,
  className = "",
  navigationClassName = "",
  children,
}: LayoutProps) {
  return (
    <main
      className={`min-h-screen flex flex-col items-center ${
        hasGap ? "gap-10" : ""
      } ${className}`}
    >
      <Navigation className={navigationClassName} />
      {children}
      <Footer />
    </main>
  );
}
