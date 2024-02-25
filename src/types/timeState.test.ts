import { describe, expect, it } from "vitest";
import {
  extractOkTimeState,
  ignoreDuplicateTimeState,
  splitTimeStatusPerDay,
  sumTime,
  validateTimeState,
} from "./timeState";
import { TimeState } from "@prisma/client";

function timeState(start: Date, status?: "ok" | "ng"): TimeState {
  return {
    createdAt: new Date(2021, 1, 1),
    id: 1,
    projectId: 1,
    status: status ?? "ok",
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

describe("extractOkTimeState", () => {
  it("simple", () => {
    expect(
      extractOkTimeState([
        timeState(new Date(2020, 1, 1, 1), "ok"),
        timeState(new Date(2020, 1, 1, 2), "ok"),
        timeState(new Date(2020, 1, 1, 3), "ng"),
      ])
    ).toStrictEqual([new Date(2020, 1, 1, 1), new Date(2020, 1, 1, 2)]);
  });

  it("with duplicate", () => {
    expect(
      extractOkTimeState([
        timeState(new Date(2020, 1, 1, 1), "ok"),
        timeState(new Date(2020, 1, 1, 1), "ok"),
        timeState(new Date(2020, 1, 1, 2), "ok"),
      ])
    ).toStrictEqual([new Date(2020, 1, 1, 1), new Date(2020, 1, 1, 2)]);
  });

  it("with ng duplicate", () => {
    expect(
      extractOkTimeState([
        timeState(new Date(2020, 1, 1, 1), "ok"),
        timeState(new Date(2020, 1, 1, 1), "ng"),
        timeState(new Date(2020, 1, 1, 1), "ng"),
      ])
    ).toStrictEqual([]);
  });
});

describe("splitTimeStatusPerDay", () => {
  it("simple", () => {
    const date = new Date(2020, 1, 1);
    const result: Map<string, TimeState[]> = new Map();
    result.set(date.toISOString(), [
      timeState(date, "ok"),
      timeState(date, "ok"),
      timeState(date, "ok"),
    ]);
    expect(
      splitTimeStatusPerDay([timeState(date, "ok"), timeState(date, "ok"), timeState(date, "ok")])
    ).toStrictEqual(result);
  });

  it("multiple", () => {
    const result: Map<string, TimeState[]> = new Map();
    result.set(new Date(2020, 1, 1).toISOString(), [
      timeState(new Date(2020, 1, 1), "ok"),
      timeState(new Date(2020, 1, 1), "ok"),
    ]);
    result.set(new Date(2020, 1, 2).toISOString(), [timeState(new Date(2020, 1, 2), "ok")]);
    expect(
      splitTimeStatusPerDay([
        timeState(new Date(2020, 1, 1), "ok"),
        timeState(new Date(2020, 1, 1), "ok"),
        timeState(new Date(2020, 1, 2), "ok"),
      ])
    ).toStrictEqual(result);
  });
});
