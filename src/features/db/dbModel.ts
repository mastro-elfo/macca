import { z } from "zod";
import { ArtworkSchema } from "../artwork/artworkModel";
import { AuthorEntity, AuthorSchema } from "../author/authorModel";

const UNKNOWN: AuthorEntity = {
  id: 0,
  isUnknown: true,
  firstName: "",
  lastName: "",
} as const;

export const DbResponseSchema = z
  .object({
    artworks: ArtworkSchema.array(),
    authors: AuthorSchema.array(),
  })
  .transform((args) => ({
    authors: args.authors,
    artworks: args.artworks.map((artwork) => ({
      ...artwork,
      authors: artwork.isAuthorUnknown
        ? [UNKNOWN]
        : args.authors.filter((author) =>
            artwork.authorIds.includes(author.id)
          ),
    })),
  }));

export type DbResponseDto = z.infer<typeof DbResponseSchema>;
