import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as gameLogic from "@/src/entities/game/model/game-logic";
import { useDiceGame } from "./use-dice-game";

describe("useDiceGame", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(gameLogic, "getRandomResult").mockReturnValue(77);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps history capped at 10 entries after multiple plays", async () => {
    const { result } = renderHook(() => useDiceGame());

    await waitFor(() => {
      expect(result.current.isHydratingFromStorage).toBe(false);
    });

    act(() => {
      result.current.setThresholdInput("50");
    });

    await waitFor(() => {
      expect(result.current.isThresholdValid).toBe(true);
    });

    for (let index = 0; index < 12; index += 1) {
      act(() => {
        result.current.handlePlay();
      });
    }

    await waitFor(() => {
      expect(result.current.history).toHaveLength(10);
    });

    expect(result.current.lastEntry?.result).toBe(77);
  });
});
