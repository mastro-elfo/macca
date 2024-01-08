import { useAxiosQuery } from "../../services/useAxiosRequest";
import { useDbQuery } from "../db/dbService";
import { ArtworkEntity, ArtworkResponseSchema } from "./artworkModel";

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
  return useAxiosQuery<ArtworkEntity>({
    api: ["artwork.json"],
    queryKey: ["artwork", "detail"],
    responseSchema: ArtworkResponseSchema,
    find: (artwork) => artwork.id === id,
    enabled: !!id,
  });
}
