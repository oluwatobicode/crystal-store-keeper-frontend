import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

const approveFormData = z.object({
  managerPin: z
    .string()
    .min(4, { message: "PIN must be at least 4 digits" })
    .max(6, { message: "PIN cannot exceed 6 digits" })
    .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
  reason: z.string().min(3, { message: "A reason must be specified" }),
});

type approveFormSchema = z.infer<typeof approveFormData>;

interface ApprovalModalProps {
  onClose?: () => void;
  onApprove?: (data: approveFormSchema) => void;
}

const ApprovalModal = ({ onClose, onApprove }: ApprovalModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<approveFormSchema>({
    resolver: zodResolver(approveFormData),
  });

  const handleApprove: SubmitHandler<approveFormSchema> = (data) => {
    console.log("Authorized:", data);
    if (onApprove) onApprove(data);
  };

  return (
    <div className="w-full fixed h-screen inset-0 bg-[#000]/50 z-50 flex justify-center items-center">
      <div className="w-[446px] px-8 py-10 flex flex-col gap-[24px] rounded-[12px] bg-white shadow-xl border border-gray-100">
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[16px] font-semibold flex flex-row items-center gap-[12px] text-[#71717A] uppercase tracking-[0.9px]">
            <span>
              <Shield size={20} className="text-[#1D1D1D]" />
            </span>
            Manager Approval Required
          </h2>

          <div className="flex flex-col gap-[8px] bg-[#FAFAFB] p-[16px]">
            <h2 className="font-medium text-[12px] tracking-[0.9px] leading-[16.2px] text-[#71717A] uppercase">
              Action Requested:
            </h2>
            <p className="text-[14px] tracking-[0.5px] font-medium text-[#71717A]">
              Access Payments & Transactions
            </p>
          </div>

          <form
            className="space-y-5 border-b border-[#E4E4E7] pb-[24px]"
            onSubmit={handleSubmit(handleApprove)}
          >
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="managerPin"
                className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]"
              >
                Manager PIN
              </label>
              <input
                type="password"
                id="managerPin"
                placeholder="Enter 4-6 digit PIN"
                maxLength={6}
                className="w-full h-[48px] border placeholder:text-center placeholder:text-[13px] text-center text-[18px] tracking-[4px] font-bold text-[#1D1D1D] placeholder:font-medium placeholder:text-[#A1A1AA] border-[#E4E4E7] outline-none rounded-[12px] transition-colors px-3"
                {...register("managerPin")}
              />
              {errors.managerPin && (
                <p className="text-red-600 text-[11px] font-medium text-center">
                  {errors.managerPin.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D] tracking-[0.5px]">
                Reason (Required)
              </label>
              <textarea
                id="reason"
                placeholder="Enter a reason for override..."
                className="w-full border h-[80px] py-3 text-[14px] placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A1A1AA] border-[#E4E4E7] outline-none rounded-[12px] transition-colors px-3 resize-none"
                {...register("reason")}
              />
              {errors.reason && (
                <p className="text-red-600 text-[11px] font-medium">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="flex flex-row items-center justify-center gap-[12px] pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full h-[40px] rounded-[10px] border border-[#E4E4E7] hover:bg-gray-50 cursor-pointer transition-colors text-[13px] font-medium text-[#1D1D1D]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[40px] rounded-[10px] bg-[#1A47FE] hover:bg-blue-700 border border-[#1A47FE] cursor-pointer transition-colors text-[13px] font-medium text-white disabled:opacity-70"
              >
                Authorize
              </button>
            </div>
          </form>

          <div>
            <p className="text-[12px] font-medium text-[#71717A] leading-[18px]">
              This action requires manager authorization and will be logged in
              the audit trail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
