"use client";
import { useColor } from "@/components/color-provider";
import { useFont } from "@/components/font-provider";
import { getContrastingColor } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type ProductionWrapperProps = {
  className?: string;
  children: ReactNode;
};

const StyledDiv = styled.div<{
  $themeColor: string;
  $contrastingColor: string;
}>`
  .btn-default {
    background-color: ${(props) => props.$themeColor || ""};
    color: ${(props) => props.$contrastingColor || ""};
  }
  .btn-outline {
    border-color: ${(props) => props.$themeColor || ""};
  }
`;

export default function ProductionWrapper({
  className,
  children,
}: ProductionWrapperProps) {
  const { fontClassName } = useFont();
  const { contrastingColor, themeColor, backgroundColor } = useColor();

  return (
    <StyledDiv
      $themeColor={themeColor}
      $contrastingColor={contrastingColor}
      className={`flex justify-center p-4 ${fontClassName} ${className}`}
      style={{
        background: backgroundColor,
        color: themeColor,
      }}
    >
      {children}
    </StyledDiv>
  );
}
