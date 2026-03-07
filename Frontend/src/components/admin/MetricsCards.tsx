import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formatter";
import { metrics } from "@/utils/apis/admin";
import { Card } from "@/components/ui/card";

const MetricsCards = () => {
  const [metric1, metric2, metric3] = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card className="p-3 gap-2 bg-white">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-500">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span
            className={`text-sm font-medium ${
              metric1.changeType === "positive"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {metric1.changeType === "positive" ? "+" : "-"}
            {Math.abs(metric1.change)}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{metric1.label}</p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(metric1.value)}
        </p>
      </Card>

      <Card className="p-3 gap-2 bg-white">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-green-100 text-green-500">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span
            className={`text-sm font-medium ${
              metric2.changeType === "positive"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {metric2.changeType === "positive" ? "+" : "-"}
            {Math.abs(metric2.change)}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{metric2.label}</p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(metric2.value)}
        </p>
      </Card>

      <Card className="p-3 gap-2 bg-white">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-orange-100 text-orange-500">
            <AlertCircle className="w-4 h-4" />
          </div>
          <span
            className={`text-sm font-medium ${
              metric3.changeType === "positive"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {metric3.changeType === "positive" ? "+" : "-"}
            {Math.abs(metric3.change)}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{metric3.label}</p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatCurrency(metric3.value)}
        </p>
      </Card>
    </div>
  );
};

export default MetricsCards;
