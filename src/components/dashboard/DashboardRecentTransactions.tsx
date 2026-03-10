import { History, Loader2, ReceiptText } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatData";
import type { SaleRecord } from "../../types/SalesRecord";
import { getStyle } from "../../utils/getStyle";

const DashboardRecentTransactions = () => {
  const { recentSales } = useDashboard();

  const isLoading = recentSales?.isLoading;
  const recentSalesData = recentSales?.data?.data;
  const { data: salesData } = recentSalesData || {};

  return (
    <div className="w-full bg-white border border-[#E2E4E9] h-auto px-5 py-10 rounded-[9px]">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-[8px] mb-2">
          <History className="text-[#71717A]" size={20} />
          <h2 className="text-[#000000] text-[14px] leading-[16.2px] tracking-[0.9px] font-medium uppercase">
            Recent Transactions
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin text-[#71717A]" size={28} />
            </div>
          ) : !salesData || salesData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <ReceiptText className="text-[#71717A]" size={32} />
              <p className="text-[13px] text-[#71717A] font-medium">
                No recent transactions
              </p>
            </div>
          ) : (
            salesData.map((el: SaleRecord) => (
              <div
                key={el.invoiceId}
                className="px-7 bg-[#F8F8F8] py-5 flex flex-row justify-between items-center rounded-lg"
              >
                <div className="flex flex-col items-start gap-[4px]">
                  <div className="flex flex-row items-center gap-[6px]">
                    <h3 className="text-[#000000] font-normal tracking-normal leading-[23.4px]">
                      {el.invoiceId}
                    </h3>

                    <div
                      className={`cursor-pointer px-3 py-1 ${getStyle(
                        el.paymentStatus,
                      )} rounded-full text-[11px] font-semibold shrink-0`}
                    >
                      {el.paymentStatus.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-[#71717A] font-normal tracking-normal leading-[23.4px]">
                    {el.customerSnapshot?.name}
                  </h3>

                  <p className="text-[10px] text-[#71717A] font-medium leading-[16.2px] tracking-[0.9px]">
                    {formatDate(el.createdAt)}
                  </p>
                </div>

                <div className="cursor-pointer px-3 py-1.5 text-[14px] font-semibold text-[#000000] leading-[16.2px] tracking-[0.9px]">
                  {formatCurrency(el.grandTotal)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-[28px] w-full">
          <button className="px-7 bg-[#F8F8F8] hover:bg-gray-100 transition-colors py-5 text-[#71717A] font-medium leading-[16.2px] tracking-[0.9px] text-center cursor-pointer w-full rounded-lg">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentTransactions;
