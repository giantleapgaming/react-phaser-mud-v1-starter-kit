import { useEffect, useState } from "react";

export const useRenderSecond = () => {
  const [second, setSecond] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return { second };
};
