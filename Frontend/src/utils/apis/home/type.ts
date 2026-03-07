type PaymentStatus = "complated" | "due-soon" | "up-coming";

export interface IPaymentItem {
  id: string;
  month: string;
  date: string;
  amount: number;
  status: PaymentStatus;
}
