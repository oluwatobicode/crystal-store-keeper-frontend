import { useState } from "react";
import SalesReport from "./SalesReport";

const tabsSection = [
  { tab: "Sales Report" },
  { tab: "Product Analysis" },
  { tab: "Payment Methods" },
  { tab: "Stock Movement" },
] as const;

type TabType = (typeof tabsSection)[number]["tab"];

const ReportsAnalyticsTabs = () => {
  const [currentTab, setCurrentTab] = useState<TabType>("Sales Report");

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="w-full px-2 bg-[#EDEDE4]/20 bg-opacity-20 rounded-[12px] h-[41px] flex items-center gap-[25px]">
        {tabsSection.map((ele, index) => (
          <button
            key={index}
            onClick={() => setCurrentTab(ele.tab)}
            className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-[12px] py-[4px] px-[3px] rounded-[8px] ${
              currentTab === ele.tab
                ? "bg-white text-[#1D1D1D]"
                : "text-[#71717A] hover:bg-white/50"
            }`}
          >
            {ele.tab}
          </button>
        ))}
      </div>

      {currentTab === "Sales Report" && <SalesReport />}
    </div>
  );
};

export default ReportsAnalyticsTabs;
