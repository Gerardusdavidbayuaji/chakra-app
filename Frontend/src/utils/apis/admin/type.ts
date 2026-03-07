import type { ReactNode } from "react";

export interface IMetricCard {
  icon: ReactNode;
  label: string;
  value: number;
  change: number;
  changeType: "positive" | "negative";
}
