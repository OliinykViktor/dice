import {
  alpha,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import type { Condition } from "@/src/entities/game/model/types";
import { MAX_RESULT, MIN_THRESHOLD } from "@/src/shared/config/game";
import { uiColors, uiMotion, uiRadius, uiShadow, uiSize, uiSpacing, uiTypography, uiZIndex } from "@/src/shared/ui/tokens";

const SLIDER_LABEL_ID = "threshold-slider-label";

type PlayDiceFormProps = {
  thresholdInput: string;
  condition: Condition;
  isThresholdValid: boolean;
  currentResult: number;
  resultAnimationTick: number;
  onThresholdInputChange: (value: string) => void;
  onConditionChange: (value: Condition) => void;
  onPlay: () => void;
};

export function PlayDiceForm(props: PlayDiceFormProps) {
  const {
    thresholdInput,
    condition,
    isThresholdValid,
    currentResult,
    resultAnimationTick,
    onThresholdInputChange,
    onConditionChange,
    onPlay,
  } = props;
  const parsedThreshold = Number.parseInt(thresholdInput, 10);
  const sliderValue = Number.isInteger(parsedThreshold)
    ? Math.min(MAX_RESULT, Math.max(MIN_THRESHOLD, parsedThreshold))
    : MIN_THRESHOLD;
  const sliderProgress = ((sliderValue - MIN_THRESHOLD) / (MAX_RESULT - MIN_THRESHOLD)) * 100;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          width: "100%",
          maxWidth: uiSize.formMaxWidth,
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            height: { xs: 140, sm: 200 },
            display: "grid",
            placeItems: "center",
            borderRadius: 0.5,
            bgcolor: uiColors.surfaceMuted,
          }}
        >
          <Typography
            key={`${currentResult}-${resultAnimationTick}`}
            sx={{
              fontSize: { xs: uiTypography.resultXs, sm: uiTypography.resultSm },
              lineHeight: uiTypography.resultLineHeight,
              fontWeight: 300,
              color: uiColors.textPrimary,
              animation: `resultPop ${uiMotion.resultPop} cubic-bezier(0.2, 0.9, 0.2, 1)`,
              "@keyframes resultPop": {
                "0%": { opacity: 0.35, transform: "translateY(6px) scale(0.94)" },
                "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
              },
            }}
          >
            {currentResult}
          </Typography>
        </Box>

        <RadioGroup
          name="guess-condition"
          row
          value={condition}
          onChange={(event) => onConditionChange(event.target.value as Condition)}
          sx={{ justifyContent: "center", gap: 2, "& .MuiFormControlLabel-label": { color: uiColors.textPrimary } }}
        >
          <FormControlLabel
            value="less"
            labelPlacement="start"
            control={
              <Radio
                size="small"
                sx={{
                  color: uiColors.radioUnchecked,
                  "&.Mui-checked": { color: uiColors.sliderMain },
                }}
              />
            }
            label="Under"
          />
          <FormControlLabel
            value="greater"
            labelPlacement="start"
            control={
              <Radio
                size="small"
                sx={{
                  color: uiColors.radioUnchecked,
                  "&.Mui-checked": { color: uiColors.sliderMain },
                }}
              />
            }
            label="Over"
          />
        </RadioGroup>

        <Box>
          <Box sx={{ position: "relative", pt: 3 }}>
            <Typography
              id={SLIDER_LABEL_ID}
              className="_SliderLabel"
              variant="body2"
              fontWeight={500}
              sx={{
                color: uiColors.white,
                bgcolor: uiColors.sliderLabelBackground,
                width: uiSize.sliderLabelWidth,
                height: uiSize.sliderLabelHeight,
                px: 0,
                display: "grid",
                placeItems: "center",
                position: "absolute",
                left: `${sliderProgress}%`,
                transform: "translateX(-50%)",
                top: "-14px",
                zIndex: uiZIndex.sliderLabel,
                pointerEvents: "none",
                transition: uiMotion.sliderLabel,
                lineHeight: uiTypography.sliderLabelLineHeight,
                fontSize: uiTypography.bodySm,
                borderRadius: uiRadius.sm,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  bottom: "-5px",
                  width: uiSize.sliderLabelPointer,
                  height: uiSize.sliderLabelPointer,
                  backgroundColor: uiColors.sliderLabelBackground,
                  transform: "translateX(-50%) rotate(45deg)",
                },
              }}
            >
              {sliderValue}
            </Typography>
            <Slider
              value={sliderValue}
              min={MIN_THRESHOLD}
              max={MAX_RESULT}
              step={1}
              onChange={(_, value) => onThresholdInputChange(String(value))}
              aria-labelledby={SLIDER_LABEL_ID}
              getAriaValueText={(value) => `Threshold ${value}`}
              sx={{
                color: uiColors.sliderMain,
                "&:hover": { color: uiColors.sliderHover },
                "& .MuiSlider-track": { border: "none", height: 3 },
                "& .MuiSlider-rail": { height: 3, color: alpha(uiColors.sliderRail, 0.26) },
                "& .MuiSlider-thumb": {
                  width: 14,
                  height: 14,
                  boxShadow: uiShadow.none,
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(156, 39, 176, 0.18)",
                  },
                },
              }}
            />
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: -0.4 }}>
            <Typography variant="body2" sx={{ color: uiColors.textSecondary }}>
              {MIN_THRESHOLD}
            </Typography>
            <Typography variant="body2" sx={{ color: uiColors.textSecondary }}>
              {MAX_RESULT}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={onPlay}
        disabled={!isThresholdValid}
        sx={{
          width: "100%",
          maxWidth: uiSize.formMaxWidth,
          alignSelf: "center",
          mt: uiSpacing.sm,
          minHeight: 42,
          py: uiSpacing.xs,
          px: "22px",
          borderRadius: 0.8,
          fontWeight: 500,
          fontSize: uiTypography.titleSm,
          lineHeight: uiTypography.buttonLineHeight,
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          bgcolor: uiColors.buttonMain,
          color: uiColors.white,
          boxShadow: uiShadow.buttonDefault,
          transition: uiMotion.button,
          "&:hover": {
            bgcolor: uiColors.buttonHover,
            boxShadow: uiShadow.buttonHover,
          },
          "&:active": {
            transform: "translateY(1px)",
          },
          "&.Mui-disabled": {
            bgcolor: uiColors.buttonDisabled,
            color: uiColors.white,
          },
        }}
      >
        PLAY
      </Button>
    </>
  );
}
