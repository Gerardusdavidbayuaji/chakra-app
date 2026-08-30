import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import PaymentItemCard from "./PaymentItemCard";
import {
  getInstallmentsByPremiId,
  type IInstallmentItem,
} from "@/utils/apis/installments";

const DUE_SOON_DAYS = 7;

const isDueSoon = (installment: IInstallmentItem): boolean => {
  if (installment.status === "Paid" || installment.status === "Overdue") {
    return false;
  }
  const now = new Date();
  const dueDate = new Date(installment.dueDate);
  const diffMs = dueDate.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= DUE_SOON_DAYS;
};

const PaymentTimeline = () => {
  const [installments, setInstallments] = useState<IInstallmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const data = await getInstallmentsByPremiId(
          "b2fd4248-5111-4c8f-9a92-08c2dbaabe7c",
        );
        setInstallments(data);
      } catch (error) {
        console.error("Error fetching installments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstallments();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (installments.length === 0) return <div>No installments found</div>;

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-900" />
        <h2 className="text-xl font-bold text-gray-900">Payment Timeline</h2>
      </div>

      <div className="relative">
        {installments.map((installment) => (
          <PaymentItemCard
            key={installment.id}
            installment={installment}
            isDueSoon={isDueSoon(installment)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentTimeline;
