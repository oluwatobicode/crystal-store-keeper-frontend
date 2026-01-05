import AllPayments from "../components/payments/AllPayments";
import PaymentsHeader from "../components/payments/PaymentsHeader";

const Payments = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <PaymentsHeader />
      <AllPayments />
    </div>
  );
};
export default Payments;
