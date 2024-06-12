// components/DynamicInput.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";

interface DynamicInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const DynamicInput: React.FC<DynamicInputProps> = ({ value, ...props }) => {
  const [inputWidth, setInputWidth] = useState<string>("1ch");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newWidth = `${value.length + 1}ch`; // Add 1 for padding
    setInputWidth(newWidth);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      ref={inputRef}
      style={{ width: inputWidth }}
    />
  );
};

export default DynamicInput;
