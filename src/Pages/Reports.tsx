import ReportsAnalyticsHeader from "../components/reports/ReportsAnalyticsHeader";
import ReportsAnalyticsTabs from "../components/reports/ReportsAnalyticsTabs";

const Reports = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6">
      <ReportsAnalyticsHeader />
      <ReportsAnalyticsTabs />
    </div>
  );
};
export default Reports;
