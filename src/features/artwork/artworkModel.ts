import { z } from "zod";

const ArtworkAttribution = z.object({
  title: z.string(),
  url: z.string().url(),
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
  // FIXME: author should refer to the author list
  author: z.string(),
  images: ArtworkImage.array(),
  // TODO: add markdown text
});

export type ArtworkEntity = z.infer<typeof ArtworkSchema>;

export const ArtworkResponseSchema = z
  .object({
    artworks: ArtworkSchema.array(),
  })
  .transform((args) => args.artworks);

export type ArtworkResponseDto = z.infer<typeof ArtworkResponseSchema>;
