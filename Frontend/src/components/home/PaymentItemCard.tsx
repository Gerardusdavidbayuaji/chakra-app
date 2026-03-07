import { Calendar, CheckCircle2, Lock } from "lucide-react";
import type { IPaymentItem } from "@/utils/apis/home";
import { Button } from "../ui/button";

const PaymentItemCard = ({ payment }: { payment: IPaymentItem }) => {
  const isCompleted = payment.status === "complated";
  const isDueSoon = payment.status === "due-soon";
  const isUpcoming = payment.status === "up-coming";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {isCompleted && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        )}
        {isDueSoon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white">
            <Calendar className="h-6 w-6" />
          </div>
        )}
        {isUpcoming && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-gray-600">
            <Lock className="h-6 w-6" />
          </div>
        )}
        <div className="mt-2 h-20 w-0.5 bg-gray-200" />
      </div>

      <div className="flex-1 pb-8">
        {isDueSoon ? (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded bg-orange-100 px-2 py-1 text-xs font-bold uppercase text-orange-600">
                Due Soon
              </span>
            </div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{payment.month}</h3>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <span className="font-semibold text-gray-900">
                ${payment.amount.toFixed(2)}
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
                className={`font-semibold ${isCompleted ? "text-gray-900" : "text-gray-500"}`}
              >
                {payment.month}
              </h3>
              <p className="text-sm text-gray-500">{payment.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${payment.amount.toFixed(2)}
              </p>
              <p
                className={`text-xs font-semibold uppercase ${
                  isCompleted ? "text-cyan-500" : "text-gray-500"
                }`}
              >
                {isCompleted ? "Completed" : "Upcoming"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentItemCard;
