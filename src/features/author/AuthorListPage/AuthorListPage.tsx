import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import {
  useAuthorFullNameFormatter,
  useAuthorListQuery,
} from "../authorService";

export default function AuthorListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Authors"));
  const navigate = useNavigate();

  const authorListQuery = useAuthorListQuery();
  const fullNameFormatter = useAuthorFullNameFormatter();

  // TODO: improve page layout

  return (
    <PageLayout
      title={t("Authors")}
      loading={authorListQuery.isFetching}
      py={1}
      background={{
        image: "undraw_artist_b-4-rc.svg",
        position: "bottom right",
        opacity: 0.5,
        size: "sm",
      }}
    >
      <List>
        {authorListQuery.data?.map((author) => (
          <ListItem disablePadding key={author.id}>
            <ListItemButton
              key={author.id}
              onClick={() => {
                navigate(`/authors/${author.id}`);
              }}
              title={fullNameFormatter(author)}
            >
              <ListItemText primary={fullNameFormatter(author)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </PageLayout>
  );
}
