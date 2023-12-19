import { List, ListItem, ListItemText } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import { AuthorEntity } from "../authorModel";
import { useAuthorListQuery } from "../authorService";

export default function AuthorListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Authors"));

  const authorListQuery = useAuthorListQuery();
  const fullNameFormatter = useAuthorFullNameFormatter();

  return (
    <PageLayout
      title={t("Authors")}
      loading={authorListQuery.isFetching}
      py={1}
      background={{
        image: "undraw_artist_b-4-rc.svg",
        position: "bottom right",
        opacity: 0.5,
      }}
    >
      <List>
        {authorListQuery.data?.map((author) => (
          <ListItem key={author.id}>
            <ListItemText primary={fullNameFormatter(author)} />
          </ListItem>
        ))}
      </List>
    </PageLayout>
  );
}

function useAuthorFullNameFormatter() {
  const { t } = useTranslation();

  return useCallback((author: AuthorEntity) => {
    if (author.isUnknown) return t("Unknown");
    return [author.firstName, author.lastName].filter((item) => item).join(" ");
  }, []);
}
