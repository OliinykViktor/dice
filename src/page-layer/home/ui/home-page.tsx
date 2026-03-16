import { Box, Container } from "@mui/material";

import { uiColors, uiSize } from "@/src/shared/ui/tokens";
import { DiceGameWidget } from "@/src/widgets/dice-game/ui/dice-game-widget";

export function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: uiColors.pageBackground,
        py: { xs: 2, sm: 14 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: { xs: "100%", sm: uiSize.pageContentWidth },
          maxWidth: "100%",
          px: { xs: 2, sm: 0 },
        }}
      >
        <DiceGameWidget />
      </Container>
    </Box>
  );
}
