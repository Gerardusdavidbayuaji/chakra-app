import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "../ui/field";
import { Input } from "../ui/input";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CustomerInformation = () => {
  return (
    <Card className="p-3 bg-white">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/premium-plan">
                  Premium Plan
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Customer Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h3>
        <div className="flex w-full items-center gap-3 py-2">
          <Field>
            <Input className="w-full" placeholder="Insert customer name" />
          </Field>
          <Field>
            <Input className="w-full" placeholder="Insert total premi" />
          </Field>
          <Field>
            <Input className="w-full" placeholder="Insert paid a month" />
          </Field>
          <Button className=" bg-gray-900 hover:bg-gray-800 text-white font-semibold cursor-pointer">
            Update Installment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CustomerInformation;
