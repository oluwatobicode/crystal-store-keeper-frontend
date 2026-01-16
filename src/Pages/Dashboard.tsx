import DashboardCards from "../components/dashboard/DashboardCards";
import DashboardLowStock from "../components/dashboard/DashboardLowStock";
import DashboardRecentTransactions from "../components/dashboard/DashboardRecentTransactions";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <DashboardCards />
      <div className="grid grid-cols-2 mt-5 gap-[26px]">
        <DashboardLowStock />
        <DashboardRecentTransactions />
      </div>
    </div>
  );
};
export default Dashboard;
