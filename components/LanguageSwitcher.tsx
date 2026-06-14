"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { locales, type Locale } from "@/i18n";
import { useTranslations } from "next-intl";
import { getLocaleFromPath } from "@/lib/utils/link";

const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");
  const t = useTranslations("settings.language");

  // Detect locale from actual URL pathname (not the rewritten one) or cookie
  useEffect(() => {
    // Get the actual URL pathname from window.location (includes locale prefix)
    const actualPathname =
      typeof window !== "undefined" ? window.location.pathname : pathname;
    const pathLocale = getLocaleFromPath(actualPathname);

    if (pathLocale) {
      setCurrentLocale(pathLocale);
      return;
    }

    // If not in pathname, check cookie
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as Locale | undefined;

    if (cookieLocale && locales.includes(cookieLocale)) {
      setCurrentLocale(cookieLocale);
    } else {
      setCurrentLocale("en"); // Default
    }
  }, [pathname]);

  const handleLocaleChange = async (newLocale: string) => {
    setIsLoading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Update user's locale preference
        await supabase.auth.updateUser({
          data: {
            locale: newLocale,
          },
        });
      }

      // Get the actual URL pathname (includes locale prefix if present)
      const actualPathname =
        typeof window !== "undefined" ? window.location.pathname : pathname;
      const segments = actualPathname.split("/").filter(Boolean);
      const currentLocaleInPath = segments[0];

      let newPath: string;

      // Check if first segment is a locale
      if (locales.includes(currentLocaleInPath as Locale)) {
        // Replace the locale
        if (newLocale === "en") {
          // Remove locale for default locale with 'as-needed'
          segments.shift();
          newPath = segments.length > 0 ? "/" + segments.join("/") : "/";
        } else {
          segments[0] = newLocale;
          newPath = "/" + segments.join("/");
        }
      } else {
        // No locale in path currently (default 'en')
        if (newLocale === "en") {
          // Keep path as is for default locale
          newPath = actualPathname;
        } else {
          // Add locale at the beginning
          newPath = "/" + [newLocale, ...segments].join("/");
        }
      }

      // Set the locale cookie immediately with 1 year expiration
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; sameSite=lax; max-age=${maxAge}`;

      router.push(newPath);
      router.refresh();
    } catch (error) {
      console.error("Error changing locale:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change language. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      value={currentLocale}
      onValueChange={handleLocaleChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("title")} />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
