"use client";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

import { getResultDirection } from "@/src/entities/game/model/game-logic";
import type { GameEntry } from "@/src/entities/game/model/types";
import { uiColors, uiDurationMs, uiRadius, uiShadow, uiSize, uiSpacing, uiTypography } from "@/src/shared/ui/tokens";

type LastGameResultProps = {
  entry: GameEntry | null;
  onClose: () => void;
};

const TOAST_DURATION_MS = 15000;

export function LastGameResult({ entry, onClose }: LastGameResultProps) {
  useEffect(() => {
    if (!entry) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, TOAST_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [entry, onClose]);

  if (!entry) {
    return null;
  }

  const direction = getResultDirection(entry.result, entry.threshold);
  const subtitle = direction === "equal" ? "Number was equal" : `Number was ${direction}`;

  return (
    <Snackbar
      open={Boolean(entry)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ width: "100%" }}
      slotProps={{ transition: { timeout: { enter: uiDurationMs.toastEnter, exit: uiDurationMs.toastExit } } }}
      onClose={(_, reason) => {
        if (reason !== "clickaway") {
          onClose();
        }
      }}
    >
      <Alert
        severity={entry.isWin ? "success" : "error"}
        variant="filled"
        icon={entry.isWin ? <CheckCircleRoundedIcon fontSize="small" /> : <ErrorOutlineRoundedIcon fontSize="small" />}
        sx={{
          width: { xs: "calc(100vw - 24px)", sm: uiSize.toastWidthSm },
          maxWidth: uiSize.toastMaxWidth,
          borderRadius: uiRadius.sm,
          alignItems: "flex-start",
          p: `${uiSpacing.xxs} ${uiSpacing.sm}`,
          boxShadow: uiShadow.none,
          bgcolor: entry.isWin ? uiColors.toastSuccess : uiColors.toastError,
          "& .MuiAlert-icon": { opacity: 1, mr: 1, color: uiColors.white, mt: 0, pt: uiSize.toastIconTopPadding },
        }}
      >
        <Stack spacing={0.3}>
          <Typography variant="subtitle2" fontWeight={500} sx={{ color: uiColors.white, fontSize: uiTypography.titleSm }}>
            {entry.isWin ? "You won" : "You lost"}
          </Typography>
          {!entry.isWin ? (
            <Typography variant="body2" sx={{ color: uiColors.white, fontWeight: 500 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
      </Alert>
    </Snackbar>
  );
}
