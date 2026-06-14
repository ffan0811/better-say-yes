import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils/link";

export default async function AuthButton() {
  const supabase = createClient();
  const t = await getTranslations("common");
  const locale = (await getLocale()) as "en" | "ko";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center space-x-4 text-sm md:text-base text-right">
      <Link href={getLocalizedPath("/dashboard", locale)}>
        {t("welcome")}, {user.user_metadata?.username || user.email || ""}
      </Link>
      {/* <Link
        href={getLocalizedPath("/settings", locale)}
        className={`px-2 ${buttonVariants({
          variant: "outline",
          size: "icon",
        })}`}
      >
        <SettingsIcon />
      </Link> */}
      {/* <SignOutButton /> */}
    </div>
  ) : (
    <Link
      href={getLocalizedPath("/login", locale)}
      className={`${buttonVariants({ variant: "default" })}`}
    >
      {t("getStarted")}
    </Link>
  );
}
