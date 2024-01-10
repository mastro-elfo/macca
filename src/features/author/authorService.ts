import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAxiosQuery } from "../../services/useAxiosRequest";
import { useDbQuery } from "../db/dbService";
import { AuthorEntity, AuthorResponseSchema } from "./authorModel";

export function useAuthorListQuery() {
  return useDbQuery<AuthorEntity[]>({
    select: ({ authors }) => authors,
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
