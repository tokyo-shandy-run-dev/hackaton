import { describe, it, expect } from "vitest";
import { autoSched } from "./autoSched";

describe("autoSched", () => {
  it("should return an array of schedules", () => {
    // Arrange
    const data = {
      timeStatus: [],
      duration: {
        start: new Date(),
        end: new Date(),
      },
    };

    // Act
    const result = autoSched(data);

    // Assert
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return an Error when input is invalid", () => {
    // Arrange
    const data = {
      timeStatus: [],
      duration: {
        start: new Date(),
        end: new Date(),
      },
    };

    // Act
    const result = autoSched(data);

    // Assert
    expect(result instanceof Error).toBe(true);
  });
});
