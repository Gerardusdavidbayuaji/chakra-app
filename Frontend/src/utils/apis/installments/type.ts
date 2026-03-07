export interface IPayment {
  id: string;
  installment: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Overdue" | "Pending";
  paidDate?: string;
  reminder: number;
}
