"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { useColor } from "../color-provider";
import Link from "next/link";

const DefaultLink = React.forwardRef<
  HTMLAnchorElement,
  { className?: string; href: string; target: string; children: ReactNode }
>(({ className, href, children, ...props }, ref) => {
  const { themeColor, contrastingColor } = useColor();

  return (
    <Link
      ref={ref}
      href={href}
      className={`${buttonVariants({ variant: "default" })} ${className}`}
      style={{ backgroundColor: themeColor, color: contrastingColor }}
      {...props}
    >
      {children}
    </Link>
  );
});
DefaultLink.displayName = "DefaultLink";

const DefaultButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { themeColor, contrastingColor } = useColor();

    return (
      <Button
        ref={ref}
        style={{ backgroundColor: themeColor, color: contrastingColor }}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
DefaultButton.displayName = "DefaultButton";

const OutlineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { themeColor } = useColor();

    return (
      <Button
        ref={ref}
        style={{ borderColor: themeColor }}
        className={className}
        variant="outline"
        {...props}
      >
        {children}
      </Button>
    );
  }
);
OutlineButton.displayName = "OutlineButton";

export { DefaultLink, DefaultButton, OutlineButton };
