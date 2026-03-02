import type { ReactNode } from "react";

import { TrendingUp, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCard {
  icon: ReactNode;
  label: string;
  value: string;
  change: number;
  changeType: "positive" | "negative";
}

const metrics: MetricCard[] = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    label: "Total Active Premiums",
    value: "Rp 4.032.000.000",
    change: 12.5,
    changeType: "positive",
  },
  {
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Total Completed",
    value: "Rp 2.872.672.000",
    change: 5.2,
    changeType: "positive",
  },
  {
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Overdue Installments",
    value: "Rp 1.872.672.000",
    change: 2.4,
    changeType: "negative",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    label: "Total Revenue",
    value: "Rp 8.777.344.000",
    change: 18.0,
    changeType: "positive",
  },
];

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-3 gap-2 bg-white">
          <div className="flex items-start justify-between">
            <div
              className={`p-2 rounded-lg ${
                metric.icon &&
                (index === 0
                  ? "bg-blue-100"
                  : index === 1
                    ? "bg-green-100"
                    : index === 2
                      ? "bg-orange-100"
                      : "bg-purple-100")
              }`}
            >
              <div
                className={
                  index === 0
                    ? "text-blue-500"
                    : index === 1
                      ? "text-green-500"
                      : index === 2
                        ? "text-orange-500"
                        : "text-purple-500"
                }
              >
                {metric.icon}
              </div>
            </div>

            <span
              className={`text-sm font-medium ${
                metric.changeType === "positive"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metric.changeType === "positive" ? "+" : "-"}
              {Math.abs(metric.change)}%
            </span>
          </div>

          <p className="text-sm text-gray-600">{metric.label}</p>
          <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
