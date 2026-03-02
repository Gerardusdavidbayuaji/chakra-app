import CustomerTable from "./CustomerTable";
import PremiumCard from "./PremiumCard";

const PremiumPlanSection = () => {
  return (
    <section className="h-full w-full flex flex-col gap-3">
      <PremiumCard />
      <CustomerTable />
    </section>
  );
};

export default PremiumPlanSection;
