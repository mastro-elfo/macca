import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkGrid from "../../artwork/ArtworkGrid/ArtworkGrid";
import { useArtowrkListByAuthorQuery } from "../../artwork/artworkService";
import {
  useAuthorDetailQuery,
  useAuthorFullNameFormatter,
} from "../authorService";

export default function AuthorDetailPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Author detail"));

  const { id } = useParams();
  const authorDetailQuery = useAuthorDetailQuery(Number(id));
  const fullNameFormatter = useAuthorFullNameFormatter();
  const artworkListQuery = useArtowrkListByAuthorQuery(Number(id));

  return (
    <PageLayout
      title={t("Author detail")}
      loading={authorDetailQuery.isFetching || artworkListQuery.isFetching}
      showBackButton
    >
      <Typography variant="h6" gutterBottom>
        {fullNameFormatter(authorDetailQuery.data)}
      </Typography>
      <ArtworkGrid artworks={artworkListQuery.data ?? []} />
    </PageLayout>
  );
}
