import PaymentTimeline from "./PaymentTimeline";
import PremiumSummary from "./PremiumSummary";
import SupportSection from "./SupportSection";

const HomeSection = () => {
  return (
    <div className="bg-red-500 h-full w-full">
      <PremiumSummary />
      <PaymentTimeline />
      <SupportSection />
    </div>
  );
};

export default HomeSection;
