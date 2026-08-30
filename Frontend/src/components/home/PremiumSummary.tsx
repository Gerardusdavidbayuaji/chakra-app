import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { getPremiById } from "@/utils/apis/premi/api";
import type { IPremiDetail } from "@/utils/apis/premi";
import { formatCurrency, formatDateLong } from "@/utils/formatter";

const PremiumSummary = () => {
  const [premiDetail, setPremiDetail] = useState<IPremiDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPremiDetail = async () => {
      try {
        const detail = await getPremiById(
          "b2fd4248-5111-4c8f-9a92-08c2dbaabe7c",
        );

        setPremiDetail(detail);
      } catch (error) {
        console.error("Error fetching premium detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPremiDetail();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!premiDetail) return <div>Data not found</div>;

  const progress =
    premiDetail.tenor > 0
      ? (premiDetail.installmentsPaid / premiDetail.tenor) * 100
      : 0;

  const nextDue = formatDateLong(premiDetail.nextDueDate);

  return (
    <Card className="p-3">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Premium Summary
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatCurrency(premiDetail.remainingAmount)}
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
            {formatCurrency(premiDetail.totalAmount)}
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
            {premiDetail.installmentsPaid} of {premiDetail.tenor} Installments
            Paid
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
        {premiDetail.installmentsPaid >= premiDetail.tenor
          ? "All payments completed!"
          : `You're on track! Only ${premiDetail.tenor - premiDetail.installmentsPaid} payments left to complete your plan.`}
      </p>
    </Card>
  );
};

export default PremiumSummary;
