"use client";
import { useRef } from "react";
import GradientText from "../GradientText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SecondarySection({
  className = "",
}: {
  className?: string;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <div
      ref={container}
      className={`flex items-center justify-center h-full ${className}`}
    >
      <motion.div style={{ scale }}>
        <h2
          className="text-4xl md:text-7xl font-black text-center"
          style={{ lineHeight: 1.3 }}
        >
          Create Personalized Pages and <br className="hidden lg:block" />
          Surprise Your Loved Ones
        </h2>
      </motion.div>
    </div>
  );
}
