import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodSchema, z } from "zod";

type UseAxiosQueryOptions<TResponse> = Pick<
  UseQueryOptions<TResponse>,
  "initialData" | "enabled"
> & {
  api: string[];
  queryKey?: UseQueryOptions<TResponse>["queryKey"];
  responseSchema?: ZodSchema;
  find?: (artwork: TResponse) => boolean;
};

export function useAxiosQuery<TResponse = unknown>({
  api,
  find,
  queryKey,
  responseSchema = z.any(),
  ...options
}: UseAxiosQueryOptions<TResponse>) {
  return useQuery<TResponse, AxiosError<TResponse>>({
    queryKey: [...api, ...(queryKey ?? [])],
    queryFn: () =>
      axios
        .get(["", "macca", "data", ...api].join("/"))
        .then(AxiosResponseSchema.parse)
        .then(responseSchema.parse)
        .then((response) => {
          if (response.find && find) {
            return response.find(find);
          }
          return response;
        }),
    ...options,
  });
}

type UseAxiosListQueryOptions<TResponse> = Omit<
  UseAxiosQueryOptions<TResponse[]>,
  "initialData" | "find"
>;

export function useAxiosListQuery<TResponse = unknown>(
  options: UseAxiosListQueryOptions<TResponse>
) {
  return useAxiosQuery<TResponse[]>({ ...options, initialData: [] });
}

const AxiosResponseSchema = z
  .object({
    data: z.any(),
  })
  .transform((arg) => arg.data);
