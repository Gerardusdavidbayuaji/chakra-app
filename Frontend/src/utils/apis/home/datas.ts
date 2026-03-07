import type { IPaymentItem } from ".";

export const paymentItems: IPaymentItem[] = [
  {
    id: "1",
    month: "January",
    date: "2022-01-01",
    amount: 100,
    status: "complated",
  },
  {
    id: "2",
    month: "February",
    date: "2022-02-01",
    amount: 200,
    status: "due-soon",
  },
  {
    id: "3",
    month: "March",
    date: "2022-03-01",
    amount: 300,
    status: "up-coming",
  },
];
