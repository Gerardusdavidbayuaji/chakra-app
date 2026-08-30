export type PremiStatus = "Active" | "Completed" | "Cancelled";

export interface IPremiDetail {
  id: string;
  userId: string;
  totalAmount: number;
  installmentAmount: number;
  tenor: number;
  dueDay: number;
  gracePeriodDays: number;
  startDate: string;
  status: PremiStatus;
  createdAt: string;
  updatedAt: string;
  installmentsPaid: number;
  remainingAmount: number;
  nextDueDate: string | null;
}
