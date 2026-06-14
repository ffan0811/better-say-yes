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
import { buttonVariants } from "../ui/button";

export default function UseCasesSection() {
  const contents = [
    {
      title: "Step 1",
      description: "Think of a question you want a 'yes' for.",
      // href: "/showcase",
    },
    {
      title: "Step 2",
      description: "Upload images to share after they say 'yes'.",
      // href: "/showcase",
    },
    {
      title: "Step 3",
      description:
        "Launch your customized page,\nshare it with your loved ones, and make them happy!",
    },
    // {
    //   title: "Check out demos",
    //   href: "/showcase",
    // },
  ];
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
            The Best Way to Get a 'Yes'
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
            isLast={i === contents.length - 1}
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
  isLast,
}: {
  title: string;
  description?: string;
  href?: string;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isLast: boolean;
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
        className=" relative p-6 rounded-2.5xl w-[95%] h-[250px] md:w-[80%] md:h-[300px]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(255,0,229,0.1), rgba(62,244,58,0.1), rgba(250,255,0, 0.1), rgba(0,102,255,0.1))",
          // opacity: scrollYProgress,
          top: `calc(-5vh + ${index * 25}px)`,
          scale,
          rotate,
        }}
      >
        <div className="flex items-center justify-center flex-col rounded-2.5xl md:p-10 p-4 xl:p-16 bg-neutral-900 h-full text-center">
          {href ? (
            <Link
              className="text-xl md:text-3xl xl:text-4xl font-bold flex items-center justify-center"
              href={href}
            >
              <span>{title}</span>
              {href && (
                <CircleArrowRightIcon className="w-7 h-7 ml-2 cursor-pointer" />
              )}
            </Link>
          ) : (
            <p className="text-xl md:text-3xl xl:text-4xl font-bold flex items-center justify-center">
              <span>{title}</span>
            </p>
          )}
          {description && (
            <p className="md:text-xl xl:text-2xl text-neutral-300 whitespace-pre-line mt-4">
              {description}
            </p>
          )}
          {isLast && (
            <Link
              href="/showcase"
              className={`mt-4 md:text-lg md:px-8 md:py-6 ${buttonVariants({
                variant: "default",
              })}`}
            >
              Check out our demos
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
