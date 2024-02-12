import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  // TODO: remove `usUnknown`
  isUnknown: z.boolean().default(false),
});

export type AuthorEntity = z.infer<typeof AuthorSchema>;
