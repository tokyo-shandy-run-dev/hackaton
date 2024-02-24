import { TimeState } from "@prisma/client";
import { z } from "zod";

export const TimeStateSchema = z.object({
    id: z.number(),
    time_start: z.date(), 
    status: z.string(),
    createdAt: z.date(),
    projectOnUserId: z.number(),
}) satisfies z.ZodType<TimeState>;

