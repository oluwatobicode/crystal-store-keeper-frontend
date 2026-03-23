import { X, Mail, Phone, MapPin } from "lucide-react";
import type { Customer } from "../types/Customers";
import { formatCurrency } from "../utils/formatCurrency";

interface CustomerDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const CustomerModalDetails = ({
  isOpen,
  onClose,
  customer,
}: CustomerDetailsProps) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="w-[800px] max-h-[90vh] overflow-y-auto rounded-[12px] shadow-xl  bg-[#FAFAFB] border border-gray-100 flex flex-col">
        <div className="p-[24px]  flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
                {customer.fullname}
              </h1>
              <span className="bg-[#1A47FE] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {customer.customerType}
              </span>
            </div>
            <p className="text-[13px] text-[#71717A] font-medium">
              Customer ID: {customer.customerId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-[24px] flex flex-col gap-[24px] bg-[#FAFAFB]">
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
              <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                Contact Information
              </h3>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <Mail size={16} className="text-[#71717A]" />
                  {customer.email || "N/A"}
                </div>
                <div className="flex items-center gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <Phone size={16} className="text-[#71717A]" />
                  {customer.phone || "N/A"}
                </div>
                <div className="flex items-start gap-3 text-[#1D1D1D] text-[13px] font-medium">
                  <MapPin
                    size={16}
                    className="text-[#71717A] mt-0.5 shrink-0"
                  />
                  {customer.address || "N/A"}
                </div>
              </div>
            </div>

            <div className="bg-white p-[20px] rounded-[12px] border border-[#E4E4E7] flex flex-col gap-[16px]">
              <h3 className="text-[14px] font-bold text-[#1D1D1D]">
                Account Summary
              </h3>
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">
                    Total Spent
                  </span>
                  <span className="text-[#1D1D1D] font-bold">
                    {formatCurrency(customer.totalSpent)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">
                    Customer Type
                  </span>
                  <span className="text-[#1D1D1D] font-bold capitalize">
                    {customer.customerType}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#71717A] font-medium">
                    Credit Limit
                  </span>
                  <span className="text-[#1D1D1D] font-bold">
                    {formatCurrency(customer.creditLimit)}
                  </span>
                </div>
                <div className="h-[1px] bg-[#F4F4F5] my-1" />
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#1D1D1D] font-bold">
                    Current Balance
                  </span>
                  <span className="text-[#1D1D1D] font-bold">
                    {formatCurrency(customer.currentBalance)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 gap-[16px]">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-white p-[16px] rounded-[12px] border border-[#E4E4E7] flex flex-col items-center gap-2"
              >
                <Calendar size={20} className="text-[#1D1D1D]" />
                <span className="text-[11px] text-[#71717A] font-medium uppercase">
                  Last Purchase
                </span>
                <span className="text-[14px] text-[#1D1D1D] font-bold">
                  1/14/2024
                </span>
              </div>
            ))}
          </div> */}

          {/* <div className="flex flex-col gap-[12px]">
            <h3 className="text-[14px] font-bold text-[#1D1D1D]">
              Recent Transactions
            </h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerModalDetails;
