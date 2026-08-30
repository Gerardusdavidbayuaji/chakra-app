export type InstallmentStatus =
  | "Pending"
  | "Reminder1Sent"
  | "Reminder2Sent"
  | "Paid"
  | "Overdue";

export interface IInstallmentItem {
  id: string;
  premiId: string;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: InstallmentStatus;
  reminderCount: number;
  midtransOrderId: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IPayment {
  id: string;
  installment: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Overdue" | "Pending";
  paidDate?: string;
  reminder: number;
}
