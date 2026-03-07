import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PremiumCard = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900">
          Premium Plan Management
        </h2>
        <p className="text-sm text-gray-600">
          Create, edit, and monitor your premium subscription plans with ease.
        </p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="default"
            className="text-white bg-green-500 hover:bg-green-400 cursor-pointer "
          >
            Add New Plan
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Premium Plan</AlertDialogTitle>
            <div className="flex flex-col w-full items-center gap-3">
              <Field>
                <Input className="w-full" placeholder="Insert customer name" />
              </Field>
              <Field>
                <Input className="w-full" placeholder="Insert total premi" />
              </Field>
              <Field>
                <Input className="w-full" placeholder="Insert paid a month" />
              </Field>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PremiumCard;
