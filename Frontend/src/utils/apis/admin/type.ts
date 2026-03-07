export interface IMetricCard {
  label: string;
  value: number;
  change: number;
  changeType: "positive" | "negative";
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  plan: string;
  amount: number;
  progress: number;
  duration: string;
  status: "ACTIVE" | "INACTIVE";
  avatar: string;
}
