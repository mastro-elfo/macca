import { z } from "zod";
import { AuthorSchema } from "../author/authorModel";

const ArtworkAttributionSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
});

const ArtworkImageSchema = z.object({
  path: z.string(),
  attribution: ArtworkAttributionSchema,
  cols: z.number().default(1),
});

export type ArtworkImage = z.infer<typeof ArtworkImageSchema>;

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
  images: ArtworkImageSchema.array(),
  // TODO: add markdown text (problem with translation)
});

export type ArtworkEntity = z.infer<typeof ArtworkSchema>;

export const ArtworkFilterSchema = z.object({
  tag: z.string(),
  town: z.string(),
  year: z
    .number()
    .or(z.string())
    .transform((arg) => Number(arg)),
});

export type ArtworkFilter = z.infer<typeof ArtworkFilterSchema>;

// export type ArtworkFilter = {
//   tag: string;
//   town: string;
//   year: number | string;
// };
