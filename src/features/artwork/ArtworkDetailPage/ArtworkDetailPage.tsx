import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import { useAuthorFullNameFormatter } from "../../author/authorService";
import ArtworkImageList from "../ArtworkImageList/ArtworkImageList";
import { useArtworkDetailQuery } from "../artworkService";

export default function ArtworkDetailPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artwork detail"));
  const { id } = useParams();

  const artworkDetailQuery = useArtworkDetailQuery(Number(id));
  const fullNameFormatter = useAuthorFullNameFormatter();

  return (
    <PageLayout
      title={t("Artwork detail")}
      loading={artworkDetailQuery.isFetching}
      background={{
        image: "undraw_art_lover_re_fn8g.svg",
        opacity: 0.5,
        position: "bottom left",
      }}
      showBackButton
    >
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="h6">{artworkDetailQuery.data?.title}</Typography>
        <Typography variant="h6" align="right">
          {/* TODO: add link to search by year */}
          {artworkDetailQuery.data?.year}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="h6" color="textSecondary">
          {/* TODO: add link to author page */}
          {artworkDetailQuery.data?.authors.map(fullNameFormatter).join(", ")}
        </Typography>
        <Typography variant="h6" color="textSecondary" align="right">
          {artworkDetailQuery.data?.town},{" "}
          {/* TODO: add link to search by town */}
          {artworkDetailQuery.data?.address}
        </Typography>
      </Stack>

      <Typography variant="body2">
        {artworkDetailQuery.data?.tags.map((tag) => t(tag)).join(", ")}
      </Typography>

      <ArtworkImageList artwork={artworkDetailQuery.data} />
    </PageLayout>
  );
}
