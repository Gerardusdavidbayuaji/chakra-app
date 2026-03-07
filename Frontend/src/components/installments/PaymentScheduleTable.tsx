import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { formatDate, formatCurrency } from "@/utils/formatter";

interface Payment {
  id: string;
  installment: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Overdue" | "Pending";
  paidDate?: string;
  reminder: number;
}

const payments: Payment[] = [
  {
    id: "1",
    installment: "#001",
    dueDate: "2023-10-12",
    amount: 1050,
    status: "Paid",
    paidDate: "2023-10-11",
    reminder: 1,
  },
  {
    id: "2",
    installment: "#002",
    dueDate: "2023-11-12",
    amount: 1050,
    status: "Paid",
    paidDate: "2023-11-12",
    reminder: 1,
  },
  {
    id: "3",
    installment: "#003",
    dueDate: "2023-12-12",
    amount: 1050,
    status: "Overdue",
    reminder: 3,
  },
  {
    id: "4",
    installment: "#004",
    dueDate: "2024-01-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "5",
    installment: "#005",
    dueDate: "2024-02-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "6",
    installment: "#006",
    dueDate: "2024-03-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "7",
    installment: "#007",
    dueDate: "2024-04-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "8",
    installment: "#008",
    dueDate: "2024-05-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "9",
    installment: "#009",
    dueDate: "2024-06-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "10",
    installment: "#010",
    dueDate: "2024-07-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "11",
    installment: "#011",
    dueDate: "2024-08-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
  {
    id: "12",
    installment: "#012",
    dueDate: "2024-09-12",
    amount: 1050,
    status: "Pending",
    reminder: 0,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-blue-100 text-blue-700";
    case "Overdue":
      return "bg-orange-100 text-orange-700";
    case "Pending":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PaymentScheduleTable = () => {
  return (
    <Card className="p-3 bg-white h-full">
      <div className="h-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Installment
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Due Date
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Paid Date
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
                Remainders
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-semibold">
                  {payment.installment}
                </TableCell>
                <TableCell>{formatDate(payment.dueDate)}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(payment.amount)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(payment.status)} text-xs font-semibold`}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(payment.paidDate as string)}</TableCell>
                <TableCell>{payment.reminder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PaymentScheduleTable;
