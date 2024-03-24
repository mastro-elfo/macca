import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDbQuery } from "../db/dbService";
import { AuthorEntity, AuthorFilterSchema } from "./authorModel";

export function useAuthorListQuery(filter?: unknown) {
  return useDbQuery<AuthorEntity[]>({
    select: ({ authors }) => {
      if (!filter) return authors;

      const parsedFilter = AuthorFilterSchema.parse(filter);
      return authors.filter((author) =>
        parsedFilter.name
          ? author.firstName.toLowerCase().includes(parsedFilter.name) ||
            author.lastName.toLowerCase().includes(parsedFilter.name)
          : true
      );
    },
  });
}

export function useAuthorDetailQuery(id: number) {
  return useDbQuery<AuthorEntity | undefined>({
    select: ({ authors }) => authors.find((author) => author.id === id),
  });
}

export function useAuthorFullNameFormatter() {
  const { t } = useTranslation();

  return useCallback(
    (author?: AuthorEntity) => {
      if (!author) return "";
      if (author.isUnknown) return t("Unknown");
      return [author.firstName, author.lastName]
        .filter((item) => item)
        .join(" ");
    },
    [t]
  );
}
