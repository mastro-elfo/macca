import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function useIntersection(query: UseInfiniteQueryResult) {
  const intersection = useInView();
  const { inView } = intersection;
  const { fetchNextPage } = query;
  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return intersection;
}
