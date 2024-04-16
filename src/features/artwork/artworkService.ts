import { useInfiniteQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useEnvironment from "../../services/useEnvironment";
import { useDbQuery } from "../db/dbService";
import { ArtworkEntity, ArtworkFilterSchema } from "./artworkModel";

export function useArtworkListQuery() {
  const { isDevelopment } = useEnvironment();
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) =>
      isDevelopment ? artworks : artworks.filter((artwork) => !artwork.draft),
  });
}

export function useArtworkInfiniteQuery(filter: unknown) {
  const limit = 10;
  const artworkQuery = useArtworkListQuery();
  const { isDevelopment } = useEnvironment();

  return useInfiniteQuery({
    queryKey: ["artwork", "infinite", filter],
    queryFn: ({ pageParam }) => {
      const parsedFilters = ArtworkFilterSchema.parse(filter);
      const data = (artworkQuery.data ?? []).filter(
        (artwork) =>
          (isDevelopment || !artwork.draft) &&
          (parsedFilters.town ? artwork.town === parsedFilters.town : true) &&
          (parsedFilters.year ? artwork.year === parsedFilters.year : true) &&
          (parsedFilters.tag ? artwork.tags.includes(parsedFilters.tag) : true)
      );
      return {
        data: data.slice(pageParam * limit, (pageParam + 1) * limit),
        page: pageParam,
        pageCount: Math.ceil(data.length / limit),
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.pageCount) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 0,
    enabled: artworkQuery.isFetched,
  });
}

export function useArtowrkListByAuthorQuery(authorId: number) {
  const { isDevelopment } = useEnvironment();

  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) =>
      artworks.filter(
        (artwork) =>
          (isDevelopment || !artwork.draft) &&
          artwork.authorIds.includes(authorId)
      ),
  });
}

export function useArtworkDetailQuery(id: number) {
  return useDbQuery<ArtworkEntity | undefined>({
    select: ({ artworks }) => {
      return artworks.find((artwork) => artwork.id === id);
    },
  });
}

export function useArtworkYearListQuery(_?: string) {
  return useDbQuery<number[]>({
    select: ({ artworks }) =>
      Array.from(
        new Set(
          artworks
            .filter((artwork) => artwork.year)
            .map((artwork) => artwork.year)
            .sort() as number[]
        )
      ),
  });
}

export function useArtworkTownListQuery(town?: string) {
  return useDbQuery<string[]>({
    select: ({ artworks }) =>
      Array.from(
        new Set(
          artworks
            .filter((artwork) =>
              town ? artwork.town.toLowerCase().includes(town) : true
            )
            .map((artwork) => artwork.town)
            .sort()
        )
      ),
  });
}

export function useArtworkTagListQuery(tag?: string) {
  return useDbQuery<string[]>({
    select: ({ artworks }) =>
      Array.from(
        new Set(
          artworks
            .filter((artwork) => (tag ? artwork.tags.includes(tag) : true))
            .map((artwork) => artwork.tags)
            .flat()
            .sort()
        )
      ),
  });
}

export function useArtworkFilterForm() {
  return useForm({
    mode: "onChange",
    defaultValues: {
      year: "",
      town: "",
      tag: "",
    },
  });
}
