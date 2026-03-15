import { X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SupplierSchema,
  type SupplierFormData,
  type Supplier,
} from "../types/Supplier";
import { useSuppliers } from "../hooks/useSuppliers";
import toast from "react-hot-toast";

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierToEdit?: Supplier | null;
}

const SupplierModal = ({
  isOpen,
  onClose,
  supplierToEdit,
}: SupplierModalProps) => {
  const isEditMode = !!supplierToEdit;
  const { createSupplier, updateSupplier } = useSuppliers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(SupplierSchema),
  });

  useEffect(() => {
    if (supplierToEdit) {
      setValue("name", supplierToEdit.name);
      setValue("contactPerson", supplierToEdit.contactPerson);
      setValue("phone", supplierToEdit.phone);
      setValue("email", supplierToEdit.email);
      setValue("address", supplierToEdit.address);
    } else {
      reset({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [supplierToEdit, setValue, reset]);

  const onSubmit = async (data: SupplierFormData) => {
    try {
      if (isEditMode && supplierToEdit) {
        await updateSupplier.mutateAsync({
          id: supplierToEdit._id,
          data,
        });
        toast.success("Supplier updated successfully");
      } else {
        await createSupplier.mutateAsync(data);
        toast.success("Supplier created successfully");
      }
      onClose();
    } catch {
      toast.error(
        isEditMode ? "Failed to update supplier" : "Failed to create supplier",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] bg-white rounded-[12px] shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="p-[24px] border-b border-[#F4F4F5] flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-bold uppercase tracking-[0.9px] text-[#1D1D1D]">
              {isEditMode ? "Edit Supplier" : "Add New Supplier"}
            </h1>
            <p className="text-[13px] text-[#71717A] font-medium">
              {isEditMode
                ? "Update existing supplier details"
                : "Enter supplier details to create a new record"}
            </p>
          </div>
          <button onClick={onClose} className="text-[#71717A] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Supplier Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="Supplier name"
              className="w-full h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.name && (
              <span className="text-red-500 text-[11px]">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Contact Person <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              {...register("contactPerson")}
              placeholder="Name of contact"
              className="w-full h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.contactPerson && (
              <span className="text-red-500 text-[11px]">
                {errors.contactPerson.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Phone <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                {...register("phone")}
                placeholder="+234..."
                className="w-full h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
              />
              {errors.phone && (
                <span className="text-red-500 text-[11px]">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-[#1D1D1D]">
                Email <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                {...register("email")}
                placeholder="supplier@email.com"
                className="w-full h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
              />
              {errors.email && (
                <span className="text-red-500 text-[11px]">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[13px] font-medium text-[#1D1D1D]">
              Address <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              {...register("address")}
              placeholder="Full address"
              className="w-full h-[44px] bg-[#F9FAFB] border border-[#E2E4E9] rounded-[8px] px-3 text-[13px] outline-none transition-colors"
            />
            {errors.address && (
              <span className="text-red-500 text-[11px]">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-[12px] mt-4 pt-4 border-t border-[#F4F4F5]">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] border border-[#E2E4E9] text-[13px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[40px] cursor-pointer px-6 rounded-[8px] bg-[#2474F5] text-[13px] font-medium text-white hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : null}
              {isEditMode ? "Save Changes" : "Create Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
