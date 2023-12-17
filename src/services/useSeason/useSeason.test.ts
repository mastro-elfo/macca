import { describe, expect, it } from "vitest";
import useSeason from "./useSeason";

describe("useSeason", () => {
  it("should be winter", () => {
    expect(useSeason(new Date(2000, 0, 1))).toBe("winter");
    expect(useSeason(new Date(2000, 1, 1))).toBe("winter");
    expect(useSeason(new Date(2000, 2, 1))).toBe("winter");
    expect(useSeason(new Date(2000, 2, 19))).toBe("winter");
    expect(useSeason(new Date(2000, 11, 22))).toBe("winter");
  });

  it("should be spring", () => {
    expect(useSeason(new Date(2000, 2, 20))).toBe("spring");
    expect(useSeason(new Date(2000, 3, 1))).toBe("spring");
    expect(useSeason(new Date(2000, 4, 1))).toBe("spring");
    expect(useSeason(new Date(2000, 5, 1))).toBe("spring");
    expect(useSeason(new Date(2000, 5, 19))).toBe("spring");
  });

  it("should be summer", () => {
    expect(useSeason(new Date(2000, 5, 20))).toBe("summer");
    expect(useSeason(new Date(2000, 6, 1))).toBe("summer");
    expect(useSeason(new Date(2000, 7, 1))).toBe("summer");
    expect(useSeason(new Date(2000, 8, 1))).toBe("summer");
    expect(useSeason(new Date(2000, 8, 21))).toBe("summer");
  });

  it("should be autumn", () => {
    expect(useSeason(new Date(2000, 8, 22))).toBe("autumn");
    expect(useSeason(new Date(2000, 9, 1))).toBe("autumn");
    expect(useSeason(new Date(2000, 10, 1))).toBe("autumn");
    expect(useSeason(new Date(2000, 11, 1))).toBe("autumn");
    expect(useSeason(new Date(2000, 11, 21))).toBe("autumn");
  });
});
