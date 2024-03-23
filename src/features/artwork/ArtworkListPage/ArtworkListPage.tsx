import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import EmptyListAlert from "../../../components/EmptyListAlert/EmptyListAlert";
import InfiniteContainer from "../../../components/InfiniteContainer/InfiniteContainer";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useAutoSubmit from "../../../services/useAutoSubmit";
import useDocumentTitle from "../../../services/useDocumentTitle";
import useIntersection from "../../../services/useIntersection";
import { useUsesearchparamsvaluesService } from "../../../services/useSearchParamsValuesService/useSearchParamsValuesService";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";
import ArtworkListFilter from "../ArtworkListFilter/ArtworkListFilter";
import {
  useArtworkFilterForm,
  useArtworkInfiniteQuery,
  useArtworkTagListQuery,
  useArtworkTownListQuery,
  useArtworkYearListQuery,
} from "../artworkService";

export default function ArtworkListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artworks"));

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValues = useUsesearchparamsvaluesService(searchParams);
  const filterForm = useArtworkFilterForm();
  const artworkInfiniteQuery = useArtworkInfiniteQuery(searchParamsValues);
  const { ref } = useIntersection(artworkInfiniteQuery);
  const yearsQuery = useArtworkYearListQuery();
  const townsQuery = useArtworkTownListQuery();
  const tagsQuery = useArtworkTagListQuery();

  useAutoSubmit(
    filterForm,
    (data) => {
      setSearchParams(data);
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
        townsQuery.isFetching ||
        tagsQuery.isFetching
      }
      errors={[artworkInfiniteQuery.error]}
      py={1}
      background={{
        image: "undraw_art_museum_-8-or4.svg",
        position: "bottom",
        opacity: 0.5,
        size: "sm",
      }}
      actions={
        <FormProvider {...filterForm}>
          <ArtworkListFilter
            yearOptions={yearsQuery.data ?? []}
            townOptions={townsQuery.data ?? []}
            tagOptions={tagsQuery.data ?? []}
          />
        </FormProvider>
      }
    >
      {artworkList.length === 0 && <EmptyListAlert />}
      <InfiniteContainer query={artworkInfiniteQuery} intersectionRef={ref}>
        <ArtworkGrid artworks={artworkList} />
      </InfiniteContainer>
    </PageLayout>
  );
}
