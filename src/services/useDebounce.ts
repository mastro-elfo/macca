import { debounce } from "lodash";
import { useEffect } from "react";

export default function useDebounce<TData = any>(
  callback: (arg: TData) => any,
  arg: TData,
  wait?: number
) {
  useEffect(() => {
    const debounced = debounce(callback, wait);
    debounced(arg);
    return debounced.cancel;
  }, [arg]);
}
