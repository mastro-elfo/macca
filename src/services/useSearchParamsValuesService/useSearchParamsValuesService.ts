import { useMemo } from "react";

export function useUsesearchparamsvaluesService(searchParams: URLSearchParams) {
  return useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);
}
