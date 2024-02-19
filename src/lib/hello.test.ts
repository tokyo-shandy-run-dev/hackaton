import { hello } from "./hello";
import { describe, it, expect } from "vitest";

describe("hello", () => {
  it('should return "Hello, World!"', () => {
    const result = hello();
    expect(result).toBe("Hello, World!");
  });
});
