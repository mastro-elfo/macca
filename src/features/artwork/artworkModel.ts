import { z } from "zod";

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
  author: z.string(),
  // TODO: add images
  // TODO: add markdown text
});

export type ArtworkEntity = z.infer<typeof ArtworkSchema>;

export const ArtworkResponseSchema = z
  .object({
    artworks: ArtworkSchema.array(),
  })
  .transform((args) => args.artworks);

export type ArtworkResponseDto = z.infer<typeof ArtworkResponseSchema>;
