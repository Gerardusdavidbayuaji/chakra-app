import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "Paid", fill: "#0ea5e9", value: 65 },
  { name: "Pending", fill: "#a3a3a3", value: 20 },
  { name: "Overdue", fill: "#ea580c", value: 15 },
];

const COLORS = ["#0ea5e9", "#a3a3a3", "#ea580c"];

export const InstallmentStatus = () => {
  return (
    <Card className="p-3 gap-0 bg-white">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Installment Status
        </h3>
        <p className="text-sm text-gray-600">Current month distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart responsive={true}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InstallmentStatus;
