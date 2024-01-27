import { useDbQuery } from "../db/dbService";
import { ArtworkEntity } from "./artworkModel";

export function useArtworkListQuery() {
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks }) => artworks,
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
