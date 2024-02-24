import { z } from "zod";

export const GithubUserSchema = z.object({
  user: z.string(),
  image: z.string(),
});
