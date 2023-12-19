import { useAxiosListQuery } from "../../services/useAxiosRequest";
import { AuthorEntity, AuthorResponseSchema } from "./authorModel";

export function useAuthorListQuery() {
  return useAxiosListQuery<AuthorEntity>({
    api: ["artwork.json"],
    queryKey: ["author", "list"],
    responseSchema: AuthorResponseSchema,
  });
}
