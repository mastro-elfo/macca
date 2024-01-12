import { useDbQuery } from "../db/dbService";
import { ArtworkEntity } from "./artworkModel";

export function useArtworkListQuery() {
  return useDbQuery<ArtworkEntity[]>({
    select: ({ artworks, authors }) =>
      artworks.map((artwork) => ({
        ...artwork,
        author: authors.find((author) => author.id === artwork.authorId),
      })),
  });
}

export function useArtworkDetailQuery(id: number) {
  return useDbQuery<ArtworkEntity | undefined>({
    select: ({ artworks, authors }) => {
      const artwork = artworks.find((artwork) => artwork.id === id);
      const author = authors.find((author) => author.id === artwork?.id);
      if (artwork) return { ...artwork, author };
    },
  });
}
