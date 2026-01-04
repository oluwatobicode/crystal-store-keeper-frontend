import { History } from "lucide-react"; // Changed from TriangleAlert to History

const recentTransactions = [
  {
    invoiceNo: "INV-001",
    method: "Card",
    name: "Smith Construction",
    time: "2 mins ago",
    price: "₦245.5",
  },
  {
    invoiceNo: "INV-002",
    method: "Cash",
    name: "Smith Construction",
    time: "2 mins ago",
    price: "₦245.5",
  },
  {
    invoiceNo: "INV-003",
    method: "Transfer",
    name: "Smith Construction",
    time: "2 mins ago",
    price: "₦245.5",
  },
  {
    invoiceNo: "INV-004",
    method: "Cash",
    name: "Smith Construction",
    time: "2 mins ago",
    price: "₦245.5",
  },
];

const DashboardRecentTransactions = () => {
  return (
    <div className="w-full bg-white h-auto px-5 py-10 rounded-[9px]">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-[8px] mb-2">
          <History className="text-[#71717A]" size={20} />
          <h2 className="text-[#71717A] text-[14px] leading-[16.2px] tracking-[0.9px] font-medium uppercase">
            Recent Transactions
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {recentTransactions.map((el) => (
            <div
              key={el.invoiceNo}
              className="px-7 bg-[#F8F8F8] py-5 flex flex-row justify-between items-center rounded-lg"
            >
              <div className="flex flex-col items-start gap-[4px]">
                <div className="flex flex-row items-center gap-[6px]">
                  <h3 className="text-[#71717A] font-normal tracking-normal leading-[23.4px]">
                    {el.invoiceNo}
                  </h3>

                  <div className="cursor-pointer px-3 py-1 bg-[#1A47FE] text-white rounded-full text-[10px] font-medium shrink-0">
                    {el.method}
                  </div>
                </div>

                <h3 className="text-[#71717A] font-normal tracking-normal leading-[23.4px]">
                  {el.name}
                </h3>

                <p className="text-[10px] text-[#71717A] font-medium leading-[16.2px] tracking-[0.9px]">
                  {el.time}
                </p>
              </div>

              <div className="cursor-pointer px-3 py-1.5 bg-white hover:bg-gray-200 transition-colors rounded-[8px] text-[12px] font-medium text-[#71717A]">
                {el.price}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
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
