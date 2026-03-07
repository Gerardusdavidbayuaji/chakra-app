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

import { payments } from "@/utils/apis/installments";
import type { IPayment } from "@/utils/apis/installments";

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
  const paymentList: IPayment[] = payments;

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
            {paymentList.map((payment) => (
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
