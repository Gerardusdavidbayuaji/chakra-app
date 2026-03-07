import PaymentTimeline from "./PaymentTimeline";
import PremiumSummary from "./PremiumSummary";
import SupportSection from "./SupportSection";

const HomeSection = () => {
  return (
    <div className="h-full w-full">
      <PremiumSummary />
      <PaymentTimeline />
      <SupportSection />
    </div>
  );
};

export default HomeSection;
