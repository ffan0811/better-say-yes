"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  easeIn,
  Variants,
} from "framer-motion";
import GradientText from "../GradientText";

const cardVariants: Variants = {
  offscreen: {
    y: -80,
    opacity: 0,
    // scale: 0.8,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    // scale: 1,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};

const contents = [
  {
    title: "Say Sorry in the Sweetest Way",
    description:
      "Want to apologize to your lover in a fun and heartfelt way? Create your custom yes-or-no pages filled with cute images of you two. There's no way they can say no to such a thoughtful gesture!",
  },
  {
    title: "Plan the Perfect Family Getaway",
    description:
      "Want to suggest a family trip to a specific destination? Create yes-or-no pages with stunning images of the destination. They won't be able to say no to your exciting travel plans!",
  },
  {
    title: "Turn Every No into a Yes",
    description:
      "Want to get a yes from someone in a fun and witty way? Create personalized yes-or-no pages that they can't refuse. Make your request with a smile and watch the magic happen!",
  },
];

export default function UseCasesSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container}>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.8 }}
        className="sticky top-[20vh] h-[144px]"
      >
        {/* <div className="splash" style={{ background }} /> */}
        <motion.div variants={cardVariants}>
          <GradientText className="text-center">
            The Best Way to Get a 'Yes'
            {/* Create your own customized pages and surprise your loved ones */}
          </GradientText>
        </motion.div>
      </motion.div>

      {contents.map((ele, i) => {
        const targetScale = 1 - (contents.length - i) * 0.05;
        return (
          <Card
            key={ele.title}
            {...ele}
            index={i}
            progress={scrollYProgress}
            range={[i * (1 / contents.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

function Card({
  title,
  description,
  index,
  progress,
  range,
  targetScale,
}: {
  title: string;
  description: string;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.7],
    [index % 2 === 0 ? 5 : -5, 0],
    { ease: easeIn }
  );

  return (
    <div
      ref={container}
      className="h-screen flex justify-center items-center sticky top-20"
    >
      <motion.div
        className="relative p-6 rounded-2.5xl max-w-[80%]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(255,0,229,0.1), rgba(62,244,58,0.1), rgba(250,255,0, 0.1), rgba(0,102,255,0.1))",
          // opacity: scrollYProgress,
          top: `calc(-5vh + ${index * 25}px)`,
          scale,
          rotate,
        }}
      >
        <div className="rounded-2.5xl md:p-10 xl:p-16 bg-neutral-900 h-full text-center">
          <p className="md:text-2xl xl:text-4xl font-bold mb-4">{title}</p>
          <p className="md:text-lg xl:text-2xl">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}
