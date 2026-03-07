import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

const SupportSection = () => {
  return (
    <div className="pb-3 pt-8 space-y-8">
      <div className="rounded-2xl bg-linear-to-r from-gray-900 to-gray-800 p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500">
              <HelpCircle className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Need help with your plan?</h3>
              <p className="mt-1 text-gray-300">
                Talk to our advisors about adjusting your payment schedule.
              </p>
            </div>
          </div>
          <Button className="whitespace-nowrap bg-transparent border border-white text-white hover:bg-white hover:text-gray-900">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
