import { Card } from "../ui/card";

const PremiumSummary = () => {
  const remaining = 2400;
  const totalBalance = 6000;
  const nextDue = "Oct 15";
  const installmentsPaid = 8;
  const totalInstallments = 12;
  const progress = (installmentsPaid / totalInstallments) * 100;

  return (
    <Card className="p-3">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Premium Summary
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            ${remaining.toLocaleString()}
          </span>
          <span className="text-gray-500">remaining</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Total Balance
          </p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalBalance.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Next Due
          </p>
          <p className="text-2xl font-bold text-gray-900">{nextDue}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {installmentsPaid} of {totalInstallments} Installments Paid
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-cyan-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="text-sm italic text-gray-500">
        You're on track! Only {totalInstallments - installmentsPaid} payments
        left to complete your plan.
      </p>
    </Card>
  );
};

export default PremiumSummary;
