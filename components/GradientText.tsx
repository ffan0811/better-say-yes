import { ReactNode } from "react";

type GradientTextProps = {
  className?: string;
  children: ReactNode;
};

export default function GradientText({
  className = "",
  children,
}: GradientTextProps) {
  return (
    <p
      className={`rainbow-text text-4xl md:text-7xl leading-tight font-black text-center ${className}`}
    >
      {children}
    </p>
  );
}
