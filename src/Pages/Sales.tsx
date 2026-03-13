import Cart from "../components/sales/Cart";
import NewSale from "../components/sales/NewSale";
import PaymentCheckout from "../components/sales/PaymentCheckout";
import { SaleProvider } from "../contexts/SaleContext";

const Sales = () => {
  return (
    <SaleProvider>
      <div className="grid grid-cols-3 h-screen bg-[#FAFAFA] overflow-hidden">
        <NewSale />
        <Cart />
        <PaymentCheckout />
      </div>
    </SaleProvider>
  );
};

export default Sales;
