"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { createGameEntry, getRandomResult } from "@/src/entities/game/model/game-logic";
import type { Condition, GameEntry } from "@/src/entities/game/model/types";
import { HISTORY_LIMIT, MAX_RESULT, MIN_THRESHOLD } from "@/src/shared/config/game";
import { readDiceGameState, writeDiceGameState } from "./storage";

type UseDiceGameResult = {
  thresholdInput: string;
  condition: Condition;
  threshold: number;
  isThresholdValid: boolean;
  isHydratingFromStorage: boolean;
  resultAnimationTick: number;
  lastEntry: GameEntry | null;
  toastEntry: GameEntry | null;
  history: GameEntry[];
  setThresholdInput: (value: string) => void;
  setCondition: (value: Condition) => void;
  handlePlay: () => void;
  clearToast: () => void;
};

export function useDiceGame(): UseDiceGameResult {
  const [thresholdInput, setThresholdInput] = useState<string>("0");
  const [condition, setCondition] = useState<Condition>("greater");
  const [lastEntry, setLastEntry] = useState<GameEntry | null>(null);
  const [toastEntry, setToastEntry] = useState<GameEntry | null>(null);
  const [history, setHistory] = useState<GameEntry[]>([]);
  const [hasLoadedPersistedState, setHasLoadedPersistedState] = useState(false);
  const [resultAnimationTick, setResultAnimationTick] = useState(0);
  const hasUserInteractedRef = useRef(false);

  useEffect(() => {
    const persistedState = readDiceGameState();
    let isCancelled = false;

    queueMicrotask(() => {
      if (isCancelled) {
        return;
      }

      if (persistedState && !hasUserInteractedRef.current) {
        setThresholdInput(persistedState.thresholdInput);
        setCondition(persistedState.condition);
        setLastEntry(persistedState.lastEntry);
        setHistory(persistedState.history);
        if (persistedState.lastEntry) {
          setResultAnimationTick((prev) => prev + 1);
        }
      }

      setHasLoadedPersistedState(true);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedPersistedState) {
      return;
    }

    writeDiceGameState({
      thresholdInput,
      condition,
      lastEntry,
      history,
    });
  }, [condition, hasLoadedPersistedState, history, lastEntry, thresholdInput]);

  const threshold = useMemo(() => Number.parseInt(thresholdInput, 10), [thresholdInput]);
  const isThresholdValid = Number.isInteger(threshold) && threshold >= MIN_THRESHOLD && threshold <= MAX_RESULT;

  const setThresholdInputWithGuard = useCallback((value: string): void => {
    hasUserInteractedRef.current = true;
    setThresholdInput(value);
  }, []);

  const setConditionWithGuard = useCallback((value: Condition): void => {
    hasUserInteractedRef.current = true;
    setCondition(value);
  }, []);

  const handlePlay = useCallback((): void => {
    if (!isThresholdValid) {
      return;
    }

    hasUserInteractedRef.current = true;
    const result = getRandomResult();
    const entry = createGameEntry(result, threshold, condition);
    setLastEntry(entry);
    setToastEntry(entry);
    setHistory((prev) => [entry, ...prev].slice(0, HISTORY_LIMIT));
    setResultAnimationTick((prev) => prev + 1);
  }, [condition, isThresholdValid, threshold]);

  const clearToast = useCallback(() => {
    setToastEntry(null);
  }, []);

  return {
    thresholdInput,
    condition,
    threshold,
    isThresholdValid,
    isHydratingFromStorage: !hasLoadedPersistedState,
    resultAnimationTick,
    lastEntry,
    toastEntry,
    history,
    setThresholdInput: setThresholdInputWithGuard,
    setCondition: setConditionWithGuard,
    handlePlay,
    clearToast,
  };
}
