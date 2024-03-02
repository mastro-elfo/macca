import { useQueryClient } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  useArtworkYearListQuery,
} from "../artworkService";

export default function ArtworkListPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artworks"));

  const filterForm = useArtworkFilterForm();
  const artworkInfiniteQuery = useArtworkInfiniteQuery(filterForm.getValues());
  const { ref } = useIntersection(artworkInfiniteQuery);
  const yearsQuery = useArtworkYearListQuery();
  const queryClient = useQueryClient();

  useAutoSubmit(
    filterForm,
    (_data) => {
      void queryClient.invalidateQueries({ queryKey: ["artwork", "infinite"] });
    },
    (err) => {
      console.log("onError", err);
    }
  );

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
      actions={
        <FormProvider {...filterForm}>
          <ArtworkListFilter yearOptions={yearsQuery.data ?? []} />
        </FormProvider>
      }
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
