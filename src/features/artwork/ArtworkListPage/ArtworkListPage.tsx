import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EmptyListAlert from "../../../components/EmptyListAlert/EmptyListAlert";
import InfiniteContainer from "../../../components/InfiniteContainer/InfiniteContainer";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useAutoSubmit from "../../../services/useAutoSubmit";
import useDocumentTitle from "../../../services/useDocumentTitle";
import useIntersection from "../../../services/useIntersection";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";
import ArtworkListFilter from "../ArtworkListFilter/ArtworkListFilter";
import {
  useArtworkFilterForm,
  useArtworkInfiniteQuery,
  useArtworkTownListQuery,
  useArtworkYearListQuery,
} from "../artworkService";

export default function ArtworkListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artworks"));

  const filterForm = useArtworkFilterForm();
  const artworkInfiniteQuery = useArtworkInfiniteQuery(filterForm.getValues());
  const { ref } = useIntersection(artworkInfiniteQuery);
  const yearsQuery = useArtworkYearListQuery();
  const townsQuery = useArtworkTownListQuery();

  useAutoSubmit(
    filterForm,
    (_data) => {
      // TODO: push query parameters
    },
    (err) => {
      console.log("onError", err);
    }
  );

  const artworkList = useMemo(
    () =>
      artworkInfiniteQuery.data?.pages.map((page) => page.data).flat() ?? [],
    [artworkInfiniteQuery.data?.pages]
  );

  return (
    <PageLayout
      title={t("Artworks")}
      loading={
        artworkInfiniteQuery.isFetching ||
        yearsQuery.isFetching ||
        townsQuery.isFetching
      }
      py={1}
      background={{
        image: "undraw_art_museum_-8-or4.svg",
        position: "bottom",
        opacity: 0.5,
      }}
      actions={
        <FormProvider {...filterForm}>
          <ArtworkListFilter
            yearOptions={yearsQuery.data ?? []}
            townOptions={townsQuery.data ?? []}
          />
        </FormProvider>
      }
    >
      {/* TODO: if list is empty, display "No element found" */}
      {artworkList.length === 0 && <EmptyListAlert />}
      <InfiniteContainer query={artworkInfiniteQuery} intersectionRef={ref}>
        <ArtworkGrid artworks={artworkList} />
      </InfiniteContainer>
    </PageLayout>
  );
}
