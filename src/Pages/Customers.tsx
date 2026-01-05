import AllCustomers from "../components/customers/AllCustomers";
import CustomerData from "../components/customers/CustomerAnalytics";

const Customers = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CustomerData />
      <AllCustomers />
    </div>
  );
};
export default Customers;
