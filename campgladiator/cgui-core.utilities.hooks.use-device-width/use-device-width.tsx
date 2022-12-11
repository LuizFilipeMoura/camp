import { useState, useEffect } from "react";

const useDeviceWidth = () => {
  let initialWidth : number

  try {
    // During SSR on Next.js, the `window` is not defined,
    // which throws an error.
    // Should not affect traditional React applications
    initialWidth = window.innerWidth
  } catch (_) {
    initialWidth = 0
  }

  const [deviceWidth, setDeviceWidth] = useState(initialWidth);
  useEffect(() => {
    const handleViewportResize = () => setDeviceWidth(window.innerWidth);

    window.addEventListener("resize", handleViewportResize);
    return () => {
      window.removeEventListener("resize", handleViewportResize);
    };
  });
  return deviceWidth;
};

export default useDeviceWidth;
