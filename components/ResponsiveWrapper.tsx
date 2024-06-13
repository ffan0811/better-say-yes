import { ReactNode } from "react";

type ResponsiveWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function ResponsiveWrapper({
  className = "",
  children,
}: ResponsiveWrapperProps) {
  return (
    <div className={`w-full md:max-w-lg flex-1 ${className}`}>{children}</div>
  );
}
