import type { Condition, GameEntry } from "@/src/entities/game/model/types";
import { HISTORY_LIMIT } from "@/src/shared/config/game";

const STORAGE_KEY = "dice-game-state-v1";

type PersistedDiceGameState = {
  thresholdInput: string;
  condition: Condition;
  lastEntry: GameEntry | null;
  history: GameEntry[];
};

function isCondition(value: unknown): value is Condition {
  return value === "greater" || value === "less";
}

function isGameEntry(value: unknown): value is GameEntry {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<GameEntry>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.threshold === "number" &&
    isCondition(candidate.condition) &&
    typeof candidate.result === "number" &&
    typeof candidate.isWin === "boolean" &&
    (typeof candidate.playedAt === "number" || typeof candidate.playedAt === "undefined")
  );
}

function normalizeGameEntry(entry: GameEntry): GameEntry {
  if (typeof entry.playedAt === "number") {
    return entry;
  }

  const fromId = Number.parseInt(entry.id.split("-")[0] ?? "", 10);
  return {
    ...entry,
    playedAt: Number.isFinite(fromId) ? fromId : Date.now(),
  };
}

export function readDiceGameState(): PersistedDiceGameState | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<PersistedDiceGameState>;
    if (typeof parsed.thresholdInput !== "string" || !isCondition(parsed.condition)) {
      return null;
    }

    const history = Array.isArray(parsed.history)
      ? parsed.history.filter(isGameEntry).map(normalizeGameEntry).slice(0, HISTORY_LIMIT)
      : [];
    const lastEntry = parsed.lastEntry && isGameEntry(parsed.lastEntry) ? normalizeGameEntry(parsed.lastEntry) : null;

    return {
      thresholdInput: parsed.thresholdInput,
      condition: parsed.condition,
      lastEntry,
      history,
    };
  } catch {
    return null;
  }
}

export function writeDiceGameState(state: PersistedDiceGameState): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {
   console.error(`[writeDiceGameState]:${e}`)
  }
}
