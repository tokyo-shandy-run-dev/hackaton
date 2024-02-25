import { TimeRange } from "@/types/timeRange";
import {
  extractOkTimeState as extractOkTimeStatus,
  sumTime,
  validateTimeState,
} from "@/types/timeState";
import { TimeState } from "@prisma/client";

type Input = {
  timeStatus: TimeState[];
  duration: TimeRange;
  totalHours: number;
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

  const okTimeStatus = extractOkTimeStatus(data.timeStatus);

  // 一日あたりの集まる時間
  const oneDayGoalHours =
    data.totalHours / data.duration.end.getHours() - data.duration.start.getHours();

  const timeStatusPerDay = splitTimeStatusPerDay(okTimeStatus);

  for (const timeStatus of timeStatusPerDay) {
    let targetGoalHours = oneDayGoalHours;
  }
}
