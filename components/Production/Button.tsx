"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import Link from "next/link";
import { getContrastingColor } from "@/lib/utils";

const DefaultLink = React.forwardRef<
  HTMLAnchorElement,
  {
    themeColor: string;
    className?: string;
    href: string;
    target?: string;
    children: ReactNode;
  }
>(({ themeColor, className, href, children, ...props }, ref) => {
  const contrastingColor = themeColor
    ? getContrastingColor(themeColor)
    : "inherit";

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

const DefaultButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { themeColor: string }
>(({ themeColor, className, children, ...props }, ref) => {
  const contrastingColor = themeColor
    ? getContrastingColor(themeColor)
    : "inherit";

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
});
DefaultButton.displayName = "DefaultButton";

const OutlineButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { themeColor: string }
>(({ themeColor, className, children, ...props }, ref) => {
  // const { themeColor } = useColor();

  return (
    <Button
      ref={ref}
      // style={{ borderColor: themeColor }}
      className={className}
      variant="outline"
      {...props}
    >
      {children}
    </Button>
  );
});
OutlineButton.displayName = "OutlineButton";

export { DefaultLink, DefaultButton, OutlineButton };
