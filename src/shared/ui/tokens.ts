export const uiColors = {
  white: "#fff",
  pageBackground: "#ffffff",
  surfaceMuted: "rgba(0, 0, 0, 0.04)",
  textPrimary: "rgba(0, 0, 0, 0.87)",
  textSecondary: "#6b7280",
  divider: "#e5e7eb",
  sliderMain: "#c026d3",
  sliderHover: "var(--secondary-main, #9C27B0)",
  sliderRail: "#c026d3",
  sliderLabelBackground: "#757575",
  radioUnchecked: "#9ca3af",
  buttonMain: "#9c27b0",
  buttonHover: "#8e24aa",
  buttonDisabled: "#d8b4e6",
  toastSuccess: "#16a34a",
  toastError: "#d32f2f",
  resultSuccess: "#1B5E20",
  resultError: "#C62828",
  spinner: "#9c27b0",
} as const;

export const uiSpacing = {
  xxs: "4px",
  xs: "8px",
  sm: "16px",
  md: "24px",
} as const;

export const uiSize = {
  formMaxWidth: "320px",
  pageContentWidth: "600px",
  sliderLabelWidth: "41px",
  sliderLabelHeight: "36px",
  sliderLabelPointer: "10px",
  toastWidthSm: "460px",
  toastMaxWidth: "560px",
  toastIconTopPadding: "10px",
} as const;

export const uiRadius = {
  sm: "4px",
} as const;

export const uiShadow = {
  buttonDefault: "0px 3px 1px -2px #00000033, 0px 2px 2px 0px #00000024, 0px 1px 5px 0px #0000001F",
  buttonHover: "0px 3px 6px #00000033",
  none: "none",
} as const;

export const uiTypography = {
  titleSm: "15px",
  bodySm: "14px",
  resultXs: "72px",
  resultSm: "96px",
  resultLineHeight: "117%",
  sliderLabelLineHeight: "157%",
  buttonLineHeight: "26px",
} as const;

export const uiZIndex = {
  sliderLabel: 1,
} as const;

export const uiMotion = {
  fast: "120ms",
  normal: "180ms",
  resultPop: "360ms",
  rowFadeIn: "260ms",
  sliderLabel: "left 120ms linear",
  button: "background-color 180ms ease, box-shadow 180ms ease, transform 120ms ease",
} as const;

export const uiDurationMs = {
  toastEnter: 220,
  toastExit: 180,
} as const;
