import { describe, expect, it } from "vitest";

import { checkWin } from "./game-logic";

describe("checkWin", () => {
  it("returns expected result for greater/less including edge equal case", () => {
    const cases = [
      { result: 80, threshold: 50, condition: "greater", expected: true },
      { result: 20, threshold: 50, condition: "greater", expected: false },
      { result: 20, threshold: 50, condition: "less", expected: true },
      { result: 80, threshold: 50, condition: "less", expected: false },
      { result: 50, threshold: 50, condition: "greater", expected: false },
      { result: 50, threshold: 50, condition: "less", expected: false },
    ] as const;

    for (const testCase of cases) {
      expect(checkWin(testCase.result, testCase.threshold, testCase.condition)).toBe(testCase.expected);
    }
  });
});
