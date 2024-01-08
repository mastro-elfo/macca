import { z } from "zod";
import { AuthorSchema } from "../author/authorModel";

const ArtworkAttribution = z.object({
  title: z.string(),
  url: z.string().url().optional(),
});

const ArtworkImage = z.object({
  path: z.string(),
  attribution: ArtworkAttribution,
});

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  tags: z.string().array(),
  town: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  url: z.string().optional(),
  author: AuthorSchema.optional(),
  // TODO: should be an array
  authorId: z.number(),
  images: ArtworkImage.array(),
  // TODO: add markdown text
});

export type ArtworkEntity = z.infer<typeof ArtworkSchema>;

export const ArtworkResponseSchema = z
  .object({
    artworks: ArtworkSchema.omit({ author: true }).array(),
    authors: AuthorSchema.array(),
  })
  .transform((args) =>
    args.artworks.map((artwork) => ({
      ...artwork,
      author: args.authors.find((author) => author.id === artwork.authorId),
    }))
  );

export type ArtworkResponseDto = z.infer<typeof ArtworkResponseSchema>;
