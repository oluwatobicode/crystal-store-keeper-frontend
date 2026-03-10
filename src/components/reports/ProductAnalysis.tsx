import { Loader2, PackageOpen } from "lucide-react";
import { useReports } from "../../hooks/useReports";
import { formatCurrency } from "../../utils/formatCurrency";
import type { ProductAnalysis as ProductAnalysisType } from "../../types/Reports";

const ProductAnalysis = () => {
  const { productAnalysis } = useReports();

  const isLoading = productAnalysis?.isLoading;
  const reportResponse = productAnalysis?.data?.data;
  const { data: reportData } = reportResponse || {};

  const products: ProductAnalysisType[] = reportData?.products ?? [];

  return (
    <div className="bg-white w-full flex flex-col items-start justify-center h-auto p-[24px]">
      <h2 className="uppercase font-medium text-[20px] mb-5 tracking-[0.9px] leading-[16.2px] text-[#71717A]">
        Top selling products
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 w-full">
          <Loader2 className="animate-spin text-[#71717A]" size={32} />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3 w-full">
          <PackageOpen className="text-[#71717A]" size={32} />
          <p className="text-[14px] text-[#71717A] font-medium">
            No product sales data available yet
          </p>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="border-b border-[#E1E4EA]">
            <tr>
              {[
                "Product",
                "Quantity",
                "Sales",
                "Transactions",
                "Avg Value",
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

          <tbody className="bg-white divide-y divide-[#DEDEDE]">
            {products.map((row: ProductAnalysisType, index: number) => (
              <tr key={index}>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.productName}
                </td>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.totalQuantitySold}
                </td>
                <td className="p-4 text-xs font-medium text-[#069F3E] tracking-wider">
                  {formatCurrency(row.totalRevenue)}
                </td>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {row.totalTransactions}
                </td>
                <td className="p-4 text-xs font-medium text-[#000000] tracking-wider">
                  {formatCurrency(row.avgValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductAnalysis;
