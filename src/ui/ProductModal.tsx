import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProducts } from "../hooks/useProducts";
import { useSuppliers } from "../hooks/useSuppliers";
import type { Supplier } from "../types/Supplier";
import toast from "react-hot-toast";
import {
  productSchema,
  type ProductFormData,
  type ProductModalProps,
} from "../types/Products";

const ProductModal = ({ isOpen, onClose }: ProductModalProps) => {
  const { createProduct } = useProducts();
  const { allSuppliers } = useSuppliers();
  const suppliers: Supplier[] = allSuppliers?.data?.data?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      currentStock: 0,
      reorderLevel: 0,
      preferredStockLevel: 0,
      purchaseCost: 0,
      sellingPrice: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct.mutateAsync(data);
      toast.success("Product created successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create product");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[700px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start sticky top-0 bg-white z-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              Add New Product
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              Create a new product record in your inventory
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#71717A] cursor-pointer hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] flex flex-col gap-[20px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {/* Name */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Product Name *
              </label>
              <input
                {...register("name")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
                placeholder="e.g. Pleated Skirt"
              />
              {errors.name && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Brand *
              </label>
              <input
                {...register("brand")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
                placeholder="e.g. StyleCore"
              />
              {errors.brand && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.brand.message}
                </span>
              )}
            </div>

            {/* SKU */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                SKU *
              </label>
              <input
                {...register("SKU")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
                placeholder="e.g. FS-SKIRT-031"
              />
              {errors.SKU && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.SKU.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Location *
              </label>
              <input
                {...register("location")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
                placeholder="e.g. Lagos Main Store"
              />
              {errors.location && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.location.message}
                </span>
              )}
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Unit *
              </label>
              <input
                {...register("unit")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
                placeholder="e.g. pcs, box, kg"
              />
              {errors.unit && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.unit.message}
                </span>
              )}
            </div>

            {/* Supplier */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Supplier (Optional)
              </label>
              <select
                {...register("supplierId")}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              >
                <option value="">Select a supplier</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-px bg-[#F4F4F5] my-2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            {/* Purchase Cost */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Purchase Cost *
              </label>
              <input
                type="number"
                {...register("purchaseCost", { valueAsNumber: true })}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              />
              {errors.purchaseCost && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.purchaseCost.message}
                </span>
              )}
            </div>

            {/* Selling Price */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Selling Price *
              </label>
              <input
                type="number"
                {...register("sellingPrice", { valueAsNumber: true })}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              />
              {errors.sellingPrice && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.sellingPrice.message}
                </span>
              )}
            </div>

            {/* Current Stock */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Initial Stock *
              </label>
              <input
                type="number"
                {...register("currentStock", { valueAsNumber: true })}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              />
              {errors.currentStock && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.currentStock.message}
                </span>
              )}
            </div>

            {/* Reorder Level */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Reorder Level *
              </label>
              <input
                type="number"
                {...register("reorderLevel", { valueAsNumber: true })}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              />
              {errors.reorderLevel && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.reorderLevel.message}
                </span>
              )}
            </div>

            {/* Preferred Stock level */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Preferred Level *
              </label>
              <input
                type="number"
                {...register("preferredStockLevel", { valueAsNumber: true })}
                className="h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none"
              />
              {errors.preferredStockLevel && (
                <span className="text-red-500 text-[11px] font-bold">
                  {errors.preferredStockLevel.message}
                </span>
              )}
            </div>

            {/* Is Active */}
            <div className="flex items-center gap-2 mt-auto pb-3">
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="w-4 h-4 text-[#2474F5] border-gray-300 rounded focus:ring-[#2474F5]"
              />
              <label
                htmlFor="isActive"
                className="text-[13px] font-medium text-[#1D1D1D]"
              >
                Active Product
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-[12px] mt-4 pt-4 border-t border-[#F4F4F5]">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] px-6 rounded-[8px] border border-[#E2E4E9] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[40px] px-6 rounded-[8px] bg-[#2474F5] text-[13px] font-bold text-white hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
