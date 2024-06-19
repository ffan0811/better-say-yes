"use client";

import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="container px-4 mx-auto">
      {contents.map((ele) => (
        <Item title={ele.title} description={ele.description} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </section>
  );
}

function Item({ title, description }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <div className="h-1/2 w-8/12 mx-auto">
      <Card ref={ref}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description} </p>
        </CardContent>
      </Card>
      <motion.h2 style={{ y }}>{`#00${title}`}</motion.h2>
    </div>
  );
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
