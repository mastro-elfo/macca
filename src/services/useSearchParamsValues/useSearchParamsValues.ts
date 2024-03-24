import { useMemo } from "react";

export default function useSearchParamsValues(searchParams: URLSearchParams) {
  return useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);
}
