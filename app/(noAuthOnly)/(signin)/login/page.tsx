"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("auth");

  return (
    <>
      <p className="text-center mt-4">
        {t("noAccount")}{" "}
        <Link className="text-white underline" href="/signup">
          {t("createOne")}
        </Link>
      </p>
    </>
  );
}
