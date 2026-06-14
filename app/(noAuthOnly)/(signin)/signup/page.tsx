"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const t = useTranslations("auth");

  return (
    <>
      <p className="text-center text-neutral-400 text-xs mt-3">
        {t("termsAgreement")}
        <br />
        <Link target="_blank" href="/terms" className="text-white">
          {t("termsOfUse")}
        </Link>{" "}
        {t("and")}{" "}
        <Link target="_blank" href="/privacy" className="text-white">
          {t("privacyPolicy")}
        </Link>
      </p>
      <p className="text-center mt-4">
        {t("alreadyHaveAccount")}{" "}
        <Link className="text-white underline" href="/login">
          {t("logIn")}
        </Link>
      </p>
    </>
  );
}
