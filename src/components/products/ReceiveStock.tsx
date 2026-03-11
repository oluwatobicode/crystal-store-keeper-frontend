import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProducts } from "../../hooks/useProducts";
import { useSuppliers } from "../../hooks/useSuppliers";
import toast from "react-hot-toast";

const ReceiveStockSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  supplierId: z.string().min(1, "Please select a supplier"),
  quantity: z.string().min(1, "Quantity is required"),
  notes: z.string().optional(),
});

type ReceiveStockFormData = z.infer<typeof ReceiveStockSchema>;

interface Product {
  _id: string;
  name: string;
  currentStock: number;
}

interface Supplier {
  _id: string;
  name: string;
}

const ReceiveStock = () => {
  const { allProducts, receiveStock } = useProducts();
  const { allSuppliers } = useSuppliers();

  const products: Product[] = allProducts?.data?.data?.data || [];
  const suppliers: Supplier[] = allSuppliers?.data?.data?.data || [];

  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ReceiveStockFormData>({
    resolver: zodResolver(ReceiveStockSchema),
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

  const onSubmit = async (data: ReceiveStockFormData) => {
    try {
      const response = await receiveStock.mutateAsync({
        productId: data.productId,
        quantity: parseInt(data.quantity, 10),
        supplierId: data.supplierId,
        notes: data.notes || "",
      });

      const result = response?.data?.data;
      toast.success(
        `Received ${data.quantity} units of ${result?.product?.name || "product"} (Stock: ${result?.movement?.stockBefore} → ${result?.movement?.stockAfter})`,
      );

      reset();
      setProductSearch("");
    } catch {
      toast.error("Failed to receive stock");
    }
  };

  if (allProducts.isLoading || allSuppliers.isLoading) {
    return (
      <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[32px]"
    >
      <div className="flex flex-col gap-[4px]">
        <h2 className="text-[16px] font-bold text-[#1D1D1D] uppercase tracking-[0.9px]">
          Receive New Stock
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-[24px]">
        {/* Product selector */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Product
          </label>
          <div className="relative w-full">
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
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            <input type="hidden" {...register("productId")} />

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

        {/* Supplier selector */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Supplier
          </label>
          <div className="relative w-full">
            <select
              {...register("supplierId")}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] text-[#71717A] appearance-none outline-none transition-colors cursor-pointer"
            >
              <option value="">Select supplier</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
            />
          </div>
          {errors.supplierId && (
            <span className="text-red-500 text-[11px]">
              {errors.supplierId.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[24px]">
        {/* Quantity */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            {...register("quantity")}
            className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors placeholder:text-[#A1A1AA]"
          />
          {errors.quantity && (
            <span className="text-red-500 text-[11px]">
              {errors.quantity.message}
            </span>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-[8px]">
          <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
            Notes (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. New shipment arrival"
            {...register("notes")}
            className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors placeholder:text-[#A1A1AA]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-[12px] pt-4 border-t border-[#F4F4F5]">
        <button
          type="button"
          onClick={() => {
            reset();
            setProductSearch("");
          }}
          className="h-[40px] px-6 cursor-pointer bg-white border border-[#E2E4E9] rounded-[8px] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[40px] px-6 cursor-pointer bg-[#2474F5] text-white rounded-[8px] text-[13px] font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
          Receive Stock
        </button>
      </div>
    </form>
  );
};

export default ReceiveStock;
