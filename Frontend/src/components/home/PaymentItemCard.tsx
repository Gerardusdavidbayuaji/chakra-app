import { Calendar, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

import { formatDateLong, formatCurrency } from "@/utils/formatter";
import type { IInstallmentItem } from "@/utils/apis/installments";

interface PaymentItemCardProps {
  installment: IInstallmentItem;
  isDueSoon: boolean;
}

const PaymentItemCard = ({ installment, isDueSoon }: PaymentItemCardProps) => {
  const isOverdue = installment.status === "Overdue";
  const isPaid = installment.status === "Paid";

  const monthLabel = new Date(installment.dueDate).toLocaleDateString("id-ID", {
    month: "long",
  });

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {isPaid && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        )}
        {isOverdue && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
            <AlertTriangle className="h-6 w-6" />
          </div>
        )}
        {isDueSoon && !isPaid && !isOverdue && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white">
            <Calendar className="h-6 w-6" />
          </div>
        )}
        {!isPaid && !isOverdue && !isDueSoon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-gray-600">
            <Lock className="h-6 w-6" />
          </div>
        )}
        <div className="mt-2 h-20 w-0.5 bg-gray-200" />
      </div>

      <div className="flex-1 pb-8">
        {isDueSoon && !isPaid && !isOverdue ? (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded bg-orange-100 px-2 py-1 text-xs font-bold uppercase text-orange-600">
                Due Soon
              </span>
            </div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{monthLabel}</h3>
                <p className="text-sm text-gray-500">
                  {formatDateLong(installment.dueDate)}
                </p>
              </div>
              <span className="font-semibold text-gray-900">
                {formatCurrency(installment.amount)}
              </span>
            </div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Pay Now
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <h3
                className={`font-semibold ${isPaid ? "text-gray-900" : "text-gray-500"}`}
              >
                {monthLabel}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDateLong(installment.dueDate)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatCurrency(installment.amount)}
              </p>
              <p
                className={`text-xs font-semibold uppercase ${
                  isPaid
                    ? "text-cyan-500"
                    : isOverdue
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {isPaid ? "Completed" : isOverdue ? "Overdue" : "Upcoming"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentItemCard;
