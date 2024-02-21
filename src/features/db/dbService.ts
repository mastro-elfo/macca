import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { DbResponseDto, DbResponseSchema } from "./dbModel";

type UseDbQueryOptions<TResponse, TError, TData> = Pick<
  UseQueryOptions<TResponse, TError, TData>,
  "enabled" | "initialData" | "select"
>;

export function useDbQuery<TData = unknown>({
  ...options
}: UseDbQueryOptions<DbResponseDto, AxiosError, TData> = {}) {
  return useQuery<DbResponseDto, AxiosError, TData>({
    queryKey: ["db.json"],
    queryFn: ({ signal }) =>
      axios
        .get<DbResponseDto>(["", "macca", "data", "db.json"].join("/"), {
          signal,
        })
        .then((response) => response.data)
        .then((data) => DbResponseSchema.parse(data)),
    ...options,
  });
}
