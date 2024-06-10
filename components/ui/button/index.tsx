"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { useColor } from "../../color-provider";

import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useColorPicker } from "react-best-gradient-color-picker";
import { buttonVariants } from "./utils";

export const styles = (
  variant: string,
  buttonColor: string,
  backgroundColor?: string
) => {
  switch (variant) {
    case "default":
      return { backgroundColor: buttonColor, color: backgroundColor };
    case "outline":
      return {
        borderColor: buttonColor,
        backgroundColor: "transparent",
        color: buttonColor,
      };
    default:
      return {};
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      isLoading,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const { buttonColor, backgroundColor, setBackgroundColor } = useColor();
    const { valueToHex } = useColorPicker(backgroundColor, setBackgroundColor);
    const Comp = asChild ? Slot : "button";
    const bgColorHex = valueToHex();
    const buttonStyles = styles(variant, buttonColor, bgColorHex);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        style={buttonStyles}
        {...props}
      >
        {isLoading ? <Spinner color="stroke-neutral-900" /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
