"use client";

import { Stack } from "@mui/material";

import { GameHistoryList } from "@/src/entities/game/ui/game-history-list";
import { LastGameResult } from "@/src/entities/game/ui/last-game-result";
import { useDiceGame } from "@/src/features/play-dice/model/use-dice-game";
import { PlayDiceForm } from "@/src/features/play-dice/ui/play-dice-form";
import { uiSpacing } from "@/src/shared/ui/tokens";

export function DiceGameWidget() {
  const {
    thresholdInput,
    condition,
    isThresholdValid,
    isHydratingFromStorage,
    resultAnimationTick,
    lastEntry,
    toastEntry,
    history,
    setThresholdInput,
    setCondition,
    handlePlay,
    clearToast,
  } = useDiceGame();

  return (
    <>
      <LastGameResult key={toastEntry?.id ?? "no-toast"} entry={toastEntry} onClose={clearToast} />
      <Stack spacing={uiSpacing.sm}>
        <PlayDiceForm
          thresholdInput={thresholdInput}
          condition={condition}
          isThresholdValid={isThresholdValid}
          currentResult={lastEntry?.result ?? 0}
          resultAnimationTick={resultAnimationTick}
          onThresholdInputChange={setThresholdInput}
          onConditionChange={setCondition}
          onPlay={handlePlay}
        />
        <GameHistoryList history={history} isLoading={isHydratingFromStorage} />
      </Stack>
    </>
  );
}
