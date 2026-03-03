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

interface Payment {
  id: string;
  installment: string;
  dueDate: string;
  amount: string;
  status: "Paid" | "Overdue" | "Pending";
  paidDate?: string;
  reminder: number;
}

const payments: Payment[] = [
  {
    id: "1",
    installment: "#001",
    dueDate: "Oct 12, 2023",
    amount: "$1,050.00",
    status: "Paid",
    paidDate: "Oct 11, 2023",
    reminder: 1,
  },
  {
    id: "2",
    installment: "#002",
    dueDate: "Nov 12, 2023",
    amount: "$1,050.00",
    status: "Paid",
    paidDate: "Nov 12, 2023",
    reminder: 1,
  },
  {
    id: "3",
    installment: "#003",
    dueDate: "Dec 12, 2023",
    amount: "$1,050.00",
    status: "Overdue",
    reminder: 3,
  },
  {
    id: "4",
    installment: "#004",
    dueDate: "Jan 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "5",
    installment: "#005",
    dueDate: "Feb 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "6",
    installment: "#006",
    dueDate: "Mar 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "7",
    installment: "#007",
    dueDate: "Apr 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "8",
    installment: "#008",
    dueDate: "May 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "9",
    installment: "#009",
    dueDate: "Jun 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "10",
    installment: "#010",
    dueDate: "Jul 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "11",
    installment: "#011",
    dueDate: "Aug 12, 2024",
    amount: "$1,050.00",
    status: "Pending",
    reminder: 0,
  },
  {
    id: "12",
    installment: "#012",
    dueDate: "Sep 12, 2024",
    amount: "$1,050.00",
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
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell className="font-semibold">
                  {payment.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(payment.status)} text-xs font-semibold`}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.paidDate || "-"}</TableCell>
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
