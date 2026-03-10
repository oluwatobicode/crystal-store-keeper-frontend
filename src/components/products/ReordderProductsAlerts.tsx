import { AlertTriangle, Loader2 } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import type { LowStock } from "../../types/LowStock";

const ReorderProductsAlerts = () => {
  const { lowStockProducts } = useProducts();
  const isLoading = lowStockProducts?.isLoading;

  const productResponse = lowStockProducts?.data?.data;
  const { data: lowProducts } = productResponse || {};

  return (
    <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
      <div className="flex items-center gap-[10px]">
        <AlertTriangle size={20} className="text-[#1D1D1D]" />
        <h2 className="text-[16px] font-medium text-[#71717A] tracking-[0.5px]">
          Reorder Alerts ({lowProducts?.length ?? 0} items)
        </h2>
      </div>

      <div className="flex flex-col gap-[16px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-[#71717A]" size={32} />
          </div>
        ) : !lowProducts || lowProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <AlertTriangle className="text-[#71717A]" size={32} />
            <p className="text-[14px] text-[#71717A] font-medium">
              You're all stocked up - no reorder alerts!
            </p>
          </div>
        ) : (
          lowProducts.map((item: LowStock) => (
            <div
              key={item._id}
              className="bg-[#FAFAFB] border border-[#F4F4F5] rounded-[8px] p-[24px] flex flex-row items-center justify-between"
            >
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <h3 className="text-[14px] font-medium text-[#1D1D1D]">
                    {item.name}
                  </h3>
                  <span className="bg-[#FF3B30] text-white text-[10px] font-medium px-[8px] py-[3px] rounded-full uppercase">
                    {item.currentStock <= item.reorderLevel
                      ? "Critical"
                      : "In Stock"}
                  </span>
                </div>
                <p className="text-[12px] text-[#71717A] font-medium">
                  Current Stock:{" "}
                  <span className="text-[#1D1D1D]">{item.currentStock}</span>{" "}
                  <span className="mx-1 text-[#E4E4E7]">|</span> Reorder Level:{" "}
                  <span className="text-[#1D1D1D]">{item.reorderLevel}</span>{" "}
                  <span className="mx-1 text-[#E4E4E7]">|</span> {item.daysLeft}{" "}
                  Days Left
                </p>
              </div>

              <div className="flex items-center gap-[24px]">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-[#71717A] font-medium">
                    Suggested Order
                  </span>
                  <span className="text-[14px] font-medium text-[#1D1D1D]">
                    {item.suggestedOrder} units
                  </span>
                </div>

                <button className="h-[36px] cursor-pointer px-4 bg-[#2474F5] text-white rounded-[8px] text-[12px] font-medium transition-colors">
                  Reorder now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReorderProductsAlerts;
