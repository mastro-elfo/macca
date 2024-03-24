import { Grid, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchField from "../../../components/SearchField/SearchField";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import useSearchParamsValues from "../../../services/useSearchParamsValues/useSearchParamsValues";
import {
  useAuthorFullNameFormatter,
  useAuthorListQuery,
} from "../authorService";

export default function AuthorListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Authors"));
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValues = useSearchParamsValues(searchParams);
  const authorListQuery = useAuthorListQuery(searchParamsValues);
  const fullNameFormatter = useAuthorFullNameFormatter();

  const handleSearch = (name: string) => {
    setSearchParams({ name });
  };

  return (
    <PageLayout
      title={t("Authors")}
      loading={authorListQuery.isFetching}
      errors={[authorListQuery.error]}
      py={1}
      background={{
        image: "undraw_artist_b-4-rc.svg",
        position: "bottom right",
        opacity: 0.5,
        size: "sm",
      }}
      actions={
        <SearchField
          size="small"
          placeholder={t("Search")}
          onSearch={handleSearch}
          defaultValue={searchParamsValues.name}
        />
      }
    >
      <Grid container spacing={2}>
        {authorListQuery.data?.map((author) => (
          <Grid item xs={12} sm={6} md={4}>
            <ListItemButton
              key={author.id}
              onClick={() => {
                navigate(`/authors/${author.id}`);
              }}
              title={fullNameFormatter(author)}
            >
              <ListItemText primary={fullNameFormatter(author)} />
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}
