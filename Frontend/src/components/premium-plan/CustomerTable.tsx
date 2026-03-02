import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Card } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { SquarePen, Trash, Trash2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { customers } from "@/utils/apis/premium-plan";
import { Progress } from "../ui/progress";
import { Link } from "react-router-dom";

const CustomerTable = () => {
  return (
    <Card className="p-3 gap-3 bg-white">
      <div className="flex items-center justify-end">
        <Field className="w-80">
          <ButtonGroup>
            <Input id="input-button-group" placeholder="Type to search..." />
            <Button variant="outline" className="cursor-pointer">
              Search
            </Button>
          </ButtonGroup>
        </Field>
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
              Current Premi
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Total Premi
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Progress
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Status
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Actions
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
                  {customer.currentPremi}
                </p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-gray-900">
                  {customer.totalPremi}
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
                {customer.status === "ACTIVE" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-green-500 bg-green-50 rounded">
                    ● {customer.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-500 bg-red-50 rounded">
                    ● {customer.status}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link to="/premium-plan/:planId">
                    <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors cursor-pointer bg-blue-100 p-1 rounded">
                      <SquarePen size={16} />
                    </button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer bg-red-100 p-1 rounded">
                        <Trash size={16} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete customer?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this customer. Are you
                          sure you want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction variant="destructive">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
};

export default CustomerTable;

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Chat</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
        <Trash2Icon />
      </AlertDialogMedia>
      <AlertDialogTitle>Delete chat?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete this chat conversation. View{" "}
        <a href="#">Settings</a> delete any memories saved during this chat.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
