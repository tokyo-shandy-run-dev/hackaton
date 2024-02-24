import { describe, expect, it } from "vitest";
import { ignoreDuplicateTimeState, sumTime, validateTimeState } from "./timeState";
import { TimeState } from "@prisma/client";

function timeState(start: Date): TimeState {
  return {
    createdAt: new Date(),
    id: 1,
    projectId: 1,
    status: "status",
    time_start: start,
    userId: 1,
  };
}

describe("ignoreDuplicateTimeState", () => {
  it("simple", () => {
    const datum = [timeState(new Date(2020, 1, 1, 1, 0))];
    expect(ignoreDuplicateTimeState(datum)).toStrictEqual(datum);
  });

  it("simple with Duplicate", () => {
    const data = timeState(new Date(2020, 1, 1, 1, 0));
    expect(ignoreDuplicateTimeState([data, data])).toStrictEqual([data]);
  });

  it("multiple", () => {
    const datum = [timeState(new Date(2020, 1, 1, 1, 0)), timeState(new Date(2020, 1, 1, 2, 0))];
    expect(ignoreDuplicateTimeState(datum)).toStrictEqual(datum);
  });

  it("multiple with Duplicate", () => {
    expect(
      ignoreDuplicateTimeState([
        timeState(new Date(2020, 1, 1, 1, 0)),
        timeState(new Date(2020, 1, 1, 1, 0)),
        timeState(new Date(2020, 1, 1, 2, 0)),
      ])
    ).toStrictEqual([timeState(new Date(2020, 1, 1, 1, 0)), timeState(new Date(2020, 1, 1, 2, 0))]);
  });
});

describe("validateTimeState", () => {
  it("正常系", () => {
    expect(
      validateTimeState({
        createdAt: new Date(),
        id: 1,
        projectId: 1,
        status: "status",
        time_start: new Date(2020, 1, 1),
        userId: 1,
      })
    ).toBe(true);
  });
  it("異常系", () => {
    expect(
      validateTimeState({
        createdAt: new Date(),
        id: 1,
        projectId: 1,
        status: "status",
        time_start: new Date(2020, 1, 1, 1, 1),
        userId: 1,
      })
    ).toBe(false);
  });
});

describe("sumTime", () => {
  it("simple", () => {
    expect(sumTime([timeState(new Date(2020, 1, 1))])).toBe(1);
  });

  it("multiple", () => {
    expect(
      sumTime([
        timeState(new Date(2020, 1, 1, 1)),
        timeState(new Date(2020, 1, 1, 2)),
        timeState(new Date(2020, 1, 1, 3)),
      ])
    ).toBe(3);
  });

  it("multiple with duplicate", () => {
    expect(
      sumTime([
        timeState(new Date(2020, 1, 1, 1)),
        timeState(new Date(2020, 1, 1, 1)),
        timeState(new Date(2020, 1, 1, 2)),
      ])
    ).toBe(2);
  });
});
