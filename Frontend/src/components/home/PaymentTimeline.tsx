import { paymentItems } from "@/utils/apis/home";
import PaymentItemCard from "./PaymentItemCard";
import { Calendar } from "lucide-react";

const PaymentTimeline = () => {
  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-900" />
        <h2 className="text-xl font-bold text-gray-900">Payment Timeline</h2>
      </div>

      <div className="relative">
        {paymentItems.map((payment) => (
          <PaymentItemCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default PaymentTimeline;
