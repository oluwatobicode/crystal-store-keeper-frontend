import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Shield } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const SystemSettingsSchema = z.object({
  vatEnabled: z.boolean(),
  vatRate: z.string().optional(),
  managerApprovalDiscountThreshold: z
    .string()
    .min(1, "Must be a positive number"),
  sessionTimeoutMinutes: z.string().min(1, "Session timeout is required"),
  currency: z.string().min(1, "Currency is required"),
});

type SystemFormData = z.infer<typeof SystemSettingsSchema>;

const SystemSettings = () => {
  const { getSettings, updateSettings } = useSettings();
  const settingsData = getSettings?.data?.data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SystemFormData>({
    resolver: zodResolver(SystemSettingsSchema),
    defaultValues: {
      vatEnabled: false,
      currency: "NGN",
    },
  });

  const vatEnabled = watch("vatEnabled");

  useEffect(() => {
    if (settingsData?.system) {
      const sys = settingsData.system;
      setValue("vatEnabled", sys.vatEnabled ?? false);
      setValue("vatRate", String(sys.vatRate ?? ""));
      setValue(
        "managerApprovalDiscountThreshold",
        String(sys.managerApprovalDiscountThreshold ?? ""),
      );
      setValue(
        "sessionTimeoutMinutes",
        String(sys.sessionTimeoutMinutes ?? ""),
      );
      setValue("currency", sys.currency || "NGN");
    }
  }, [settingsData, setValue]);

  const onSubmit = async (data: SystemFormData) => {
    try {
      await updateSettings.mutateAsync({
        system: {
          vatEnabled: data.vatEnabled,
          vatRate: Number(data.vatRate) || 0,
          managerApprovalDiscountThreshold:
            Number(data.managerApprovalDiscountThreshold) || 0,
          sessionTimeoutMinutes: Number(data.sessionTimeoutMinutes) || 30,
          currency: data.currency,
        },
      });
      toast.success("System settings saved");
    } catch {
      toast.error("Failed to save system settings");
    }
  };

  if (getSettings.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] bg-white w-full h-auto px-[24px] py-[24px] border border-[#E2E4E9] rounded-[12px]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-medium gap-[10px] flex flex-row items-center uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
          <span>
            <Shield size={18} className="text-[#1D1D1D]" />
          </span>
          System Settings
        </h1>
        <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[12px]">
          Configure tax, security and operational settings
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-[24px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.9px]">
              Enable VAT/Tax
            </label>
            <p className="text-[12px] text-[#71717A]">
              Include tax calculations in invoices
            </p>
          </div>

          <button
            type="button"
            onClick={() => setValue("vatEnabled", !vatEnabled)}
            className={`w-[44px] h-[24px] rounded-full p-1 transition-colors duration-200 ease-in-out ${
              vatEnabled ? "bg-[#2474F5]" : "bg-[#E4E4E7]"
            }`}
          >
            <div
              className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                vatEnabled ? "translate-x-[20px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {vatEnabled && (
          <div className="flex flex-col gap-[8px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              VAT Rate (%)
            </label>
            <input
              type="text"
              {...register("vatRate")}
              placeholder="e.g. 7.5"
              className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
          </div>
        )}

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Manager Approval Required for Discounts Above (%)
          </label>
          <input
            type="text"
            {...register("managerApprovalDiscountThreshold")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.managerApprovalDiscountThreshold && (
            <span className="text-red-500 text-[10px]">
              {errors.managerApprovalDiscountThreshold.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Session Timeout (minutes)
          </label>
          <input
            type="text"
            {...register("sessionTimeoutMinutes")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.sessionTimeoutMinutes && (
            <span className="text-red-500 text-[10px]">
              {errors.sessionTimeoutMinutes.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Currency
          </label>
          <input
            type="text"
            readOnly
            {...register("currency")}
            className="w-full bg-[#FAFAFB] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] text-[#71717A] cursor-not-allowed"
          />
        </div>

        <div className="pt-[10px] flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1A47FE] text-white w-full max-w-[200px] h-[40px] rounded-[8px] font-medium text-[14px] tracking-[0.9px] hover:bg-blue-700 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;
