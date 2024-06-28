"use client";
import GradientText from "../GradientText";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 0,
    opacity: 0,
    // scale: 0.8,
  },
  onscreen: {
    y: -80,
    opacity: 1,
    // scale: 1,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};

export default function SecondarySection() {
  return (
    <div className="mt-[80px]">
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.8 }}
      >
        {/* <div className="splash" style={{ background }} /> */}
        <motion.div variants={cardVariants}>
          <GradientText>The Best Way to Get a 'Yes'</GradientText>
        </motion.div>
      </motion.div>
    </div>
  );
}
