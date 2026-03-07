export interface ICustomer {
  id: number;
  name: string;
  email: string;
  plan: string;
  currentPremi: string;
  totalPremi: string;
  progress: number;
  duration: string;
  status: "ACTIVE" | "INACTIVE";
  avatar: string;
}
