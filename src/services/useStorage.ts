import { useEffect, useMemo, useState } from "react";

function load<TData = unknown>(
  storage: Storage,
  key: string,
  defaultValue: TData
) {
  try {
    const value = storage.getItem(key);
    if (value) return JSON.parse(value);
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function dump(storage: Storage, key: string, value: unknown) {
  storage.setItem(key, JSON.stringify(value));
}

function useStorage<TData = unknown>(
  storage: Storage,
  key: string,
  defaultValue: TData
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stored = useMemo(() => load<TData>(storage, key, defaultValue), []);
  const state = useState<TData>(stored);
  const [value] = state;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dump(storage, key, value), [value]);
  return state;
}

export function useSessionStorage<TData = unknown>(
  key: string,
  defaultValue: TData
) {
  return useStorage<TData>(sessionStorage, key, defaultValue);
}

export function useLocalStorage<TData = unknown>(
  key: string,
  defaultValue: TData
) {
  return useStorage<TData>(localStorage, key, defaultValue);
}
