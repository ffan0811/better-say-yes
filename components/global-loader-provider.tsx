"use client";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { globalLoaderAtom } from "@/atoms/global";
import LoaderEntirePage from "./loaderEntirePage";
import { useEffect } from "react";

export function GlobalLoaderProvider({ children }) {
  const [isGlobalLoading, setIsGlobalLoading] = useAtom(globalLoaderAtom);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/create") {
      setIsGlobalLoading({ isActive: false, message: "" });
    }
  }, [pathname]);

  return (
    <>
      {isGlobalLoading.isActive && (
        <LoaderEntirePage text={isGlobalLoading.message} />
      )}
      {children}
    </>
  );
}
