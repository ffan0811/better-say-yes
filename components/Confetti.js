"use client";
import { useState, useEffect } from "react";

import * as ConfettiComp from "react-confetti";

function Confetti() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setHeight(document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
  }, []);

  return <ConfettiComp recycle width={width} height={height} />;
}
export default Confetti;
