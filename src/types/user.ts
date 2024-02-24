import { User } from "@prisma/client";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string().nullable(),
}) satisfies z.ZodType<User>;
