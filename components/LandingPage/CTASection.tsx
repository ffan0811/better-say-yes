"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { DefaultLink } from "../Production/Button";
import MainContents, {
  ANSWER_BUTTON_COMMON_CLASSES,
} from "../Production/MainContents";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedPath } from "@/lib/utils/link";

export default function CTASection({ className = "" }: { className: string }) {
  const t = useTranslations("landing.cta");
  const locale = useLocale() as "en" | "ko";
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  return (
    <section className={`${className} `}>
      <div
        ref={container}
        className="overflow-x-hidden absolute w-full h-full opacity-10 text-[18vw] font-black tracking-tighter flex items-center justify-evenly flex-col"
        style={{ zIndex: -1 }}
      >
        <Slider left="25%" progress={scrollYProgress} direction="left" />
        <Slider left="-25%" progress={scrollYProgress} direction="right" />
      </div>
      <MainContents
        title={<p className="text-6xl font-bold">{t("title")}</p>}
        themeColor="rgb(255,255,255)"
      >
        <DefaultLink
          themeColor="rgb(255,255,255)"
          href={getLocalizedPath("/login", locale)}
          className={ANSWER_BUTTON_COMMON_CLASSES}
        >
          {t("button")}
        </DefaultLink>
      </MainContents>
    </section>
  );
}

function Slider({
  left,
  progress,
  direction,
}: {
  left: string;
  progress: MotionValue<number>;
  direction: "left" | "right";
}) {
  const dir = direction === "left" ? -1 : 1;
  const x = useTransform(progress, [0, 1], [-250 * dir, 250 * dir]);
  return (
    <motion.div style={{ left, x }} className="relative flex whitespace-nowrap">
      <span>BetterSayYes</span>
      <span>BetterSayYes</span>
      <span>BetterSayYes</span>
    </motion.div>
  );
}
