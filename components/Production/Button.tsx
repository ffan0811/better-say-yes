"use client";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useColor } from "../color-provider";

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

export { DefaultButton, OutlineButton };
