export type Condition = "greater" | "less";

export type GameEntry = {
  id: string;
  playedAt: number;
  threshold: number;
  condition: Condition;
  result: number;
  isWin: boolean;
};
