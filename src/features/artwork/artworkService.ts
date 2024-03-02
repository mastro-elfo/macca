import { useInfiniteQuery } from "@tanstack/react-query";
import { useDbQuery } from "../db/dbService";
import { ArtworkEntity } from "./artworkModel";

export function useArtworkListQuery() {
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) => artworks,
  });
}

export function useArtworkInfiniteQuery(filters: { year: number | string }) {
  const limit = 10;
  const artworkQuery = useArtworkListQuery();

  return useInfiniteQuery({
    queryKey: ["artwork", "infinite", filters],
    queryFn: ({ pageParam }) => {
      const data = (artworkQuery.data ?? []).filter((artwork) => {
        if (filters.year) {
          return artwork.year === filters.year;
        }
        return true;
      });
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
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) =>
      artworks.filter((artwork) => artwork.authorIds.includes(authorId)),
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

import { useForm } from "react-hook-form";

export function useArtworkFilterForm() {
  return useForm({
    mode: "onChange",
    defaultValues: {
      year: "",
    },
  });
}
