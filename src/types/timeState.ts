import { TimeState } from "@prisma/client";
import { z } from "zod";

export const TimeStateSchema = z.object({
    id: z.number(),
    userId: z.number().nullable(),
    projectId: z.number().nullable(),
    time_start: z.date(), // startTimeをtime_startに変更
    status: z.string(), // statusフィールドを追加
    createdAt: z.date(),
    updatedAt: z.date(),
}) satisfies z.ZodType<TimeState>;

