import {
  useAxiosListQuery,
  useAxiosQuery,
} from "../../services/useAxiosRequest";
import { ArtworkEntity, ArtworkResponseSchema } from "./artworkModel";

export function useArtworkListQuery() {
  return useAxiosListQuery<ArtworkEntity>({
    api: ["artwork.json"],
    queryKey: ["list"],
    responseSchema: ArtworkResponseSchema,
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
