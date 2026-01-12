import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const InvoiceSettingsSchema = z.object({
  invoicePrefix: z
    .string()
    .min(1, { message: "Invoice prefix must be at least 1 character" }),
  startingNumber: z
    .string()
    .min(1, { message: "Starting number must be at least 1" }),
  defaultPaymentTerms: z
    .string()
    .min(5, { message: "Default terms must be at least 5 characters" }),
  invoiceNotes: z
    .string()
    .min(5, { message: "Invoice notes must be at least 5 characters" }),
});

type InvoiceFormData = z.infer<typeof InvoiceSettingsSchema>;

const InvoiceSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSettingsSchema),
    defaultValues: {
      invoicePrefix: "INV-",
      startingNumber: "1001",
      defaultPaymentTerms: "Due on Receipt",
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Invoice Settings Saved:", data);
  };

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
              {...register("invoicePrefix")}
              className="w-full mt-[8px] bg-[#FAFAFB] text-[13px] outline-none transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
            />
            {errors.invoicePrefix && (
              <span className="text-red-500 text-[10px] mt-1 block">
                {errors.invoicePrefix.message}
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
            {...register("defaultPaymentTerms")}
            className="w-full mt-[8px] bg-[#FAFAFB] outline-none text-[12px] transition-colors h-[43px] rounded-[8px] border border-[#E2E4E9] px-[12px] py-[8px]"
          />
          {errors.defaultPaymentTerms && (
            <span className="text-red-500 text-[10px] mt-1 block">
              {errors.defaultPaymentTerms.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium leading-[16.2px] tracking-[0.9px] text-[13px]">
            Invoice Notes / Disclaimer
          </label>
          <textarea
            placeholder="Thank you for your business..."
            {...register("invoiceNotes")}
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
