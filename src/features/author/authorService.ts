import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  useAxiosListQuery,
  useAxiosQuery,
} from "../../services/useAxiosRequest";
import { AuthorEntity, AuthorResponseSchema } from "./authorModel";

export function useAuthorListQuery() {
  return useAxiosListQuery<AuthorEntity>({
    api: ["artwork.json"],
    queryKey: ["author", "list"],
    responseSchema: AuthorResponseSchema,
  });
}

export function useAuthorDetailQuery(id: number) {
  return useAxiosQuery<AuthorEntity>({
    api: ["artwork.json"],
    queryKey: ["author", "detail"],
    responseSchema: AuthorResponseSchema,
    find: (author) => author.id === id,
    enabled: !!id,
  });
}

export function useAuthorFullNameFormatter() {
  const { t } = useTranslation();

  return useCallback((author?: AuthorEntity) => {
    if (!author) return "";
    if (author.isUnknown) return t("Unknown");
    return [author.firstName, author.lastName].filter((item) => item).join(" ");
  }, []);
}
