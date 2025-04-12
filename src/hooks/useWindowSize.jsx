import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
  
      return window.removeEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
  }, []);

  return windowSize;
}
