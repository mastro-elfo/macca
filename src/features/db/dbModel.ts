import { z } from "zod";
import { ArtworkSchema } from "../artwork/artworkModel";
import { AuthorSchema } from "../author/authorModel";

export const DbResponseSchema = z
  .object({
    artworks: ArtworkSchema.array(),
    authors: AuthorSchema.array(),
  })
  .transform((args) => ({
    authors: args.authors,
    artworks: args.artworks.map((artwork) => ({
      ...artwork,
      authors: args.authors.filter((author) =>
        artwork.authorIds.includes(author.id)
      ),
    })),
  }));

export type DbResponseDto = z.infer<typeof DbResponseSchema>;
