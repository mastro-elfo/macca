import { z } from "zod";
import { AuthorSchema } from "../author/authorModel";

const ArtworkAttribution = z.object({
  title: z.string(),
  url: z.string().url().optional(),
});

const ArtworkImage = z.object({
  path: z.string(),
  attribution: ArtworkAttribution,
  cols: z.number().default(1),
});

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number().optional(),
  tags: z.string().array(),
  town: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  url: z.string().optional(),
  authors: AuthorSchema.array().default([]),
  authorIds: z.number().array(),
  isAuthorUnknown: z.boolean().optional(),
  images: ArtworkImage.array(),
  // TODO: add markdown text (problem with translation)
});

export type ArtworkEntity = z.infer<typeof ArtworkSchema>;
