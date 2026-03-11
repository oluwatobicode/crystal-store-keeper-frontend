import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import toast from "react-hot-toast";

type StockAdjustmentFormData = {
  productId: string;
  adjustmentType: string;
  quantityChange: string;
  reason: string;
};

interface Product {
  _id: string;
  name: string;
  currentStock: number;
}

const StockAdjustments = () => {
  const { allProducts, adjustStock } = useProducts();
  const products: Product[] = allProducts?.data?.data?.data || [];

  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StockAdjustmentFormData>({
    defaultValues: {
      productId: "",
      adjustmentType: "",
      quantityChange: "",
      reason: "",
    },
  });

  const selectedProductId = watch("productId");
  const selectedProduct = products.find((p) => p._id === selectedProductId);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()),
  );

  const handleSelectProduct = (product: Product) => {
    setValue("productId", product._id);
    setProductSearch(product.name);
    setShowProductDropdown(false);
  };

  const onSubmit = async (data: StockAdjustmentFormData) => {
    const qty = parseInt(data.quantityChange, 10);
    // For deductions (damage, lost), send negative quantity
    const quantityChange =
      data.adjustmentType === "damage" ||
      data.adjustmentType === "theft" ||
      data.adjustmentType === "supplier_return"
        ? -Math.abs(qty)
        : Math.abs(qty);

    try {
      const response = await adjustStock.mutateAsync({
        productId: data.productId,
        adjustmentType: data.adjustmentType,
        quantityChange,
        reason: data.reason,
      });

      const updatedProduct = response?.data?.data?.product;
      toast.success(
        `Stock adjusted! ${updatedProduct?.name || "Product"} new stock: ${updatedProduct?.currentStock ?? "N/A"}`,
      );
      reset();
      setProductSearch("");
    } catch {
      toast.error("Failed to adjust stock");
    }
  };

  if (allProducts.isLoading) {
    return (
      <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[4px]">
        <h2 className="text-[16px] font-bold text-[#1D1D1D] uppercase tracking-[0.9px]">
          Stock Adjustments
        </h2>
      </div>

      <div className="flex flex-col gap-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {/* Product search dropdown */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Product
            </label>
            <div className="relative">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setShowProductDropdown(true);
                  if (!e.target.value) setValue("productId", "");
                }}
                onFocus={() => setShowProductDropdown(true)}
                placeholder="Search product..."
                className="w-full h-[44px] bg-white border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
              />
              <input
                type="hidden"
                {...register("productId", {
                  required: "Please select a product",
                })}
              />

              {showProductDropdown && filteredProducts.length > 0 && (
                <div className="absolute z-10 top-[48px] left-0 w-full bg-white border border-[#E2E4E9] rounded-[8px] shadow-lg max-h-[200px] overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#FAFAFB] transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-[#1D1D1D]">
                        {product.name}
                      </span>
                      <span className="text-[11px] text-[#71717A]">
                        Stock: {product.currentStock}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.productId && (
              <span className="text-red-500 text-[11px]">
                {errors.productId.message}
              </span>
            )}
            {selectedProduct && (
              <p className="text-[11px] text-[#71717A]">
                Current stock: {selectedProduct.currentStock} units
              </p>
            )}
          </div>

          {/* Adjustment Type */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Adjustment Type
            </label>
            <div className="relative w-full">
              <select
                {...register("adjustmentType", {
                  required: "Select adjustment type",
                })}
                className="w-full h-[44px] cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] text-[#71717A] appearance-none outline-none transition-colors"
              >
                <option value="">Select type</option>
                <option value="initial_count">Initial Count (Restock)</option>
                <option value="return">Customer Return</option>
                <option value="damage">Damage (Loss)</option>
                <option value="theft">Theft (Loss)</option>
                <option value="supplier_return">Supplier Return</option>
                <option value="correction">Audit Correction</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
              />
            </div>
            {errors.adjustmentType && (
              <span className="text-red-500 text-[11px]">
                {errors.adjustmentType.message}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              {...register("quantityChange", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors placeholder:text-[#A1A1AA]"
            />
            {errors.quantityChange && (
              <span className="text-red-500 text-[11px]">
                {errors.quantityChange.message}
              </span>
            )}
          </div>
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Reason
          </label>
          <input
            type="text"
            placeholder="Describe the reason for adjustment..."
            {...register("reason", {
              required: "Reason is required",
              minLength: {
                value: 5,
                message: "Please provide a valid reason (min 5 chars)",
              },
            })}
            className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors placeholder:text-[#A1A1AA]"
          />
          {errors.reason && (
            <span className="text-red-500 text-[11px]">
              {errors.reason.message}
            </span>
          )}
        </div>

        <div className="mt-2">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="h-[44px] cursor-pointer px-4 bg-[#2474F5] text-white rounded-[8px] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 w-fit disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : null}
            Apply Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustments;
