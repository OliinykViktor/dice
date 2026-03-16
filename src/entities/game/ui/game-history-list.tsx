import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { getConditionLabel } from "@/src/entities/game/model/game-logic";
import type { GameEntry } from "@/src/entities/game/model/types";
import { uiColors, uiMotion, uiSpacing, uiTypography } from "@/src/shared/ui/tokens";

type GameHistoryListProps = {
  history: GameEntry[];
  isLoading: boolean;
};

function formatTime(ts: number): string {
  const date = new Date(ts);
  return date.toLocaleTimeString("en-GB", { hour12: false });
}

export function GameHistoryList({ history, isLoading }: GameHistoryListProps) {
  return (
    <>
      {isLoading ? (
        <Box sx={{ mt: uiSpacing.sm, display: "grid", placeItems: "center", minHeight: 120 }}>
          <CircularProgress size={26} sx={{ color: uiColors.spinner }} />
        </Box>
      ) : history.length === 0 ? (
        <Typography variant="body2" sx={{ color: uiColors.textSecondary }}>
          No rolls yet.
        </Typography>
      ) : (
        <Box sx={{ mt: uiSpacing.sm }}>
          <Table
            size="small"
            sx={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "separate",
              borderSpacing: 0,
              "& .MuiTableCell-root": {
                p: uiSpacing.sm,
                borderBottom: `1px solid ${uiColors.divider}`,
                lineHeight: 1.35,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, fontSize: uiTypography.titleSm, color: uiColors.textPrimary, width: "34%" }}>
                  Time
                </TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: uiTypography.titleSm, color: uiColors.textPrimary, width: "33%" }}>
                  Guess
                </TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: uiTypography.titleSm, color: uiColors.textPrimary, width: "33%" }}>
                  Result
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  sx={{
                    animation: `rowFadeIn ${uiMotion.rowFadeIn} ease both`,
                    animationDelay: `${Math.min(index * 40, 240)}ms`,
                    "@keyframes rowFadeIn": {
                      "0%": { opacity: 0, transform: "translateY(4px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <TableCell sx={{ color: uiColors.textPrimary }}>{formatTime(entry.playedAt)}</TableCell>
                  <TableCell sx={{ color: uiColors.textPrimary }}>
                    {getConditionLabel(entry.condition)} {entry.threshold}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: entry.isWin ? uiColors.resultSuccess : uiColors.resultError,
                    }}
                  >
                    {entry.result}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
}
