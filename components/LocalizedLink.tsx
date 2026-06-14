"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, getLocalizedPath } from "@/lib/utils/link";
import { locales, type Locale } from "@/i18n";
import { ReactNode } from "react";

type LocalizedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  [key: string]: any;
};

/**
 * Link component that preserves the locale prefix when navigating
 */
export default function LocalizedLink({
  href,
  children,
  className,
  target,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();
  
  // Get current locale from pathname or default to 'en'
  const currentLocale = getLocaleFromPath(pathname) || 'en';
  
  // Get the localized path
  const localizedHref = getLocalizedPath(href, currentLocale as Locale);
  
  return (
    <Link
      href={localizedHref}
      className={className}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
}

