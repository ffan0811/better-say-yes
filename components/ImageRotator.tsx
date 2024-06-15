"use client";
import React, { useState, useEffect } from "react";

const images = [
  "./images/1.svg",
  "./images/2.svg",
  "./images/3.svg",
  "./images/4.svg",
  "./images/5.svg",
  "./images/6.svg",
];

export default function ImageRotator({ className }: { className?: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500); // Change image every 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={images[currentImageIndex]}
      alt="Rotating images"
      className="w-32 h-32"
    />
  );
}
