import { ArrowDown, ArrowUp, Loader2, PackageOpen } from "lucide-react";
import { useReports } from "../../hooks/useReports";
import type {
  StockMovementByType,
  StockMovementByProduct,
} from "../../types/Reports";

const TYPE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; icon: "up" | "down" }
> = {
  sale: {
    label: "Sale",
    bg: "bg-orange-100",
    text: "text-orange-700",
    icon: "down",
  },
  receive: {
    label: "Received",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: "up",
  },
  adjustment: {
    label: "Adjustment",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: "down",
  },
};

const StockMovement = () => {
  const { stockMovement } = useReports();

  const isLoading = stockMovement?.isLoading;
  const reportResponse = stockMovement?.data?.data;
  const { data: reportData } = reportResponse || {};

  const byType: StockMovementByType[] = reportData?.byType ?? [];
  const byProduct: StockMovementByProduct[] = reportData?.byProduct ?? [];

  return (
    <div className="w-full bg-white p-[24px] h-auto min-h-[300px]">
      <h2 className="font-semibold text-[20px] mb-8 text-[#1D1D1D]">
        Stock Movement Report
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-[#71717A]" size={32} />
        </div>
      ) : byType.length === 0 && byProduct.length === 0 ? (
        <div className="flex flex-col items-center gap-[18px] justify-center h-[200px]">
          <PackageOpen className="text-[#71717A]" size={32} />
          <h1 className="text-[#71717A] text-[12px] font-medium tracking-[0.9px] leading-[16.2px] max-w-[350px] text-center">
            Stock movement tracking will be available after inventory
            transactions are recorded.
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-[32px]">
          <div className="grid grid-cols-3 gap-[16px]">
            {byType.map((item: StockMovementByType, index: number) => {
              const config = TYPE_CONFIG[item.movementType] || {
                label: item.movementType,
                bg: "bg-gray-100",
                text: "text-gray-700",
                icon: "down",
              };
              return (
                <div
                  key={index}
                  className="border border-[#E2E4E9] rounded-[9px] py-5 px-6 flex flex-col gap-[12px]"
                >
                  <div
                    className={`flex items-center gap-2 w-fit px-2 py-1 rounded-md text-[11px] font-bold uppercase ${config.bg} ${config.text}`}
                  >
                    {config.icon === "up" ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {config.label}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-[#1D1D1D]">
                      {item.totalMovements.toLocaleString()} {item.movementType === 'sale' ? 'sales transactions' : 'transactions'}
                    </span>
                    <span className="text-[12px] font-medium text-[#71717A]">
                      {item.movementType === 'sale' ? 'Items sold' : item.movementType === 'receive' ? 'Items received' : 'Items adjusted'}:{" "}
                      <span
                        className={
                          item.totalQuantityChange >= 0
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {item.totalQuantityChange > 0 ? "+" : ""}
                        {item.totalQuantityChange.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[600px]">
              <thead className="border-b border-[#E1E4EA]">
                <tr>
                  {[
                    "Product",
                    "Received",
                    "Deducted",
                    "Net Change",
                    "Current Stock",
                  ].map((head) => (
                    <th
                      key={head}
                      className="p-4 text-xs font-medium text-[#6C7788] tracking-wider whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E4EA]">
                {byProduct.map((row: StockMovementByProduct, index: number) => (
                  <tr key={index}>
                    <td className="p-4 text-xs font-medium text-[#1D1D1D] whitespace-nowrap">
                      {row.productName}
                    </td>
                    <td className="p-4 text-xs font-medium text-green-600 whitespace-nowrap">
                      {row.totalReceived > 0
                        ? `+${row.totalReceived.toLocaleString()}`
                        : row.totalReceived.toLocaleString()}
                    </td>
                    <td className="p-4 text-xs font-medium text-red-500 whitespace-nowrap">
                      {row.totalDeducted > 0
                        ? `-${row.totalDeducted.toLocaleString()}`
                        : row.totalDeducted.toLocaleString()}
                    </td>
                    <td className="p-4 text-xs font-bold whitespace-nowrap">
                      <span
                        className={
                          row.netChange >= 0 ? "text-green-600" : "text-red-500"
                        }
                      >
                        {row.netChange > 0 ? "+" : ""}
                        {row.netChange.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium text-[#1D1D1D] whitespace-nowrap">
                      {row.currentStock !== undefined ? row.currentStock.toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMovement;
