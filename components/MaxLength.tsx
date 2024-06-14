"use client";

import { ReactNode } from "react";

type MaxLengthProps = {
  currentLength: number;
  maxLength: number;
  className?: string;
  children: ReactNode;
};

export default function MaxLength({
  currentLength,
  maxLength,
  className = "",
  children,
}: MaxLengthProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <span className={`absolute bottom-0 right-0`}>
        {currentLength}/{maxLength}
      </span>
    </div>
  );
}
