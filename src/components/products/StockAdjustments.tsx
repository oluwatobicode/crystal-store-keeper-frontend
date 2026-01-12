import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

type StockAdjustmentFormData = {
  productId: string;
  adjustmentType: "add" | "deduct" | "correction" | "";
  quantity: string;
  reason: string;
};

const StockAdjustments = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StockAdjustmentFormData>({
    defaultValues: {
      productId: "",
      adjustmentType: "",
      quantity: "",
      reason: "",
    },
  });

  const onSubmit = async (data: StockAdjustmentFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Adjustment Submitted:", {
      ...data,
      quantity: parseInt(data.quantity, 10),
    });
    reset();
  };

  return (
    <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[4px]">
        <h2 className="text-[16px] font-bold text-[#1D1D1D] uppercase tracking-[0.9px]">
          Stock Adjustments
        </h2>
      </div>

      <div className="flex flex-col gap-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Product
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
              />
              <input
                type="text"
                placeholder="Search product..."
                {...register("productId", {
                  required: "Please select a product",
                })}
                className="w-full h-[44px] bg-white border border-[#E2E4E9] rounded-[8px] pl-9 pr-3 text-[13px] outline-none  transition-colors"
              />
            </div>
            {errors.productId && (
              <span className="text-red-500 text-[11px]">
                {errors.productId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Adjustment Type
            </label>
            <div className="relative w-full">
              <select
                {...register("adjustmentType", {
                  required: "Select adjustment type",
                })}
                className="w-full h-[44px] cursor-pointer bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] text-[#71717A] appearance-none outline-none  transition-colors"
              >
                <option value="">Select type</option>
                <option value="add">Stock In (Found/Return)</option>
                <option value="deduct">Stock Out (Damaged/Lost)</option>
                <option value="correction">Correction (Audit)</option>
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

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
              Quantity Change
            </label>
            <input
              type="number"
              placeholder="+/- quantity"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                validate: (value) => {
                  const num = parseInt(value, 10);
                  if (isNaN(num)) return "Must be a valid number";
                  if (!Number.isInteger(num)) return "Must be a whole number";
                  return true;
                },
              })}
              className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none  transition-colors placeholder:text-[#A1A1AA]"
            />
            {errors.quantity && (
              <span className="text-red-500 text-[11px]">
                {errors.quantity.message}
              </span>
            )}
          </div>
        </div>

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
            className="w-full h-[44px] bg-[#FAFAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none  transition-colors placeholder:text-[#A1A1AA]"
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
