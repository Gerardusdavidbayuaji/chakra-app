import CustomerInformation from "./CustomerInformation";
import PaymentScheduleTable from "./PaymentScheduleTable";

const InstallmentsSection = () => {
  return (
    <section className="flex flex-col gap-3 h-full w-full">
      <CustomerInformation />
      <div className="flex-1 min-h-0">
        <PaymentScheduleTable />
      </div>
    </section>
  );
};

export default InstallmentsSection;
