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

export function validateTimeState(timeState: TimeState): boolean {
  return timeState.time_start.getMinutes() == 0;
}

/**
 * timeStatusの合計時間を返す
 * @param timeStatus
 * @returns 時間の合計(時)
 */
export function sumTime(timeStatus: TimeState[]): number {
  timeStatus = ignoreDuplicateTimeState(timeStatus);
  return timeStatus.length;
}

export function ignoreDuplicateTimeState(timeStatus: TimeState[]): TimeState[] {
  const result: Map<Date, TimeState> = new Map();
  for (const timeState of timeStatus) {
    result.set(timeState.time_start, timeState);
    console.log(result);
  }
  return Array.from(result.values());
}

/**
 * timeStatusのstatusがokのものだけを抽出
 * @param timeStatus
 * @returns okのDateの一時間おきのリスト
 */
export function extractOkTimeState(timeStatus: TimeState[]): Date[] {
  const list: Map<Date, TimeState["status"]> = new Map();
  for (const timeState of timeStatus) {
    list.set(
      timeState.time_start,
      list.get(timeState.time_start) == "ng" ? "ng" : timeState.status
    );
  }

  const result: Date[] = [];
  list.forEach((status, date) => {
    if (status == "ok") result.push(date);
  });
  return result;
}
