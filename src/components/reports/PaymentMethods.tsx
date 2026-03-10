import { Loader2, CreditCard } from "lucide-react";
import { useReports } from "../../hooks/useReports";
import { formatCurrency } from "../../utils/formatCurrency";
import type { PaymentMethod } from "../../types/Reports";

const METHOD_COLORS: Record<string, string> = {
  cash: "#22C55E",
  pos: "#1A47FE",
  bank_transfer: "#F59E0B",
  card: "#8B5CF6",
};

const formatMethodName = (method: string) =>
  method.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const PaymentMethods = () => {
  const { paymentMethodAnalysis } = useReports();

  const isLoading = paymentMethodAnalysis?.isLoading;
  const reportResponse = paymentMethodAnalysis?.data?.data;
  const { data: reportData } = reportResponse || {};

  const grandTotal: number = reportData?.grandTotal ?? 0;
  const paymentMethods: PaymentMethod[] = reportData?.paymentMethods ?? [];

  return (
    <div className="w-full bg-white p-[24px] h-auto">
      <h2 className="uppercase font-medium text-[20px] mb-8 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
        Payment Method Analysis
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-[#71717A]" size={32} />
        </div>
      ) : paymentMethods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <CreditCard className="text-[#71717A]" size={32} />
          <p className="text-[14px] text-[#71717A] font-medium">
            No payment data available yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[32px] items-start justify-center w-full">
          {paymentMethods.map((item: PaymentMethod, index: number) => (
            <div
              key={index}
              className="w-full flex items-start justify-between"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-4 h-4 rounded-full mt-1 shrink-0"
                  style={{
                    backgroundColor: METHOD_COLORS[item.method] || "#E4E4E7",
                  }}
                ></div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[#1D1D1D] text-[14px] font-medium tracking-[0.9px] leading-[16.2px]">
                    {formatMethodName(item.method)}
                  </h3>
                  <p className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px]">
                    {item.totalTransactions} transactions
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 items-end">
                <h3 className="text-[#1D1D1D] text-[16px] font-medium tracking-[0.9px] leading-[16.2px]">
                  {formatCurrency(item.totalAmount)}
                </h3>
                <p className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px]">
                  {item.percentage}% of total
                </p>
              </div>
            </div>
          ))}

          <div className="w-full border-t border-t-[#DEDEDE] pt-6 mt-2 flex items-center justify-between">
            <h3 className="text-[#71717A] text-[14px] font-medium tracking-wide">
              Total Payments
            </h3>
            <h2 className="text-[#71717A] text-[24px] font-medium tracking-tight">
              {formatCurrency(grandTotal)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
