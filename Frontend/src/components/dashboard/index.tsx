import InstallmentStatus from "./InstallmentStatus";
import RecentCustomers from "./RecentCustomers";
import RevenueChart from "./RevenueChart";
import MetricsCards from "./MetricsCards";

const DashboardSection = () => {
  return (
    <section className="h-auto w-full flex flex-col gap-3">
      <MetricsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <InstallmentStatus />
      </div>
      <RecentCustomers />
    </section>
  );
};

export default DashboardSection;
