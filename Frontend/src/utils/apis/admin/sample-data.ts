import type { IMetricCard, ICustomer } from "./type";

export const metrics: IMetricCard[] = [
  {
    label: "Total Active Premiums",
    value: 4032000000,
    change: 12.5,
    changeType: "positive",
  },
  {
    label: "Total Completed",
    value: 2872672000,
    change: 5.2,
    changeType: "positive",
  },
  {
    label: "Overdue Installments",
    value: 1872672000,
    change: 2.4,
    changeType: "negative",
  },
];

export const customers: ICustomer[] = [
  {
    id: 1,
    name: "Andi Saputra",
    email: "andi.saputra@mail.com",
    plan: "Enterprise Suite",
    amount: 210000000,
    progress: 42,
    duration: "5/12",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Budi Santoso",
    email: "budi.santoso@mail.com",
    plan: "Standard Business",
    amount: 75500000,
    progress: 67,
    duration: "8/12",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
