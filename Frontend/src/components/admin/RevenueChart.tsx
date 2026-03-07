import { Card } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "JAN", value: 2400 },
  { month: "FEB", value: 3800 },
  { month: "MAR", value: 2800 },
  { month: "APR", value: 3200 },
  { month: "MAY", value: 2600 },
  { month: "JUN", value: 3100 },
];

const RevenueChart = () => {
  return (
    <Card className="p-3 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Revenue Growth
          </h3>
          <p className="text-sm text-gray-600">
            Monthly financial performance overview
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
          Last 6 Months
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          responsive={true}
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            cursor={{ stroke: "#e5e7eb" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="#dbeafe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
