import { useTranslation } from "react-i18next";
import { useAxiosListQuery } from "../../services/useAxiosRequest";
import { AuthorEntity, AuthorResponseSchema } from "./authorModel";

export function useAuthorListQuery() {
  return useAxiosListQuery<AuthorEntity>({
    api: ["artwork.json"],
    queryKey: ["author", "list"],
    responseSchema: AuthorResponseSchema,
  });
}

export function useFullName(author: AuthorEntity) {
  const { t } = useTranslation();
  if (author.isUnknown) return t("Unknown");
  return [author.firstName, author.lastName].filter((item) => item).join(" ");
}
