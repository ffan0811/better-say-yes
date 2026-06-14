"use client";
import { useRef } from "react";
import GradientText from "../GradientText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function SecondarySection({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations('landing.secondary');
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <div
      ref={container}
      className={`flex items-center justify-center h-full px-2 md:px-0 ${className}`}
    >
      <motion.div style={{ scale }}>
        <h2
          className="text-4xl md:text-7xl font-black text-center"
          style={{ lineHeight: 1.3 }}
        >
          {t('title')}
        </h2>
      </motion.div>
    </div>
  );
}
