import { AlertTriangle } from "lucide-react";

// Data transcribed from your latest screenshot
const reorderAlertsData = [
  {
    id: 1,
    name: "Blue Emulsion 2.5L",
    status: "Critical",
    current: 3,
    reorderLevel: 8,
    daysLeft: "~3 days left",
    suggestedOrder: 36,
  },
  {
    id: 2,
    name: "Paint Thinner 1L",
    status: "Critical",
    current: 2,
    reorderLevel: 8,
    daysLeft: "~3 days left",
    suggestedOrder: 36,
  },
];

const ReorderProductsAlerts = () => {
  return (
    <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
      <div className="flex items-center gap-[10px]">
        <AlertTriangle size={20} className="text-[#1D1D1D]" />
        <h2 className="text-[16px] font-medium text-[#71717A] tracking-[0.5px]">
          Reorder Alerts ({reorderAlertsData.length} items)
        </h2>
      </div>

      <div className="flex flex-col gap-[16px]">
        {reorderAlertsData.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAFAFB] border border-[#F4F4F5] rounded-[8px] p-[24px] flex flex-row items-center justify-between"
          >
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[12px]">
                <h3 className="text-[14px] font-medium text-[#1D1D1D]">
                  {item.name}
                </h3>
                <span className="bg-[#FF3B30] text-white text-[10px] font-medium px-[8px] py-[3px] rounded-full uppercase">
                  {item.status}
                </span>
              </div>
              <p className="text-[12px] text-[#71717A] font-medium">
                Current: <span className="text-[#1D1D1D]">{item.current}</span>{" "}
                <span className="mx-1 text-[#E4E4E7]">|</span> Reorder Level:{" "}
                <span className="text-[#1D1D1D]">{item.reorderLevel}</span>{" "}
                <span className="mx-1 text-[#E4E4E7]">|</span> {item.daysLeft}
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
        ))}
      </div>
    </div>
  );
};

export default ReorderProductsAlerts;
