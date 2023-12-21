import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkGrid from "../../artwork/ArtworkGrid/ArtworkGrid";
import { useArtworkListQuery } from "../../artwork/artworkService";
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
  const artworkListQuery = useArtworkListQuery();
  const authorArtworks = useMemo(
    () =>
      (artworkListQuery.data ?? []).filter(
        (artwork) => artwork.authorId === Number(id)
      ),
    [artworkListQuery.data]
  );

  return (
    <PageLayout
      title={t("Author detail")}
      loading={authorDetailQuery.isFetching || artworkListQuery.isFetching}
    >
      <Typography variant="h6" gutterBottom>
        {fullNameFormatter(authorDetailQuery.data)}
      </Typography>
      <ArtworkGrid artworks={authorArtworks} />
    </PageLayout>
  );
}
