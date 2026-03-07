import { TrendingUp, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import type { IMetricCard } from "./type";

export const metrics: IMetricCard[] = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    label: "Total Active Premiums",
    value: 4032000000,
    change: 12.5,
    changeType: "positive",
  },
  {
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Total Completed",
    value: 2872672000,
    change: 5.2,
    changeType: "positive",
  },
  {
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Overdue Installments",
    value: 1872672000,
    change: 2.4,
    changeType: "negative",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    label: "Total Revenue",
    value: 8777344000,
    change: 18.0,
    changeType: "positive",
  },
];
