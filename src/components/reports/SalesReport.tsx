import { ArrowUp } from "lucide-react";

const salesReport = [
  {
    title: "Today Sales",
    value: "₦7378.85",
    tag: "+12.5% vs last period",
  },
  {
    title: "Transactions",
    value: 74,
    tag: "+8.2% vs last period",
  },
  {
    title: "Avg. Transaction Value",
    value: "₦99.71",
    tag: "+3.8% vs last period",
  },
];

const dailySalesData = [
  {
    date: "Mon, 15 Jan",
    sales: "₦145,200.50",
    transactions: 42,
    avgValue: "₦3,457.15",
  },
  {
    date: "Tue, 16 Jan",
    sales: "₦98,450.00",
    transactions: 28,
    avgValue: "₦3,516.07",
  },
  {
    date: "Wed, 17 Jan",
    sales: "₦112,300.75",
    transactions: 35,
    avgValue: "₦3,208.59",
  },
  {
    date: "Thu, 18 Jan",
    sales: "₦156,890.20",
    transactions: 48,
    avgValue: "₦3,268.54",
  },
  {
    date: "Fri, 19 Jan",
    sales: "₦245,600.00",
    transactions: 72,
    avgValue: "₦3,411.11",
  },
  {
    date: "Sat, 20 Jan",
    sales: "₦189,450.50",
    transactions: 65,
    avgValue: "₦2,914.62",
  },
  {
    date: "Sun, 21 Jan",
    sales: "₦54,200.00",
    transactions: 15,
    avgValue: "₦3,613.33",
  },
];

const SalesReport = () => {
  return (
    <div className="flex flex-col gap-[22.3px]">
      <div className="grid grid-cols-3 gap-[22px]">
        {salesReport.map((ele, index) => (
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
              {ele.tag && (
                <p className="text-[11.7px] flex items-center gap-[3px] font-medium leading-[18.9px] uppercase tracking-[0.9px] text-[#22C55E]">
                  {ele.tag}
                  <ArrowUp size={11} />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E2E4E9] w-full flex flex-col items-start justify-center h-auto px-[24px] py-[24px]">
        <h1 className="uppercase font-medium text-[20px] mb-5 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
          Daily Sales Breakdown
        </h1>

        <table className="w-full text-left">
          <thead className="border-b border-[#DEDEDE]">
            <tr>
              {["Date", "Sales", "Transactions", "Avg Value"].map((head) => (
                <th
                  key={head}
                  className="p-4 text-xs font-medium text-[#6C7788] tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#E1E4EA]">
            {dailySalesData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.date}
                </td>
                <td className="p-4 text-xs  text-[#000000] font-bold tracking-wider">
                  {row.sales}
                </td>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.transactions}
                </td>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.avgValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
