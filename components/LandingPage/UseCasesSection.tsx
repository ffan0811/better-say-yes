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
import { CircleArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
      "Want to apologize to your lover in a fun and heartfelt way?\nCreate your BetterSayYes page.\nThere's no way they can say no to such a thoughtful gesture!",
    href: "/showcase",
  },
  {
    title: "Plan the Perfect Family Getaway",
    description:
      "Want to suggest a family trip to a specific destination?\nCreate your BetterSayYes page.\nThey won't be able to say no to your exciting travel plans!",
    href: "/showcase",
  },
  {
    title: "Turn Every No into a Yes",
    description:
      "Want to get a yes from someone in a fun and witty way?\nCreate your BetterSayYes page.\nMake your request with a smile and watch the magic happen!",
    href: "/showcase",
  },
];

export default function UseCasesSection() {
  const container = useRef(null);
  const textContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textContainer,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(textScrollProgress, [0, 0.5], [0.6, 1]);

  return (
    <div ref={container}>
      <div ref={textContainer} className="sticky top-[20vh]">
        <motion.div style={{ scale }}>
          <GradientText className="">
            The Best Way to <br className="lg:hidden" />
            Get a 'Yes'
          </GradientText>
        </motion.div>
      </div>

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
  href,
  index,
  progress,
  range,
  targetScale,
}: {
  title: string;
  description: string;
  href: string;
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
    [0, 0.8],
    [index % 2 === 0 ? 5 : -5, 0],
    { ease: easeIn }
  );

  return (
    <div
      ref={container}
      className="h-screen flex justify-center items-center sticky top-24 md:top-20"
    >
      <motion.div
        className="relative p-6 rounded-2.5xl max-w-[95%] md:max-w-[80%]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(255,0,229,0.1), rgba(62,244,58,0.1), rgba(250,255,0, 0.1), rgba(0,102,255,0.1))",
          // opacity: scrollYProgress,
          top: `calc(-5vh + ${index * 25}px)`,
          scale,
          rotate,
        }}
      >
        <Link
          href={href}
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="rounded-2.5xl md:p-10 p-4 xl:p-16 bg-neutral-900 h-full text-center">
            <p className="text-xl md:text-3xl xl:text-4xl font-bold mb-4 flex items-center justify-center">
              <span>{title}</span>
              <CircleArrowRightIcon className="w-7 h-7 ml-2 cursor-pointer" />
            </p>
            <p className="md:text-xl xl:text-2xl text-neutral-300 whitespace-pre-line">
              {description}
            </p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
