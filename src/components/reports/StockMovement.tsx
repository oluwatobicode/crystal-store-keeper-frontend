import { ArrowDown, ArrowUp } from "lucide-react";

interface StockMovementRow {
  product: string;
  type: "Restock" | "Sale";
  quantity: number;
  date: string;
  remaining: number;
}

const stockData: StockMovementRow[] = [];

// const stockData = [
//   {
//     product: "Premium White Paint 5L",
//     type: "Restock",
//     quantity: 50,
//     date: "16/08/2024",
//     remaining: 120,
//   },
//   {
//     product: "Dulux Matte Finish",
//     type: "Sale",
//     quantity: 12,
//     date: "16/08/2024",
//     remaining: 45,
//   },
//   {
//     product: "Wall Primer 4L",
//     type: "Sale",
//     quantity: 5,
//     date: "15/08/2024",
//     remaining: 20,
//   },
// ];

const StockMovement = () => {
  return (
    <div className="w-full bg-white p-[24px] h-auto min-h-[300px]">
      <h2 className="uppercase font-medium text-[20px] mb-8 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
        Stock Movement Report
      </h2>

      {stockData.length === 0 ? (
        <div className="flex flex-col items-center gap-[18px] justify-center h-[200px]">
          <h1 className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px] max-w-[350px] text-center">
            Stock movement tracking will be available after inventory
            transactions are recorded.
          </h1>
          <button className="w-[196px] h-[33px] rounded-[8px] text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px] bg-[#DEDEDE] hover:bg-gray-300 transition-colors">
            Configure Stock Tracking
          </button>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="border-b border-[#E1E4EA]">
            <tr>
              {[
                "Product",
                "Movement Type",
                "Quantity",
                "Date",
                "Stock Left",
              ].map((head) => (
                <th
                  key={head}
                  className="p-4 text-xs font-medium text-[#6C7788] tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E4EA]">
            {stockData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 text-xs font-medium text-[#6C7788]">
                  {row.product}
                </td>
                <td className="p-4 text-xs font-medium">
                  <div
                    className={`flex items-center gap-2 w-fit px-2 py-1 rounded-md text-[11px] font-bold uppercase ${
                      row.type === "Restock"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {row.type === "Restock" ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {row.type}
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-[#6C7788]">
                  {row.quantity} units
                </td>
                <td className="p-4 text-xs font-medium text-[#6C7788]">
                  {row.date}
                </td>
                <td className="p-4 text-xs font-medium text-[#1D1D1D]">
                  {row.remaining} available
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockMovement;
