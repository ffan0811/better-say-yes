"use client";
import React, { useState, useEffect } from "react";

const images = [
  "./images/yes1.svg",
  "./images/yes2.svg",
  "./images/yes3.svg",
  "./images/yes4.svg",
  "./images/yes5.svg",
  "./images/yes6.svg",
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
