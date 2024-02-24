import { TimeRange } from "@/types/timeRange";
import { ignoreDuplicateTimeState, sumTime, validateTimeState } from "@/types/timeState";
import { TimeState } from "@prisma/client";

type Input = {
  timeStatus: TimeState[];
  duration: TimeRange;
};

type Schedule = {
  start: Date;
  end: Date;
};

/**
 * - timeStatusの合計値がdurationより小さいか
 * - timeStatusが正常か
 */
function validation(data: Input): boolean {
  for (const timeState of data.timeStatus) {
    if (!validateTimeState(timeState)) return false;
  }
  if (sumTime(data.timeStatus) < data.duration.end.getHours() - data.duration.start.getHours())
    return false;
  return true;
}

export function autoSched(data: Input): Schedule[] | Error {
  if (!validation(data)) return Error("Invalid input");

  const timeStatus = ignoreDuplicateTimeState(data.timeStatus);
}
