import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import ApprovalModal from "../../ui/ApprovalModal";

const lowStockData = [
  {
    name: "Premium White Paint 5L",
    currentStock: "3",
    reorderAt: 10,
  },
  {
    name: "Premium White Paint 5L",
    currentStock: "3",
    reorderAt: 10,
  },
  {
    name: "Premium White Paint 5L",
    currentStock: "3",
    reorderAt: 10,
  },
  {
    name: "Premium White Paint 5L",
    currentStock: "3",
    reorderAt: 10,
  },
  {
    name: "Premium White Paint 5L",
    currentStock: "3",
    reorderAt: 10,
  },
];

const DashboardLowStock = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="w-full bg-white border border-[#E2E4E9] h-auto px-5 py-10 rounded-[9px]">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center  gap-[8px] mb-2">
          <TriangleAlert className="text-[#F59F0A]" size={20} />
          <h2 className="text-[#000000] text-[15px] leading-[16.2px] tracking-[0.9px] font-medium uppercase">
            Low Stock Alert
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {lowStockData.map((el, index) => (
            <div
              className="py-5 px-3 bg-[#F0F2F480] rounded-[12px] flex flex-row justify-between items-center "
              key={index}
            >
              <div className="flex flex-col items-start gap-[4px]">
                <h3 className="text-[#000000] font-normal tracking-normal leading-[23.4px]">
                  {el.name}
                </h3>

                <div className="flex flex-row items-center justify-center gap-2">
                  <p className="text-[10px] text-[#71717A] font-medium leading-[16.2px] tracking-[0.9px]">
                    Current: {el.currentStock}
                  </p>

                  <span className="text-[10px] text-[#71717A]">|</span>

                  <p className="text-[10px] text-[#71717A] font-medium leading-[16.2px] tracking-[0.9px]">
                    Reorder at: {el.reorderAt}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="cursor-pointer px-3 py-1.5 border-[2px] border-[#EEEFF2] transition-colors rounded-[8px] text-[12px] font-medium text-[#000000]"
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && <ApprovalModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DashboardLowStock;
