import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  isUnknown: z.boolean().default(false),
});

export type AuthorEntity = z.infer<typeof AuthorSchema>;

export const AuthorFilterSchema = z.object({
  name: z.string().optional(),
});
