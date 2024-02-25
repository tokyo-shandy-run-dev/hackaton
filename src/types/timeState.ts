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
  const result: Map<String, TimeState> = new Map();
  for (const timeState of timeStatus) {
    result.set(timeState.time_start.toISOString(), timeState);
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
  const list: Map<string, TimeState["status"]> = new Map();
  for (const timeState of timeStatus) {
    list.set(
      timeState.time_start.toISOString(),
      list.get(timeState.time_start.toISOString()) == "ng" ? "ng" : timeState.status
    );
  }

  const result: Date[] = [];
  list.forEach((status, date) => {
    if (status == "ok") result.push(new Date(date));
  });
  return result;
}

export function splitTimeStatusPerDay(timeStatus: TimeState[]): Map<String, TimeState[]> {
  const result: Map<String, TimeState[]> = new Map();
  for (const timeState of timeStatus) {
    const date = timeState.time_start;
    if (result.has(date.toISOString())) {
      result.get(date.toISOString())?.push(timeState);
    } else {
      result.set(date.toISOString(), [timeState]);
    }
  }
  return result;
}
