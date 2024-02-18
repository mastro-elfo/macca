import { debounce } from "lodash";
import { useEffect } from "react";

export default function useDebounce<TData = unknown, TReturn = unknown>(
  callback: (arg: TData) => TReturn,
  arg: TData,
  wait?: number
) {
  useEffect(() => {
    const debounced = debounce(callback, wait);
    debounced(arg);
    return () => {
      debounced.cancel();
    };
  }, [arg, callback, wait]);
}
