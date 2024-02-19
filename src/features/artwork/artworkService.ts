import { useInfiniteQuery } from "@tanstack/react-query";
import { useDbQuery } from "../db/dbService";
import { ArtworkEntity } from "./artworkModel";

export function useArtworkListQuery() {
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) => artworks,
  });
}

export function useArtworkInfiniteQuery() {
  const limit = 10;
  const artworkQuery = useArtworkListQuery();
  return useInfiniteQuery({
    queryKey: ["artwork", "infinite"],
    queryFn: ({ pageParam }) => ({
      data: (artworkQuery.data ?? []).slice(
        pageParam * limit,
        (pageParam + 1) * limit
      ),
      page: pageParam,
      pageCount: Math.ceil((artworkQuery.data?.length ?? 0) / limit),
    }),
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
