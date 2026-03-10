import { Loader2, PackageOpen } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import type { Products } from "../../types/Producst";

const AllProducts = () => {
  const { allProducts } = useProducts();

  const isLoading = allProducts?.isLoading;
  const productsResponse = allProducts?.data?.data;
  const { data: products } = productsResponse || {};

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-[#71717A]" size={32} />
        </div>
      ) : !products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <PackageOpen className="text-[#71717A]" size={36} />
          <p className="text-[14px] text-[#71717A] font-medium">
            Click on the add icon to start adding products to your store
          </p>
        </div>
      ) : (
        products.map((product: Products) => (
          <div
            key={product._id}
            className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-[12px]">
                <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.5px]">
                  {product.name}
                </h2>

                <span
                  className={`px-[10px] py-[4px] rounded-full text-[11px] font-medium uppercase tracking-wide ${
                    product.currentStock <= product.reorderLevel
                      ? "bg-[#FF3B30] text-white"
                      : "bg-[#1A47FE] text-white"
                  }`}
                >
                  {product.currentStock <= product.reorderLevel
                    ? "Critical"
                    : "In Stock"}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[24px] font-bold text-[#1D1D1D] leading-none">
                  {product.currentStock}
                </span>
                <span className="text-[11px] font-medium text-[#71717A]">
                  Current Stock
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[20px] w-full max-w-[80%]">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-medium text-[#71717A] uppercase">
                  SKU
                </span>
                <span className="text-[13px] font-medium text-[#1D1D1D]">
                  {product.SKU}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-medium text-[#71717A] uppercase">
                  Brand
                </span>
                <span className="text-[13px] font-medium text-[#1D1D1D]">
                  {product.brand}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-medium text-[#71717A] uppercase">
                  Location
                </span>
                <span className="text-[13px] font-medium text-[#1D1D1D]">
                  {product.location}
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-medium text-[#71717A] uppercase">
                  Unit
                </span>
                <span className="text-[13px] font-medium text-[#1D1D1D]">
                  {product.unit}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-[-40px]">
              <div className="flex flex-col items-end gap-[4px]">
                <div className="flex flex-col items-end">
                  <p className="text-[11px] text-[#71717A] font-medium">
                    Reorder at:{" "}
                    <span className="text-[#1D1D1D]">
                      {product.reorderLevel}
                    </span>
                  </p>
                  <p className="text-[11px] text-[#71717A] font-bold">
                    Preferred stock level:{" "}
                    <span className="text-[#1D1D1D]">
                      {product.preferredStockLevel}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProducts;
