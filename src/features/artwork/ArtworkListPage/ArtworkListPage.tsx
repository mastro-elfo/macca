import { useTranslation } from "react-i18next";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";
import { useArtworkListQuery } from "../artworkService";

export default function ArtworkListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artworks"));
  const artworkListQuery = useArtworkListQuery();

  return (
    <PageLayout
      title={t("Artworks")}
      loading={artworkListQuery.isFetching}
      py={1}
      background={{
        image: "undraw_art_museum_-8-or4.svg",
        position: "bottom",
        opacity: 0.5,
      }}
    >
      {/* TODO: add more artworks */}
      <ArtworkGrid artworks={artworkListQuery.data ?? []} />
    </PageLayout>
  );
}
