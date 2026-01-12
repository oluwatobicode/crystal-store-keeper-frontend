import { useState } from "react";
import AllProducts from "./AllProducts";
import ReceiveStock from "./ReceiveStock";
import AdjustStocks from "./StockAdjustments";
import ReorderProductsAlerts from "./ReordderProductsAlerts";

const Tabs = [
  { productTab: "Overview" },
  { productTab: "Receive Stock" },
  { productTab: "Adjust Stocks" },
  { productTab: "Reorder Products Alerts" },
] as const;

type ProductTabType = (typeof Tabs)[number]["productTab"];

const ProductsTabs = () => {
  const [activeTab, setActiveTab] = useState<ProductTabType>("Overview");

  return (
    <div className="flex flex-col mt-4 gap-[24px]">
      <div className="w-full px-2 bg-[#EDEDED]/50  rounded-[12px] h-[41px] flex items-center gap-[25px]">
        {Tabs.map((ele, index) => (
          <button
            onClick={() => setActiveTab(ele.productTab)}
            key={index}
            className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-[12px] py-[4px] px-[3px] rounded-[8px] ${
              activeTab === ele.productTab
                ? "bg-white text-[#1D1D1D]"
                : "text-[#71717A] hover:bg-white/50"
            }`}
          >
            {ele.productTab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && <AllProducts />}
      {activeTab === "Receive Stock" && <ReceiveStock />}
      {activeTab === "Adjust Stocks" && <AdjustStocks />}
      {activeTab === "Reorder Products Alerts" && <ReorderProductsAlerts />}
    </div>
  );
};

export default ProductsTabs;
