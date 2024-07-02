import React from "react";
import { Input, InputProps } from "../ui/input";

const ProductionInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { themeColor: string }
>(({ themeColor, className = "", children, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      style={{
        backgroundColor: "transparent",
        borderColor: themeColor,
        color: themeColor,
      }}
      className={`bg-transparent outline-none ${className}`}
      {...props}
    />
  );
});
ProductionInput.displayName = "ProductionInput";
export { ProductionInput };
