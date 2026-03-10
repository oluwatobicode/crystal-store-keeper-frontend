import { Loader2 } from "lucide-react";
import { useCustomers } from "../../hooks/useCustomers";
import { formatCurrency } from "../../utils/formatCurrency";
import type { Customer } from "../../types/Customers";

interface CustomerAnalyticsProps {
  onAddClick?: () => void;
}

const CustomerAnalytics = ({ onAddClick }: CustomerAnalyticsProps) => {
  const { allCustomers } = useCustomers();

  const isLoading = allCustomers?.isLoading;
  const customersResponse = allCustomers?.data?.data;
  const { data: customers } = customersResponse || {};

  const totalCustomers = customers?.length ?? 0;
  const businessCustomers =
    customers?.filter((c: Customer) => c.customerType === "business").length ??
    0;
  const individualCustomers =
    customers?.filter((c: Customer) => c.customerType === "individual")
      .length ?? 0;
  const totalRevenue =
    customers?.reduce(
      (sum: number, c: Customer) => sum + (c.totalSpent || 0),
      0,
    ) ?? 0;

  const customerTotal = [
    { title: "Total Customers", value: totalCustomers },
    { title: "Business Customers", value: businessCustomers },
    { title: "Individual Customers", value: individualCustomers },
    { title: "Total Revenue", value: formatCurrency(totalRevenue) },
  ];

  return (
    <div className="w-full max-w-[1090.5px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-0 py-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-[26px] font-bold leading-[21.6px] tracking-normal">
              Customer Management
            </h1>
            <p className="font-regular text-[14px] leading-[23.4px] tracking-normal text-[#71717A]">
              Manage customer relationships and accounts
            </p>
          </div>

          <button
            onClick={onAddClick}
            className="rounded-[8px] px-3 py-[12px] font-medium text-[12px] text-[#71717A]  leading-[16.2px] tracking-[0.9px] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Add Customer
          </button>
        </div>

        <div className="flex flex-col gap-[22.3px]">
          <div className="grid grid-cols-4 gap-[22.3px]">
            {isLoading ? (
              <div className="col-span-4 flex items-center justify-center py-10">
                <Loader2 className="animate-spin text-[#71717A]" size={28} />
              </div>
            ) : (
              customerTotal.map((ele, index) => (
                <div
                  key={index}
                  className="flex flex-col  border border-[#E4E4E7] w-full gap-[12px] rounded-[9px] bg-white px-8 py-[22px]"
                >
                  <p className="text-[12px] font-medium leading-[16.2px] tracking-[0.9px] uppercase text-[#71717A]">
                    {ele.title}
                  </p>

                  <h2 className="mb-1 text-[18.9px] font-bold leading-[28.8px] tracking-normal text-[#1D1D1D]">
                    {ele.value}
                  </h2>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerAnalytics;
