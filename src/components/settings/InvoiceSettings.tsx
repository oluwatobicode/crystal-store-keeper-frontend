import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const InvoiceSettingsSchema = z.object({
  prefix: z
    .string()
    .min(1, { message: "Invoice prefix must be at least 1 character" }),
  startingNumber: z
    .string()
    .min(1, { message: "Starting number must be at least 1" }),
  paymentTerms: z
    .string()
    .min(5, { message: "Default terms must be at least 5 characters" }),
  notes: z
    .string()
    .min(5, { message: "Invoice notes must be at least 5 characters" }),
});

type InvoiceFormData = z.infer<typeof InvoiceSettingsSchema>;

const InvoiceSettings = () => {
  const { getSettings, updateSettings } = useSettings();
  const settingsData = getSettings?.data?.data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSettingsSchema),
  });

  useEffect(() => {
    if (settingsData?.invoice) {
      const inv = settingsData.invoice;
      setValue("prefix", inv.prefix || "");
      setValue("startingNumber", String(inv.startingNumber || ""));
      setValue("paymentTerms", inv.paymentTerms || "");
      setValue("notes", inv.notes || "");
    }
  }, [settingsData, setValue]);

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      await updateSettings.mutateAsync({
        invoice: {
          prefix: data.prefix,
          startingNumber: Number(data.startingNumber),
          paymentTerms: data.paymentTerms,
          notes: data.notes,
        },
      });
      toast.success("Invoice settings saved");
    } catch {
      toast.error("Failed to save invoice settings");
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
        <h1 className="font-medium gap-[8px] flex flex-row items-center uppercase text-black text-[15px] tracking-[0.9px] leading-tight">
          <span>
            <FileText size={20} />
          </span>
          Invoice Settings
        </h1>
        <p className="font-medium text-[#71717A] tracking-[0.9px] leading-tight text-[13px]">
          Configure invoice numbering and default terms
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-[16px]"
      >
        <div className="flex flex-row gap-[19px]">
          <div className="flex-1 max-w-[510px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              Invoice Prefix
            </label>
            <input
              type="text"
              placeholder="e.g. INV-"
              {...register("prefix")}
              className="w-full mt-[8px] bg-[#FAFAFB] text-[13px] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.prefix && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.prefix.message}
              </span>
            )}
          </div>

          <div className="flex-1 max-w-[510px]">
            <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
              Starting Number
            </label>
            <input
              type="text"
              placeholder="e.g. 001"
              {...register("startingNumber")}
              className="w-full mt-[8px] bg-[#FAFAFB] outline-none text-[13px] transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.startingNumber && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.startingNumber.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Default Payment Terms
          </label>
          <input
            type="text"
            placeholder="e.g. Due on Receipt, Net 30"
            {...register("paymentTerms")}
            className="w-full mt-[8px] bg-[#FAFAFB] outline-none text-[12px] transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.paymentTerms && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.paymentTerms.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Invoice Notes / Disclaimer
          </label>
          <textarea
            placeholder="Thank you for your business..."
            {...register("notes")}
            className="w-full mt-[8px] bg-[#FAFAFB] outline-none text-[13px] transition-colors h-[80px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px] resize-none"
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

export default InvoiceSettings;
