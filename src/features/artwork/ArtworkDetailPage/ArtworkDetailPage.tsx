import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkImageList from "../ArtworkImageList/ArtworkImageList";
import { useArtworkDetailQuery } from "../artworkService";

export default function ArtworkDetailPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artwork detail"));
  const { id } = useParams();

  const artworkDetailQuery = useArtworkDetailQuery(Number(id));

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
      <Stack direction="row">
        <Typography variant="h6" flex={1}>
          {artworkDetailQuery.data?.title}
        </Typography>
        <Typography variant="h6">{artworkDetailQuery.data?.year}</Typography>
      </Stack>
      <Typography variant="h6" color="textSecondary">
        {artworkDetailQuery.data?.author}
      </Typography>
      <Typography variant="body2">
        {artworkDetailQuery.data?.tags.map((tag) => t(tag)).join(", ")}
      </Typography>
      <ArtworkImageList artwork={artworkDetailQuery.data} />
    </PageLayout>
  );
}
