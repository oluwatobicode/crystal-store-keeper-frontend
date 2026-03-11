import { Loader2, ReceiptText } from "lucide-react";
import { useReports } from "../../hooks/useReports";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import type { DailyBreakdown } from "../../types/Reports";

const SalesReport = () => {
  const { salesAnalysis } = useReports();

  const isLoading = salesAnalysis?.isLoading;
  const reportResponse = salesAnalysis?.data?.data;
  const { data: reportData } = reportResponse || {};

  const summary = reportData?.summary;
  const dailyBreakdown: DailyBreakdown[] = reportData?.dailyBreakdown ?? [];

  const summaryCards = summary
    ? [
        {
          title: "Total Sales",
          value: formatCurrency(summary.totalSale),
        },
        {
          title: "Transactions",
          value: summary.totalTransactions,
        },
        {
          title: "Avg. Transaction Value",
          value: formatCurrency(summary.averageTransactionsValue),
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-[22.3px]">
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-[#71717A]" size={32} />
        </div>
      ) : !summary ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <ReceiptText className="text-[#71717A]" size={36} />
          <p className="text-[14px] text-[#71717A] font-medium">
            No sales data available yet
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-[22px]">
            {summaryCards.map((ele, index: number) => (
              <div
                className="bg-white border border-[#E2E4E9]  flex flex-col gap-[24px] py-5 px-10 rounded-[9px]"
                key={index}
              >
                <h2 className="text-[12px] font-medium leading-[16.2px] tracking-[0.9px] uppercase text-[#71717A]">
                  {ele.title}
                </h2>

                <div className="flex flex-col items-start justify-between gap-[2px]">
                  <h2 className="mb-1 text-[18.9px] font-bold leading-[28.8px] tracking-normal text-[#1D1D1D]">
                    {ele.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#E2E4E9] w-full flex flex-col items-start justify-center h-auto px-[24px] py-[24px]">
            <h1 className="uppercase font-medium text-[20px] mb-5 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
              Daily Sales Breakdown
            </h1>

            {dailyBreakdown.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 w-full">
                <ReceiptText className="text-[#71717A]" size={32} />
                <p className="text-[14px] text-[#71717A] font-medium">
                  No daily breakdown data available
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="border-b border-[#DEDEDE]">
                  <tr>
                    {["Date", "Sales", "Transactions", "Avg Value"].map(
                      (head) => (
                        <th
                          key={head}
                          className="p-4 text-xs font-medium text-[#6C7788] tracking-wider"
                        >
                          {head}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-[#E1E4EA]">
                  {dailyBreakdown.map((row: DailyBreakdown, index: number) => (
                    <tr key={index}>
                      <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                        {formatDate(row.date)}
                      </td>
                      <td className="p-4 text-xs  text-[#000000] font-bold tracking-wider">
                        {formatCurrency(row.totalSale)}
                      </td>
                      <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                        {row.totalTransactions}
                      </td>
                      <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                        {formatCurrency(row.averageTransactionsValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReport;
