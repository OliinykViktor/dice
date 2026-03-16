import { MAX_RESULT, MIN_RESULT } from "@/src/shared/config/game";

import type { Condition, GameEntry } from "./types";

export function getRandomResult(): number {
  return Math.floor(Math.random() * MAX_RESULT) + MIN_RESULT;
}

export function checkWin(result: number, threshold: number, condition: Condition): boolean {
  if (condition === "greater") {
    return result > threshold;
  }

  return result < threshold;
}

export function getConditionLabel(condition: Condition): string {
  return condition === "greater" ? "Over" : "Under";
}

export function getResultDirection(result: number, threshold: number): "higher" | "lower" | "equal" {
  if (result > threshold) {
    return "higher";
  }

  if (result < threshold) {
    return "lower";
  }

  return "equal";
}

export function createGameEntry(result: number, threshold: number, condition: Condition): GameEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    playedAt: Date.now(),
    threshold,
    condition,
    result,
    isWin: checkWin(result, threshold, condition),
  };
}
