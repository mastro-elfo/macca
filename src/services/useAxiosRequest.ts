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
  find?: (data: TResponse) => boolean;
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
    queryFn: ({ signal }) =>
      axios
        .get(["", "macca", "data", ...api].join("/"), { signal })
        .then(AxiosResponseSchema.parse)
        .then(responseSchema.parse)
        .catch((error) => {
          if (import.meta.env.DEV) console.error(error);
          return Promise.reject(error);
        })
        .then((response) => {
          if (response.find && find) {
            return response.find(find);
          }
          return response;
        }),
    ...options,
  });
}

const AxiosResponseSchema = z
  .object({
    data: z.any(),
  })
  .transform((arg) => arg.data);
