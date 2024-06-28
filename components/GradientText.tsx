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
      className={`text-7xl leading-loose font-black rainbow-text ${className}`}
    >
      {children}
    </p>
  );
}
