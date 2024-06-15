"use client";

import { useFormStatus } from "react-dom";
import { forwardRef, type ComponentProps } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

type Props = ComponentProps<"button"> & ButtonProps;

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
      <Button
        {...props}
        ref={ref}
        type="submit"
        aria-disabled={isPending}
        isLoading={isPending}
      >
        {children}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";
