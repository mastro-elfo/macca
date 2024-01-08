import { z } from "zod";
import { ArtworkSchema } from "../artwork/artworkModel";
import { AuthorSchema } from "../author/authorModel";

export const DbResponseSchema = z.object({
  artworks: ArtworkSchema.array(),
  authors: AuthorSchema.array(),
});

export type DbResponseDto = z.infer<typeof DbResponseSchema>;
