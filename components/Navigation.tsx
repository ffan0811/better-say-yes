import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils/link";

type NavigationProps = {
  className?: string;
};

export default async function Navigation({ className = "" }: NavigationProps) {
  const t = await getTranslations("navigation");
  const locale = (await getLocale()) as "en" | "ko";

  return (
    <nav className={`container py-8 px-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-16">
          <Link href={getLocalizedPath("/", locale)}>
            <Logo className={`h-auto w-16 md:w-28`} />
          </Link>
          <ul className="flex items-center text-sm space-x-3 md:text-base md:space-x-8">
            <li>
              <Link href={getLocalizedPath("/showcase", locale)}>
                {t("showcase")}
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://www.etsy.com/shop/BetterSayYes"
              >
                {t("shop")}
              </Link>
            </li>
            {/* <li>
              <Link href={getLocalizedPath("/pricing", locale)}>{t('pricing')}</Link>
            </li> */}
          </ul>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
