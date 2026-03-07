import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

import { formatCurrency } from "@/utils/formatter";

interface Customer {
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

const customers: Customer[] = [
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

const RecentCustomers = () => {
  return (
    <Card className="p-3 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Recent Customers</h3>
        <Link to="/premium-plan">
          <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
            View All
          </button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Customer
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Plan Type
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Total Amount
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Progress
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={customer.avatar} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-gray-700">{customer.plan}</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(customer.amount)}
                </p>
              </TableCell>
              <TableCell>
                <div className="w-24">
                  <Progress
                    value={customer.progress}
                    className="h-1.5 bg-gray-200"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {customer.duration}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-500 bg-blue-50 rounded">
                  ● {customer.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentCustomers;
