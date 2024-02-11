import { useTranslation } from "react-i18next";
import InfiniteContainer from "../../../components/InfiniteContainer/InfiniteContainer";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import useIntersection from "../../../services/useIntersection";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";
import { useArtworkInfiniteQuery } from "../artworkService";

export default function ArtworkListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artworks"));
  const artworkInfiniteQuery = useArtworkInfiniteQuery();
  const { ref } = useIntersection(artworkInfiniteQuery);

  return (
    <PageLayout
      title={t("Artworks")}
      loading={artworkInfiniteQuery.isFetching}
      py={1}
      background={{
        image: "undraw_art_museum_-8-or4.svg",
        position: "bottom",
        opacity: 0.5,
      }}
    >
      <InfiniteContainer query={artworkInfiniteQuery} intersectionRef={ref}>
        <ArtworkGrid
          artworks={
            artworkInfiniteQuery.data?.pages.map((page) => page.data).flat() ??
            []
          }
        />
      </InfiniteContainer>
    </PageLayout>
  );
}
