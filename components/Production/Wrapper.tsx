"use client";
import { useColor } from "@/components/color-provider";
import { useFont } from "@/components/font-provider";
import { ReactNode } from "react";
import styled from "styled-components";

type ProductionWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function ProductionWrapper({
  className,
  children,
}: ProductionWrapperProps) {
  const { fontClassName } = useFont();
  const { themeColor, backgroundColor } = useColor();

  const StyledDiv = styled.div<{ $themeColor: string }>`
    .btn-default {
      background-color: ${(props) => props.$themeColor || ""};
    }
    .btn-outline {
      border-color: ${(props) => props.$themeColor || ""};
    }
  `;

  return (
    <StyledDiv
      $themeColor={themeColor}
      className={`flex justify-center items-center p-4 ${fontClassName} ${className}`}
      style={{
        background: backgroundColor,
        color: themeColor,
      }}
    >
      {children}
    </StyledDiv>
  );
}
