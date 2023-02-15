import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export const useHasBeenviewed = () => {
  const [ref, inView] = useInView();
  const prevInView = useRef(false);
  const hasBeenViewed = prevInView.current || inView;

  useEffect(() => {
    prevInView.current = inView;
  });

  return [hasBeenViewed, ref];
};
